#!/usr/bin/python3
import grpc, calc_pb2, calc_pb2_grpc

channel = grpc.insecure_channel('localhost:8080')

def hello(s):
    stub = calc_pb2_grpc.CalculatorStub(channel)
    response = stub.SayHello(calc_pb2.HelloRequest(name=s))
    print(response.message)


def add(n1, n2):
    stub = calc_pb2_grpc.CalculatorStub(channel)
    operator = "+"
    response = stub.Calc(calc_pb2.Operands(x1=n1, x2=n2, op=operator))
    print(response.result)

    
def substract(n1, n2):
    stub = calc_pb2_grpc.CalculatorStub(channel)
    response = stub.Calc(calc_pb2.Operands(x1=n1, x2=n2, op="-"))
    print(response.result)

    
def multiply(n1, n2):
    stub = calc_pb2_grpc.CalculatorStub(channel)
    response = stub.Calc(calc_pb2.Operands(x1=n1, x2=n2, op="*"))
    print(response.result)

    
def divide(n1, n2):
    stub = calc_pb2_grpc.CalculatorStub(channel)
    response = stub.Calc(calc_pb2.Operands(x1=n1, x2=n2, op="/"))
    print(response.result)


hello('DKU')
add(50,5)
substract(50,5)
multiply(50,5)
divide(50,5)