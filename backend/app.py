from flask import Flask, render_template, request
import sqlite3 as sql
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS
from flask import jsonify, json, send_file, make_response, request

# ML
import matplotlib.pyplot as plt
import torch
import cv2
import yaml
from torchvision import transforms
import numpy as np

from utils.datasets import letterbox


import os
import sys

import argparse
import time
from pathlib import Path
import cv2
import torch
import numpy as np
import torch.backends.cudnn as cudnn
from numpy import random
from PIL import Image
from utils.datasets import letterbox
from models.experimental import attempt_load
from utils.datasets import LoadStreams, LoadImages
from utils.general import check_img_size, check_requirements, check_imshow, non_max_suppression, apply_classifier, \
    scale_coords, xyxy2xywh, strip_optimizer, set_logging, increment_path
from utils.plots import plot_one_box
from utils.torch_utils import select_device, load_classifier, time_synchronized, TracedModel
import pickle
import base64


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

################## ML ######################
# You can give list of classes to filter by name, Be happy you don't have to put class number. ['train','person' ]
classes_to_filter = None
opt = {
    "weights": "model/best.pt",  # Path to weights file default weights are for nano model
    "yaml": "model/hyp.yaml",
    "img-size": 1280,  # default image size
    "conf-thres": 0.4,  # confidence threshold for inference.
    "iou-thres": 0.6,  # NMS IoU threshold for inference.
    "device": 'cpu',  # device to run our model i.e. 0 or 0,1,2,3 or cpu
    "classes": classes_to_filter  # list of classes to filter or None
}
source_image_path = 'frame1250.jpg'  # frame1250  frame1363 frame357
weights, image_width = opt['weights'], opt['img-size']
set_logging()
device = select_device(opt['device'])
half = device.type != 'cpu'
model = attempt_load(weights, map_location=device)  # load FP32 model
stride = int(model.stride.max())  # model stride
image_width = check_img_size(image_width, s=stride)  # check img_size
if half:
    model.half()

names = model.module.names if hasattr(model, 'module') else model.names
colors = [[random.randint(0, 255) for _ in range(3)] for _ in names]
if device.type != 'cpu':
    model(torch.zeros(1, 3, image_width, image_width).to(
        device).type_as(next(model.parameters())))


app.debug = True
app.host = 'localhost'


@app.route("/http-call")
def http_call():
    """return JSON with string data as the value"""
    data = {'data': 'This text was fetched using an HTTP call to server on render'}
    return jsonify(data)


@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("client has connected")
    emit("connect", {"data": f"id: {request.sid} is connected"})


@socketio.on('message')
def handle_message():
    emit('message', 'json')


@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect", f"user {request.sid} disconnected", broadcast=True)


@ app.route('/addrec', methods=['POST', 'GET'])
def addrec():
    if request.method == 'POST':
        msg = ''
        print('nm')

        try:
            request_data = request.get_json()
            nm = request_data['nm']
            print(nm)

            addr = request_data['add']
            city = request_data['city']
            pin = request_data['pin']

            with sql.connect("database.db") as con:
                cur = con.cursor()
                print(nm)
                cur.execute(
                    "INSERT INTO students(name, addr, city, pin)  VALUES(?, ?, ?, ?)", (nm, addr, city, pin))

                con.commit()
                msg = "Record successfully added"
        except:
            con.rollback()
            msg = "error in insert operation"

        finally:
            return {'msg': msg}
            con.close()
    if request.method == 'GET':
        return 'get'


@ app.route('/list')
def list():
    con = sql.connect("database.db")
    con.row_factory = sql.Row

    cursor = con.cursor().execute("select * from students")
    columns = [column[0] for column in cursor.description]
    print(columns)

    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(columns, row)))

    print(results)
    return {'rows': results}


####################################################

max_ore_size = 350


def calc_mm_in_px(width_image, band_width, sm_in_band_width):
    mm_in_px = width_image*sm_in_band_width/band_width
    return mm_in_px/width_image


band_width = [0.08*image_width, 0.72*image_width]
mm_in_px = calc_mm_in_px(image_width, band_width[1]-band_width[0], 160)


def calc_stat(object_width, object_height):

    # for item in img_arr:
    biggest_size_width = None
    biggest_size_height = None
    if object_width > object_height:
        biggest_size_width = object_width
    else:
        biggest_size_height = object_height

    biggest_size = float(biggest_size_width or 0) + \
        float(biggest_size_height or 0)
    biggest_size = biggest_size * mm_in_px
    # print(biggest_size)

    if biggest_size > 250:
        if biggest_size >= max_ore_size:
            return 10
        return 1
    elif biggest_size > 150:
        return 2
    elif biggest_size < 40:
        return 7
    elif biggest_size > 100:
        return 3
    elif biggest_size > 80:
        return 4
    elif biggest_size > 70:
        return 5
    elif biggest_size > 40:
        return 6
    return None


@ app.route('/get-image')
def predict_model():
    with torch.no_grad():
        img0 = cv2.imread(source_image_path)
        img = letterbox(img0, image_width, stride=stride)[0]
        # img = cv2.resize(img0, (1280,720),interpolation=cv2.INTER_LINEAR)
        img = img[:, :, ::-1].transpose(2, 0, 1)  # BGR to RGB, to 3x416x416
        img = np.ascontiguousarray(img)
        img = torch.from_numpy(img).to(device)
        img = img.half() if half else img.float()  # uint8 to fp16/32
        img /= 255.0  # 0 - 255 to 0.0 - 1.0
        if img.ndimension() == 3:
            img = img.unsqueeze(0)

        # Inference
        t1 = time_synchronized()
        predict = model(img, augment=False)[0]

        # Apply NMS
        classes = None
        if opt['classes']:
            classes = []
            for class_name in opt['classes']:
                classes.append(opt['classes'].index(class_name))

        pred = non_max_suppression(
            predict, opt['conf-thres'], opt['iou-thres'], classes=classes, agnostic=False)
        # print(pred)
        result_dict = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 10: 0}
        for i, det in enumerate(pred):
            s = ''
            s += '%gx%g ' % img.shape[2:]  # print string

            if len(det):
                det[:, :4] = scale_coords(
                    img.shape[2:], det[:, :4], img0.shape).round()

            for *xyxy, conf, cls in reversed(det):
                label = f'{names[int(cls)]} {conf:.2f}'
                plot_one_box(xyxy, img0, label=label,
                             color=colors[int(cls)], line_thickness=3)
                result_dict[
                    calc_stat(
                        float(xyxy[2]) - float(xyxy[0]),
                        float(xyxy[3]) + float(xyxy[1])
                    )
                ] += 1
        print(result_dict)

    retval, buffer = cv2.imencode('.jpg', img0)
    jpg_as_text = base64.b64encode(buffer)

    return jsonify({"image": jpg_as_text.decode("utf-8"), 'propertyes': result_dict})


if __name__ == '__main__':
    socketio.run(app)
