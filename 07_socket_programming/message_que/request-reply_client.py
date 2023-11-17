#!/usr/bin/python3
import zmq

HOST = "127.0.0.1"
PORT = "5000"

ctx = zmq.Context()

svc = "tcp://" + HOST + ":"+ PORT

sock = ctx.socket(zmq.REQ)

sock.connect(svc)

sock.send(b"Hello world")
msg = sock.recv()

sock.send(b"STOP")

print("client: %s" % msg.decode('utf-8'))