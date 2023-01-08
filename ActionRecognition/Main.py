
import tkinter as tk
from tkinter import *
from tkinter import filedialog
from tkinter.filedialog import askopenfile
from PIL import Image, ImageTk
from matplotlib import pyplot as plt
import cv2
import os,io,torch
from PIL import Image
import torchvision.transforms as transforms
# from Common import LabelCodec
# from CRNN import CRNN
from collections import OrderedDict
import numpy as np
import math
 
from imutils.object_detection import non_max_suppression
from imutils import paths
import numpy as np
import argparse
import imutils
import cv2

import pickle


# BLACK = (0.0, 0.0, 0.0)
# WHITE = (255.0, 255.0, 255.0)
# YELLOW = (0.0, 255.0, 255.0)
# GREEN = (0.0, 255.0, 0.0)
# RED = (0.0, 0.0, 255.0)

# # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< GUI >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

# def drawRedRectangleAroundPlate(imgOriginalScene, licPlate):
#     p2fRectPoints = cv2.boxPoints(licPlate.rrLocationOfPlateInScene)            # get 4 vertices of rotated rect
#     p2fRectPoints = p2fRectPoints.astype(int)
#     cv2.line(imgOriginalScene, tuple(p2fRectPoints[0]), tuple(p2fRectPoints[1]), GREEN, 2)         # draw 4 red lines
#     cv2.line(imgOriginalScene, tuple(p2fRectPoints[1]), tuple(p2fRectPoints[2]), GREEN, 2)
#     cv2.line(imgOriginalScene, tuple(p2fRectPoints[2]), tuple(p2fRectPoints[3]), GREEN, 2)
#     cv2.line(imgOriginalScene, tuple(p2fRectPoints[3]), tuple(p2fRectPoints[0]), GREEN, 2)
# import cv2


def generate_Action(loc):
    cap = cv2.VideoCapture(loc)

    #initialize the HOG descriptor/person detector
    hog = cv2.HOGDescriptor()
    hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())
    #create y as a integer list
    currHog=[]

    #get frame at every second
    cap.set(cv2.CAP_PROP_POS_MSEC, (cap.get(cv2.CAP_PROP_POS_MSEC)+1000))
    video=[]
    while True:
        
        ret, frame = cap.read()
        if frame is None:
            break
        frame = imutils.resize(frame, width=min(400, frame.shape[1]))
        orig = frame.copy()

        # detect people in the image
        (rects, weights) = hog.detectMultiScale(frame, winStride=(4, 4),
            padding=(8, 8), scale=1.05)

        # draw the original bounding boxes
        for (x, y, w, h) in rects:
            cv2.rectangle(orig, (x, y), (x + w, y + h), (0, 0, 255), 2)

        # apply non-maxima suppression to the bounding boxes using a
        # boxes that are still people
        rects = np.array([[x, y, x + w, y + h] for (x, y, w, h) in rects])
        pick = non_max_suppression(rects, probs=None, overlapThresh=0.65)

        # draw the final bounding boxes
        for (xA, yA, xB, yB) in pick:
            cv2.rectangle(frame, (xA, yA), (xB, yB), (0, 255, 0), 2)
            #save frame to make video later in the code
            video.append(frame)
            #crop the image
            crop_img = frame[yA:yB, xA:xB]
            #calculate the HOG descriptor and append it to the end of the list
            FDHOF = hog.compute(crop_img)
            currHog.extend(FDHOF)

        
        # cv2.imshow("Before NMS", orig)
        #cv2.imshow("After NMS", frame)
        
        

    # print(len(currHog))
    filename = 'finalized_model1.sav'
    loaded_model = pickle.load(open(filename, 'rb'))
    # print(loaded_model.n_features_in_)

    if len(currHog) > loaded_model.n_features_in_:
        currHog = currHog[:loaded_model.n_features_in_]
    elif len(currHog) < loaded_model.n_features_in_:
        currHog.extend([0]*(loaded_model.n_features_in_-len(currHog)))

    y_pred = loaded_model.predict([currHog])

    if (y_pred[0] == 1):

        #save the video
        height, width, layers = video[0].shape
        size = (width,height)
        out = cv2.VideoWriter('output.mp4',cv2.VideoWriter_fourcc(*'DIVX'), 15, size)
        for i in range(len(video)):
            # video[i] = cv2.rotate(video[i], cv2.ROTATE_180)
            #add text jumping above green box
            cv2.putText(video[i], 'Jumping', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

            out.write(video[i])
        out.release()

        return "Jumping"
    elif (y_pred[0]==2):
        #save the video
        height, width, layers = video[0].shape
        size = (width,height)
        out = cv2.VideoWriter('output1.mp4',cv2.VideoWriter_fourcc(*'DIVX'), 15, size)
        for i in range(len(video)):
            # video[i] = cv2.rotate(video[i], cv2.ROTATE_180)
            #add text jumping above green box
            cv2.putText(video[i], 'Walking', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
            
            out.write(video[i])
        out.release()
        return "Walking"


 


# def upload_file(my_w,my_font1):
#     f_types = [('MP4 Files','*.mp4')]   # type of files to select 
#     f_name = tk.filedialog.askopenfilename(filetypes=f_types)
    
#     predict="Waiting"

#     l3 = tk.Label(my_w,text='Action is : ' + predict,width=30,font=my_font1)  
#     l3.grid(row=7,column=1,columnspan=4)

#     predict = generate_Action(f_name)
    
#     l3 = tk.Label(my_w,text='Action is : ' + predict,width=30,font=my_font1)  
#     l3.grid(row=7,column=1,columnspan=4)





def main():
    
    # my_w = tk.Tk()
    # my_w.geometry("410x700")  # Size of the window 
    # my_w.title('Action Detection')
    # my_font1=('times', 18, 'bold')
    # l1 = tk.Label(my_w,text='Upload Video',width=30,font=my_font1)  
    # l1.grid(row=1,column=1,columnspan=4)
    # b1 = tk.Button(my_w, text='Upload',width=20,command = lambda:upload_file(my_w,my_font1))
    # b1.grid(row=2,column=1,columnspan=4)
    # my_w.mainloop()  # Keep the window open

    predict = generate_Action("walking.mp4")
    print(predict)

    return

if __name__ == "__main__":
    main()
    
    
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>