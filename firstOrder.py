# -*- coding: utf-8 -*-
"""
Created on Wed Jan 30 11:48:28 2019

@author: AMaquthu
"""
import cv2
import xlsxwriter

plate = cv2.imread("C:/Users/AMaquthu/Documents/Projects/Data/data/plate.jpg")
dimension = plate.shape
yDimension = dimension[1]
xDimension = dimension[0]
workbook = xlsxwriter.Workbook('demo.xlsx')
worksheet = workbook.add_worksheet()
worksheet.write('A1', 'x')
worksheet.write('B1', 'y')


 
print("Dimension: ",len(plate[220]))

def edgeFirstOrder(plate):
    row = 2
    col = 2
    for x in range(0,yDimension-2):
        for y in range(0,xDimension-2):
            worksheet.write(row, col, x)
            worksheet.write(row, col + 1, y)
            row += 1
                         
            eyokuqala = 2*plate[y,x]
            eyesibini = plate[y,x+1]
            eyesithathu = plate[y+1,x]
            plate[y,x]= abs(eyokuqala-eyesibini-eyesithathu)
    
    return plate     
 
workbook.close()

plat=edgeFirstOrder(plate)
cv2.imwrite('firstOrder.jpg',plat)
cv2.imshow('Original',plate)
cv2.imshow('After',plat)
#cv2.imshow('Results',plate)
            

    
    