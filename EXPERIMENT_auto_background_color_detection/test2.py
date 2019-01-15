import cv2
import numpy as np

from color_extractor import Back

img = cv2.imread('importfile.jpg')

back_algo = Back()
print(back_algo.get(img))