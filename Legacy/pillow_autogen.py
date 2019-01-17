widthheightratio = 1.307
outputpixelWidth = 133
outputpixelHeight = 114

from PIL import Image
# with open("importfile.jpg") as fp:
img = Image.open("importfile.jpg")

# enhancer = ImageEnhance.Sharpness
# for i in range(8):
#     factor = i/4.0
#     enhancer.enhance(factor).show("Sharpness %f" % factor)

(width,height) = img.size
if (  width/ height >= outputpixelWidth*widthheightratio/outputpixelHeight):
     img = img.resize((outputpixelWidth,int( height*outputpixelWidth/ width* widthheightratio )))
else:
     img = img.resize((int(( width*outputpixelHeight/ height)/widthheightratio), outputpixelHeight))

img = img.convert("1")
img.save("pillow.jpg")