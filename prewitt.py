# -*- coding: utf-8 -*-
"""
Created on Thu Feb  7 15:39:10 2019

@author: AMaquthu
"""

import cv2

img = cv2.imread('plate.jpg')
dimension = img.shape
yDimension = dimension[1]
xDimension = dimension[0]
v= yDimension-1
z= xDimension-1
print("Data",xDimension)
def prewitt(picture):
    for x in range(0,xDimension):
        picture[x,0]=picture[x,0]-picture[x,z]
    cv2.imwrite("prewitt1.jpg",picture)
    for y in range(0,yDimension):
        picture[0,y]=picture[0,y]-picture[z,y]
    cv2.imwrite("prewitt2.jpg",picture)

prewitt(img)
    
    

