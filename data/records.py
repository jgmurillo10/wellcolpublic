# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import requests
import math
import random
import json




# url = 'http://localhost:8080/api/regions'
# headers = {'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGVwZHBwcCIsInVzZXJuYW1lIjoicHAxMCIsInR5cGUiOjIsImlhdCI6MTQ3OTQ0NTY4NiwiZXhwIjoxNDc5NjE4NDg2fQ.AMR0gm77hRDGPvZv9EMjQ4TFKpGKTOuJuFhktxxZc0U','Content-Type':'application/json'}
# r = requests.get(url,headers=headers)
# r.json()

# def postRecord(date, sensor_id, value):

def postRecord(date, ids, val):
	payload = {'date':date, 'sensor_id':ids, 'value':val}
	url='http://localhost:8080/api/recs'
	headers = {'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGVwZHBwcCIsInVzZXJuYW1lIjoicHAxMCIsInR5cGUiOjIsImlhdCI6MTQ3OTQ0NTY4NiwiZXhwIjoxNDc5NjE4NDg2fQ.AMR0gm77hRDGPvZv9EMjQ4TFKpGKTOuJuFhktxxZc0U','Content-Type':'application/json'}
	r=requests.post(url,data=json.dumps(payload), headers=headers)
	print r.json()


# postRecord('2005-11-05T08:15:30-05:00', '20','20')
while (1>0):
	postRecord('2006-11-05T08:15:30-05:00', random.randint(1, 100), random.randint(15, 25))

# postRecord('2006-11-05T08:15:30-05:00', 18,18)


