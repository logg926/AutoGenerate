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
        realheight = int( height*outputpixelWidth/ width* widthheightratio )
        realwidth = outputpixelWidth
        img = cv2.resize(img,(realwidth,realheight))
        return (img,realwidth,realheight)
    else:
        realheight = outputpixelHeight
        realwidth = int(( width*outputpixelHeight/ height)/widthheightratio)
        img = cv2.resize(img,(realwidth,realheight))
        return (img,realwidth,realheight)

