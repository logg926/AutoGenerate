from tkinter import *
from tkinter import filedialog
 

root =  Tk()

def openphoto():
    root.filename = filedialog.askopenfilename(initialdir = "/",title = "Select file",filetypes = (("jpeg files","*.jpg"),("all files","*.*")))
    print (root.filename)


open_button =  Button(root, text ="Open photo", command = openphoto)

open_button.pack()
root.mainloop()


# import numpy as np
# import cv2
# import Tkinter 
# import Image, ImageTk

# # A root window for displaying objects
# root =  Tk()  



# root.mainloop() # Start the GUI
# # Load an color image
# img = cv2.imread('img.png')

# #Rearrang the color channel
# b,g,r = cv2.split(img)
# img = cv2.merge((r,g,b))



# # Convert the Image object into a TkPhoto object
# im = Image.fromarray(img)
# imgtk = ImageTk.PhotoImage(image=im) 

# # Put it in the display window
#  Label(root, image=imgtk).pack() 
