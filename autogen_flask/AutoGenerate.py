###TOO: 
# 1. Image auto color
# 2. Export as bmp with only 2 color
# 3. different dither


import cv2
from PIL import Image
from Apply_brightness_contrast import apply_brightness_contrast
from Make_to_ratio import Config, maketoratio , makebacktoratiopreview
import Edge_detection
# widthheightratio = 1.307
# outputpixelWidth = 133
# outputpixelHeight = 114


def AutoGenerate(inputpath ='static/img/importfile.jpg',outputpath = 'static/trans/outputfile.bmp',threshhold = 0,brightness=0,contrast = 0,widthheightratio = 1.307,outputpixelWidth=133,outputpixelHeight=114 ):

     my_config = Config(widthheightratio,outputpixelWidth,outputpixelHeight)
     print(inputpath)
     img = cv2.imread(inputpath)

     img = cv2.fastNlMeansDenoisingColored(img,None,10,10,7,21)
     
     img = maketoratio(img,my_config)
     # img =  cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


     img = makebacktoratiopreview(img,my_config)
     img = apply_brightness_contrast(img,brightness,contrast)
     cv2_im = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
     # ret,img = cv2.threshold(img,127,255,cv2.THRESH_BINARY)
     pil_im = Image.fromarray(cv2_im)
     pil_im.convert('1').save(outputpath)

     cv2.destroyAllWindows()
     return True


# AutoGenerate()

# inputname = 'importfile.jpg'

# outputname = 'outputfile.bmp'
# outputname1 = 'opecv_test1.bmp'
# outputname2 = 'opecv_test2.bmp'
# outputname3 = 'opecv_test3.bmp'
# outputname4 = 'opecv_test4.bmp'


# output_options = [('opecv_test4.bmp',0,30),('opecv_test5.bmp',0,-30)]

# my_config = Config(1.307,133,114)


# # step0 make the setting

# #step1 read the file
# img = cv2.imread('static/img/'+inputname)
# img = cv2.fastNlMeansDenoisingColored(img,None,10,10,7,21)
# #step2 make to ratio
# img = maketoratio(img,my_config)
# img = makebacktoratiopreview(img,my_config)

# #mode 1 threshholding
# mod1 =  cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# ret,thresh_img = cv2.threshold(mod1,127,255,cv2.THRESH_BINARY)
# cv2.imwrite(outputname1 , thresh_img)

# #V2 
# cv2_im = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
# pil_im = Image.fromarray(cv2_im)

# pil_im.convert('1').save(outputname2)

# #V3

# edges = Edge_detection.edge_detect(img, Edge_detection.Edge_detection_setting())
# #can change Edge_detection
# ret,thresh_img_edge = cv2.threshold(edges,127,255,cv2.THRESH_BINARY)
# cv2.imwrite(outputname3 , thresh_img_edge)


# #V4 above

# for (filename,brightness,contrast) in output_options:
#      new_image = apply_brightness_contrast(img,brightness,contrast)
#      cv2_im = cv2.cvtColor(new_image,cv2.COLOR_BGR2RGB)
#      pil_im = Image.fromarray(cv2_im)
#      pil_im.convert('1').save(filename)

# #bug option for opencv
# #cv2.imwrite("opencv_test2.png", img,[int(cv2.IMWRITE_PNG_BILEVEL), 1])

# cv2.destroyAllWindows()
