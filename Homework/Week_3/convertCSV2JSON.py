import csv
import json

csvfile = open('dataset.csv', 'r')
jsonfile = open('data.json', 'w')

title = ("Date","Temp")
reader = csv.DictReader(csvfile, title)
readerList = list(reader)
readerLength = len(readerList)
count = 0

jsonfile.write('[')
for row in readerList:
	count += 1
	json.dump(row, jsonfile)
	if count != readerLength:
		jsonfile.write(', \n')

jsonfile.write(']')