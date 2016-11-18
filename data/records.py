# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from Crypto.Cipher import AES
from hashlib import md5
import base64
import requests
import math
import random
import json


password = 'cuandosientaelboom'
input = 'hello world'

BLOCK_SIZE = 16

def pad (data):
    pad = BLOCK_SIZE - len(data) % BLOCK_SIZE
    return data + pad * chr(pad)

def unpad (padded):
    pad = ord(padded[-1])
    return padded[:-pad]

def _encrypt(data, nonce, password):
    m = md5()
    m.update(password)
    key = m.hexdigest()

    m = md5()
    m.update(password + key)
    iv = m.hexdigest()

    data = pad(data)

    aes = AES.new(key, AES.MODE_CBC, iv[:16])

    encrypted = aes.encrypt(data)
    return base64.urlsafe_b64encode(encrypted)

def _decrypt(edata, nonce, password):
    edata = base64.urlsafe_b64decode(edata)

    m = md5()
    m.update(password)
    key = m.hexdigest()

    m = md5()
    m.update(password + key)
    iv = m.hexdigest()

    aes = AES.new(key, AES.MODE_CBC, iv[:16])
    return unpad(aes.decrypt(edata))

output = _encrypt(input, "", password) 
print(output)
plaintext = _decrypt(output, "", password)
print("'" + plaintext + "'")




# url = 'http://localhost:8080/api/regions'
# headers = {'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGVwZHBwcCIsInVzZXJuYW1lIjoicHAxMCIsInR5cGUiOjIsImlhdCI6MTQ3OTQ0NTY4NiwiZXhwIjoxNDc5NjE4NDg2fQ.AMR0gm77hRDGPvZv9EMjQ4TFKpGKTOuJuFhktxxZc0U','Content-Type':'application/json'}
# r = requests.get(url,headers=headers)
# r.json()

# def postRecord(date, sensor_id, value):

def postRecord(date, ids, val):
	inputData=date+'..'+str(ids)+'..'+str(val)
	crypt=_encrypt(inputData, "", password)
	payload = {'data':crypt}
	print payload
	url='http://localhost:8080/api/recs'
	headers = {'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGVwZHBwcCIsInVzZXJuYW1lIjoicHAxMCIsInR5cGUiOjIsImlhdCI6MTQ3OTQ0NTY4NiwiZXhwIjoxNDc5NjE4NDg2fQ.AMR0gm77hRDGPvZv9EMjQ4TFKpGKTOuJuFhktxxZc0U','Content-Type':'application/json'}
	r=requests.post(url,data=json.dumps(payload), headers=headers)
	print r.json()


# postRecord('2005-11-05T08:15:30-05:00', '20','20')
# while (1<0):
postRecord('2006-11-05T08:15:30-05:00', random.randint(1, 100), random.randint(15, 25))

# postRecord('2006-11-05T08:15:30-05:00', 18,18)


