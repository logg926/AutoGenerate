###TOO: 
# 1. Image auto color
# 2. Export as bmp with only 2 color
# 3. different dither
widthheightratio = 1.307
outputpixelWidth = 133
outputpixelHeight = 114
inputname = 'importfile.jpg'
outputname1 = 'opecv_test1.jpg'
outputname2 = 'opecv_test2.jpg'
outputname3 = 'opecv_test3.jpg'
outputname4 = 'opecv_test4.jpg'


output_options = [('opecv_test3.jpg',0,30),('opecv_test4.jpg',0,-30)]



import cv2
from PIL import Image
from apply_brightness_contrast import apply_brightness_contrast


img = cv2.imread(inputname)
height, width, depth = img.shape


if (  width/ height >= outputpixelWidth*widthheightratio/outputpixelHeight):
     img = cv2.resize(img,(outputpixelWidth,int( height*outputpixelWidth/ width* widthheightratio )))
else:
    img = cv2.resize(img,(int(( width*outputpixelHeight/ height)/widthheightratio), outputpixelHeight))


# dst = img[y:y+height, x:x+width]
# if dst[0].size > 0:
#     cv2.imwrite("output.png", dst)
ret,thresh_img = cv2.threshold(img,127,255,cv2.THRESH_BINARY)

#V1
cv2.imwrite(outputname1 , thresh_img)

#V2
cv2_im = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
pil_im = Image.fromarray(cv2_im)

pil_im.convert('1').save(outputname2)


#V3 above

for (filename,brightness,contrast) in output_options:
     new_image = apply_brightness_contrast(img,brightness,contrast)
     cv2_im = cv2.cvtColor(new_image,cv2.COLOR_BGR2RGB)
     pil_im = Image.fromarray(cv2_im)
     pil_im.convert('1').save(filename)

#cv2.imwrite("opencv_test2.png", img,[int(cv2.IMWRITE_PNG_BILEVEL), 1])

cv2.destroyAllWindows()
#  if ( doc.width/doc.height >= 133/114):
#    doc.ResizeImage(133)
#else:
#    doc.ResizeImage(doc.width/doc.height*114)
#doc.ResizeCanvas(outputpixelWidth, outputpixelHeight)


# #doc.SaveAs()
# psBMPSave  =2          # from enum PsSaveDocumentType
# psSaveForWeb =2          # from enum PsExportType


#saveconfig = Dispatch("Photoshop.BMPSaveOptions")

# #doc.SaveAs(outputName,saveconfig)

# exportconfig = Dispatch("Photoshop.ExportOptionsSaveForWeb")

# #exportconfig.DitherAmount = 50
# exportconfig.Colors = 2

# doc.Export(outputName,psSaveForWeb,exportconfig)

# app.Quit()

# def Export(self, ExportIn=defaultNamedNotOptArg, ExportAs=defaultNamedOptArg, Options=defaultNamedOptArg):
# 		return self._oleobj_.InvokeTypes(1165521010, LCID, 1, (24, 0), ((8, 1), (12, 17), (12, 17)),ExportIn
# 			, ExportAs, Options)


# def SaveAs(self, SaveIn=defaultNamedNotOptArg, Options=defaultNamedOptArg, AsCopy=defaultNamedOptArg, ExtensionType=defaultNamedOptArg):
# 		'save the document with specific save options'
# 		return self._oleobj_.InvokeTypes(1400258931, LCID, 1, (24, 0), ((8, 1), (12, 17), (12, 17), (12, 17)),SaveIn
# 			, Options, AsCopy, ExtensionType)

# doc = app.Documents.Add(133, 114)
#layerRef = doc.ArtLayers.Add(133, 114)




# psTextLayer = 2  # from enum PsLayerKind
# layerRef.Kind = psTextLayer

# textItem = layerRef.TextItem
# textItem.Contents = "HELLO WORLD!"
# textItem.Position = (120, 120)
