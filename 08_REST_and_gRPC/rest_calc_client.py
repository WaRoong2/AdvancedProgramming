#!/usr/bin/python3
import requests
import json

def send_api(method, path):
    url = "http://localhost:5000" + path
    headers = {'Content-Type':'application/json', 'charset':'UTF-8','Accept':'*/*'}
    body = {'x1':49, 'x2':7}

    if method == 'GET':
        response = requests.get(url, headers=headers)
    elif method == 'POST':
        response = requests.post(url, headers=headers,
                                 data=json.dumps(body, ensure_ascii=False, indent="\t"))
    elif method == 'PUT':
        response = requests.put(url, headers=headers,
                                 data=json.dumps(body, ensure_ascii=False, indent="\t"))
    return response.json()["result"]

print(send_api("GET", "/hello/DKU"))
print(send_api("POST", "/add"))
print(send_api("POST", "/substract"))
print(send_api("PUT", "/multiply"))
print(send_api("PUT", "/divide"))
