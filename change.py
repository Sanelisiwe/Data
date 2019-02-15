# -*- coding: utf-8 -*-
"""
Created on Thu Feb  7 13:35:39 2019

@author: AMaquthu
"""

import cv2

origil = cv2.imread('before.png')
after = cv2.imread('plate.jpg')

results = origil-after
cv2.imshow('Results',results)
cv2.imwrite('change.jpg',results)
