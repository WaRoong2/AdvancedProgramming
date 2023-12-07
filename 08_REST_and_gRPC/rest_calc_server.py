#!/usr/bin/python3
from flask import Flask, request
from flask_restx import Api, Resource

app = Flask(__name__)
api = Api(app)

@api.route("/hello/<string:name>")
class HelloWorld(Resource):
    def get(self,name):
        return {"result":"hello, %s" %name}
    
@api.route("/add")
class Add(Resource):
    def post(self):
        request_data = request.json
        return {"result":request_data["x1"] + request_data["x2"]}

@api.route("/substract")
class Substract(Resource):
    def post(self):
        request_data = request.json
        return {"result":request_data["x1"] - request_data["x2"]  }

@api.route("/multiply")
class Multiply(Resource):
    def put(self):
        request_data = request.json
        return {"result":request_data["x1"] * request_data["x2"]  }

@api.route("/divide")
class Divide(Resource):
    def put(self):
        request_data = request.json
        return {"result":request_data["x1"] / request_data["x2"]  }


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
