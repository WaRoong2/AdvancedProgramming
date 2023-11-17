#!/usr/bin/python3
import requests
import json

def send_api(method, path):
    url = "http://localhost" + path
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
    return response

send_api("GET", "/hello/DKU")
send_api("POST", "/add")
# send_api("POST", "/substract")
# send_api("PUT", "/multiply")
# send_api("PUT", "/divide")
