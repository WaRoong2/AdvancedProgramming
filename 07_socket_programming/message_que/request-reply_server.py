#!/usr/bin/python3
import zmq

HOST = "127.0.0.1"
PORT = "5000"

ctx = zmq.Context()

svc = "tcp://" + HOST + ":"+ PORT

sock = ctx.socket(zmq.REP)

sock.bind(svc)

while True:
    msg = sock.recv()
    if not b"STOP" in msg:
        sock.send(b"server:%s" %msg)
    else:
        break

