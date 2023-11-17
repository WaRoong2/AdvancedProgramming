#!/usr/bin/python3
import zmq, time

HOST = "127.0.0.1"
PORT = "5000"

ctx = zmq.Context()

svc = "tcp://" + HOST + ":"+ PORT

sock = ctx.socket(zmq.PUSH)

sock.bind(svc)

for x in range(5):
    time.sleep(5)
    sock.send(b"[%d] Hello world" %x)