# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import requests
url = 'http://localhost:8080/api/regions'
headers = {'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGVwZHBwcCIsInVzZXJuYW1lIjoicHAxMCIsInR5cGUiOjIsImlhdCI6MTQ3OTQ0NTY4NiwiZXhwIjoxNDc5NjE4NDg2fQ.AMR0gm77hRDGPvZv9EMjQ4TFKpGKTOuJuFhktxxZc0U','Content-Type':'application/json'}
r = requests.get(url,headers=headers)
r.json()
