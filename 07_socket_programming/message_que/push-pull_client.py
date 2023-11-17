#!/usr/bin/python3
import zmq, time

HOST = "127.0.0.1"
PORT = "5000"

ctx = zmq.Context()

svc = "tcp://" + HOST + ":"+ PORT

sock = ctx.socket(zmq.PULL)

sock.connect(svc)

for x in range(5):
    msg = sock.recv()
    print(msg.decode('utf-8'))