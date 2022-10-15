from flask import Flask, render_template, request
import sqlite3 as sql
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS
from flask import jsonify, json, send_file, make_response

#ML
import matplotlib.pyplot as plt
import torch
import cv2
import yaml
from torchvision import transforms
import numpy as np

from utils.datasets import letterbox
# from utils.general import non_max_suppression_mask_conf

from detectron2.modeling.poolers import ROIPooler
from detectron2.structures import Boxes
from detectron2.utils.memory import retry_if_cuda_oom
from detectron2.layers import paste_masks_in_image

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
with open('model/hyp.yaml') as f:
    hyp = yaml.load(f, Loader=yaml.FullLoader)
weigths = torch.load('model/best.pt')
model = weigths['model']
model = model.half().to(device)
_ = model.eval()


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

# def letterbox(img, new_shape=(640, 640), color=(114, 114, 114), auto=True, scaleFill=False, scaleup=True, stride=32):
#     # Resize and pad image while meeting stride-multiple constraints
#     shape = img.shape[:2]  # current shape [height, width]
#     if isinstance(new_shape, int):
#         new_shape = (new_shape, new_shape)

#     # Scale ratio (new / old)
#     r = min(new_shape[0] / shape[0], new_shape[1] / shape[1])
#     if not scaleup:  # only scale down, do not scale up (for better test mAP)
#         r = min(r, 1.0)

#     # Compute padding
#     ratio = r, r  # width, height ratios
#     new_unpad = int(round(shape[1] * r)), int(round(shape[0] * r))
#     dw, dh = new_shape[1] - new_unpad[0], new_shape[0] - new_unpad[1]  # wh padding
#     if auto:  # minimum rectangle
#         dw, dh = np.mod(dw, stride), np.mod(dh, stride)  # wh padding
#     elif scaleFill:  # stretch
#         dw, dh = 0.0, 0.0
#         new_unpad = (new_shape[1], new_shape[0])
#         ratio = new_shape[1] / shape[1], new_shape[0] / shape[0]  # width, height ratios

#     dw /= 2  # divide padding into 2 sides
#     dh /= 2

#     if shape[::-1] != new_unpad:  # resize
#         img = cv2.resize(img, new_unpad, interpolation=cv2.INTER_LINEAR)
#     top, bottom = int(round(dh - 0.1)), int(round(dh + 0.1))
#     left, right = int(round(dw - 0.1)), int(round(dw + 0.1))
#     img = cv2.copyMakeBorder(img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=color)  # add border
#     return img, ratio, (dw, dh)


app = Flask(__name__)
CORS(app)
# socketio = SocketIO(app, cors_allowed_origins="*")


##################ML
classes_to_filter = None  #You can give list of classes to filter by name, Be happy you don't have to put class number. ['train','person' ]
opt  = {
    "weights": "model/best.pt", # Path to weights file default weights are for nano model
    "yaml"   : "model/hyp.yaml",
    "img-size": 1280, # default image size
    "conf-thres": 0.3, # confidence threshold for inference.
    "iou-thres" : 0.45, # NMS IoU threshold for inference.
    "device" : 'cpu',  # device to run our model i.e. 0 or 0,1,2,3 or cpu
    "classes" : classes_to_filter  # list of classes to filter or None
}
source_image_path = 'frame1250.jpg'
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
    model(torch.zeros(1, 3, image_width, image_width).to(device).type_as(next(model.parameters())))



# @socketio.on('my_event')
# def handle_my_custom_event():
#     emit('message', 'Hello')

# @ socketio.on('json')
# def handle_json(json):
#     send(json, json=True)

# @ socketio.on('my event')
# def handle_my_custom_event(json):
#     emit('my response', json)

# @ socketio.on('my event')
# def handle_my_custom_event(json):
#     emit('my response', json)

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
def calc_mm_in_px(width_image, band_width, sm_in_band_width):
    mm_in_px = width_image*sm_in_band_width/band_width
    return mm_in_px/width_image
band_width = [0.08*image_width, 0.72*image_width]
mm_in_px = calc_mm_in_px(image_width, band_width[1]-band_width[0], 160)    

def calc_stat(object_width, object_height):
    
    # for item in img_arr:
    biggest_size_width = None;
    biggest_size_height = None; 
    if object_width > object_height:
        biggest_size_width = object_width
    else:
        biggest_size_height = object_height

    biggest_size = float(biggest_size_width or 0) + float(biggest_size_height or 0)
    biggest_size = biggest_size * mm_in_px
    # print(biggest_size)

    if biggest_size > 250:
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
        predict = model(img, augment= False)[0]

        # Apply NMS
        classes = None
        if opt['classes']:
            classes = []
            for class_name in opt['classes']:
                classes.append(opt['classes'].index(class_name))

        pred = non_max_suppression(predict, opt['conf-thres'], opt['iou-thres'], classes= classes, agnostic= False)
        print(pred)
        result_dict={1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0}
        for i, det in enumerate(pred):
            s = ''
            s += '%gx%g ' % img.shape[2:]  # print string

            if len(det):
                det[:, :4] = scale_coords(img.shape[2:], det[:, :4], img0.shape).round()

            for *xyxy, conf, cls in reversed(det):
                label = f'{names[int(cls)]} {conf:.2f}'
                plot_one_box(xyxy, img0, label=label, color=colors[int(cls)], line_thickness=3)
                result_dict[
                    calc_stat(
                        float(xyxy[2]) - float(xyxy[0]), 
                        float(xyxy[3]) + float(xyxy[1])
                        )
                ] += 1
        # print(result_dict)
                


    retval, buffer = cv2.imencode('.jpg', img0)
    jpg_as_text = base64.b64encode(buffer)

    return jsonify({"image": jpg_as_text.decode("utf-8"), 'propertyes': result_dict})



# if __name__ == '__main__':
    # socketio.run(app)
