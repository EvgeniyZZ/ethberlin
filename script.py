from keras.preprocessing import image
from keras.applications.resnet50 import preprocess_input
import numpy as np
from PIL import Image, ImageFilter

def main(path):	
    im = Image.open(path).convert('L')
    width = float(im.size[0])
    height = float(im.size[1])
    newImage = Image.new('L', (28, 28), (255))

    if width > height:
        nheight = int(round((20.0 / width * height), 0)) 
        if (nheight == 0):
            nheight = 1
        img = im.resize((20, nheight), Image.ANTIALIAS).filter(ImageFilter.SHARPEN)
        wtop = int(round(((28 - nheight) / 2), 0)) 
        newImage.paste(img, (4, wtop)) 
    else:
        nwidth = int(round((20.0 / height * width), 0))
        if (nwidth == 0): 
            nwidth = 1
        img = im.resize((nwidth, 20), Image.ANTIALIAS).filter(ImageFilter.SHARPEN)
        wleft = int(round(((28 - nwidth) / 2), 0)) 
        newImage.paste(img, (wleft, 4))

    tv = list(newImage.getdata())
    tva = [(255 - tva) * 1.0 / 255.0 for tva in tv]
    a = np.asarray(tva)
    a.resize(28,28,1)
    return a