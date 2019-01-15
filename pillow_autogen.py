widthheightratio = 1.307
outputpixelWidth = 133
outputpixelHeight = 114

from PIL import Image
from PIL import ImageEnhance
with open("Gray_Image.jpg") as fp:
    img = Image.open(fp)

# enhancer = ImageEnhance.Sharpness
# for i in range(8):
#     factor = i/4.0
#     enhancer.enhance(factor).show("Sharpness %f" % factor)

img = img.convert("1")
img = img.convert("1")
(width,height) = img.size
if (  width/ height >= outputpixelWidth*widthheightratio/outputpixelHeight):
     img = img.resize((outputpixelWidth,int( height*outputpixelWidth/ width* widthheightratio )))
else:
     img = img.resize((int(( width*outputpixelHeight/ height)/widthheightratio), outputpixelHeight))

img.save("pillow.jpg")