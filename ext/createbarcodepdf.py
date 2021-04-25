#!/usr/bin/python
from PyPDF2 import PdfFileWriter, PdfFileReader
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm, mm, inch
from reportlab.graphics.barcode import createBarcodeDrawing
from reportlab.lib.colors import pink, green, brown, white, black, gray
import sys,os



#output = PdfFileWriter()
#input1 = PdfFileReader(file(sys.argv[1], "rb"))

# print the title of document1.pdf
#print "title = %s" % (input1.getDocumentInfo().title)

# add page 1 from input1 to output document, unchanged
#page = input1.getPage(0)
#page.trimBox.lowerLeft = (25, 25)
#page.trimBox.lowerLeft = (3*mm, 3*mm)
#page.trimBox.upperRight = (float(page.mediaBox.getUpperRight_x())-3*mm,float(page.mediaBox.getUpperRight_y())-3*mm)
#page.bleedBox.lowerLeft = (0, 0)
#page.bleedBox.upperRight = (float(page.mediaBox.getUpperRight_x()),float(page.mediaBox.getUpperRight_y()))
#page.cropBox.lowerLeft = (50, 50)
#page.cropBox.upperRight = (70, 70)
#barcode.drawOn(page,50*mm,50*mm)
#output.addPage(page)
#outputStream = file(sys.argv[2], "wb")
#output.write(outputStream)
#outputStream.close()
#print os.path.dirname(sys.argv[1])
#print sys.argv[1]
#print sys.argv[2]
#canvas.setStrokeColorRGB(0.5,0.5,0.5)
#		canvas.setFillColorRGB(0.5,0.5,0.5)
c=canvas.Canvas(sys.argv[1],pagesize=(45*mm,30*mm))
c.setFillColor(white) 
c.rect(0,0,45*mm,30*mm,stroke=0,fill=1)
#c.setFillGray(gray)
#c.setFillColor(acolor) 
#c.setStrokeColorRGB(0.5,0.5,0.5)
#c.setFillColorRGB(0.5,0.5,0.5)
# c.setFillColor(brown)
#c.setStrokeColor(brown)
barcode=createBarcodeDrawing('EAN13', value=sys.argv[2])
#barcode.background(brown)
#,barFillColor=brown)
barcode.drawOn(c,18,5)
c.setFillColor(black) 
c.rotate(90)
c.drawString(5, -10, "www.editus.ru")
c.showPage()
c.save()

