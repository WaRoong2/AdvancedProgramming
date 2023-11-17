#!/usr/bin/python3
import zmq, time

HOST = "127.0.0.1"
PORT = "5000"

ctx = zmq.Context()

svc = "tcp://" + HOST + ":"+ PORT

sock = ctx.socket(zmq.PUB)

sock.bind(svc)

while True:
    time.sleep(5)
    sock.send(bytes("TIME" + time.asctime(),'utf-8'))
