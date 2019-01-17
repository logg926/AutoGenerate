import cv2
class Config:
    def __init__(self, widthheightratio = 1.307, outputpixelWidth = 133, outputpixelHeight = 114):
        self.widthheightratio = widthheightratio
        self.outputpixelWidth = outputpixelWidth
        self.outputpixelHeight  = outputpixelHeight 

def makebacktoratiopreview (imgin,config):
    img= imgin
    height, width, depth = img.shape
    widthheightratio = config.widthheightratio
    # outputpixelWidth = config.outputpixelWidth
    # outputpixelHeight = config.outputpixelHeight
    img = cv2.resize(img,(int(width*widthheightratio),height))
    return img
    

def maketoratio (imgin,config):
    img= imgin
    height, width, depth = img.shape
    widthheightratio = config.widthheightratio
    outputpixelWidth = config.outputpixelWidth
    outputpixelHeight = config.outputpixelHeight

    if (  width/ height >= outputpixelWidth*widthheightratio/outputpixelHeight):
        img = cv2.resize(img,(outputpixelWidth,int( height*outputpixelWidth/ width* widthheightratio )))
    else:
        img = cv2.resize(img,(int(( width*outputpixelHeight/ height)/widthheightratio), outputpixelHeight))
    return img
