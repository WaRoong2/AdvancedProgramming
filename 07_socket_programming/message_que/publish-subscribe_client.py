#!/usr/bin/python3
import zmq

HOST = "127.0.0.1"
PORT = "5000"

ctx = zmq.Context()

svc = "tcp://" + HOST + ":"+ PORT

sock = ctx.socket(zmq.SUB)
sock.setsockopt_string(zmq.SUBSCRIBE, "TIME")

sock.connect(svc)

for x in range(5):
    time = sock.recv()
    print(time.decode('utf-8'))