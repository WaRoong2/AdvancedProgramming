#!/usr/bin/python3
from concurrent import futures
import grpc, calc_pb2, calc_pb2_grpc

class CalculatorServicer(calc_pb2_grpc.CalculatorServicer):
    def SayHello(self, request, context):
        return calc_pb2.HelloReply(message="Hello, {0}!".format(request.name))

    def Calc(self, request, context):
        if request.op == '+':
            return calc_pb2.CalcResult(result=request.x1+request.x2)
        elif request.op == '-':
            return calc_pb2.CalcResult(result=request.x1-request.x2)
        elif request.op == '*':
            return calc_pb2.CalcResult(result=request.x1*request.x2)
        elif request.op == '/':
            return calc_pb2.CalcResult(result=request.x1/request.x2)

def server():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    calc_pb2_grpc.add_CalculatorServicer_to_server(CalculatorServicer(), server)
    server.add_insecure_port('0.0.0.0:8080')
    server.start()
    server.wait_for_termination()

server()