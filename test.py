import cv2
import numpy
#import matplotlib.pyplot as plt


#load the image and convert it to grayscale
plate = cv2.imread("C:/Users/AMaquthu/Documents/Projects/Data/data/plate.jpg",0)
data = cv2.imread("C:/Users/AMaquthu/Documents/Projects/Data/data/plate.jpg")
cv2.imshow('Original ',data)
median = cv2.medianBlur(plate,5) # noise reduction using the gaussian algorithm - median blurring
cv2.imshow('Grayscale',plate) # show the grayscale image
#cv2.imshow('Median',median) # show the grayscale image
edges = cv2.Canny(plate,100,200)
#cv2.imshow('edges',edges) # show the edges of a grayscale image
#blurredImage = cv2.pyrMeanShiftFiltering(data,31,91)
ret,thresh = cv2.threshold(median,139,255,0)

im2,contours, hierarchy= cv2.findContours(thresh,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)

#cv2.imshow('image',image)
data = cv2.drawContours(plate, contours, -1, (0,0,255), 6)
cv2.imshow('threshold',thresh)
cv2.imwrite('C:/Users/AMaquthu/Documents/Projects/Data/data/result.jpg',plate)
cv2.imshow('Median',median) # show the grayscale image
#cv2.imshow('image',img)
cv2.imshow('Results',data)

print("Contours list : ",len(contours))
#print(plate)
cv2.waitKey(0)

cv2.destroyAllWindows()






