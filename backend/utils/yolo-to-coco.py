def yoloToCoco(x_yolo, y_yolo, width_yolo, height_yolo, height, width):
    h, w = abs(height_yolo*height), abs(width_yolo*width)
    x_coco = round(x_yolo*width - (w/2))
    y_coco = round(y_yolo*height - (h/2))
    if x_coco < 0:  # check if x_coco extends out of the image boundaries
        x_coco = 1
    if y_coco < 0:  # check if y_coco extends out of the image boundaries
        y_coco = 1
    return x_coco, y_coco, w, h
