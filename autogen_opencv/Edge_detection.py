import cv2
import numpy as np
# from matplotlib import pyplot as plt

class Edge_detection_setting:
    def __init__(self, denoising = True, threshold1 = 1,threshold2 = 50):
        self.threshold1 = threshold1
        self.threshold2 = threshold2
        self.denoising = denoising

def edge_detect (img , setting = Edge_detection_setting() ):

    if setting.denoising:
        dst = cv2.fastNlMeansDenoisingColored(img,None,10,10,7,21)
    else:
        dst = img
    edges = cv2.Canny(dst,setting.threshold1,setting.threshold2)
    return edges


