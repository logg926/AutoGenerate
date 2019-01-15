import cv2
import numpy as np
from matplotlib import pyplot as plt

def edge_detect (img):

    img = cv2.imread('importfile.jpg')

    dst = cv2.fastNlMeansDenoisingColored(img,None,10,10,7,21)
    edges = cv2.Canny(dst,20,50)
    return edges
    #cv2.imwrite( "Gray_Image.jpg" ,edges )