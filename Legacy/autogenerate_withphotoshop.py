###TOO: 
# 1. Image auto color
# 2. Export as bmp with only 2 color
# 3. different dither
widthheightratio = 1.307
outputpixelWidth = 133
outputpixelHeight = 114


from win32com.client import Dispatch
import sys, os


pathname = os.path.dirname(sys.argv[0]) 
pathOfScript = os.path.abspath(pathname) 

app = Dispatch("Photoshop.Application")

#Change unit to pixels
strtRulerUnits = app.Preferences.RulerUnits
psPixels = 1          # from enum PsUnits
app.Preferences.RulerUnits = psPixels

print(app.Path)
fileName = pathOfScript + "\importfile.jpg"
outputName = pathOfScript +"\outputfile.bmp"
#C:\Users\loggc\Desktop\importfile.jpg'
doc = app.Open(fileName)



if ( doc.width/doc.height >= outputpixelWidth*widthheightratio/outputpixelHeight):
    doc.ResizeImage(outputpixelWidth,int(doc.height*outputpixelWidth/doc.width* widthheightratio ))
else:
    doc.ResizeImage(int((doc.width*outputpixelHeight/doc.height)/widthheightratio), outputpixelHeight)

#  if ( doc.width/doc.height >= 133/114):
#    doc.ResizeImage(133)
#else:
#    doc.ResizeImage(doc.width/doc.height*114)
doc.ResizeCanvas(outputpixelWidth, outputpixelHeight)


#doc.SaveAs()
psBMPSave  =2          # from enum PsSaveDocumentType
psSaveForWeb =2          # from enum PsExportType


#saveconfig = Dispatch("Photoshop.BMPSaveOptions")

#doc.SaveAs(outputName,saveconfig)

exportconfig = Dispatch("Photoshop.ExportOptionsSaveForWeb")

#exportconfig.DitherAmount = 50
exportconfig.Colors = 2

doc.Export(outputName,psSaveForWeb,exportconfig)

app.Quit()

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

