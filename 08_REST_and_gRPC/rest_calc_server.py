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
    # request_data = request.json
    # print(request_data)
    def post(self):
        return {"result":"" }

@api.route("/substract")
class Substract(Resource):
    def post(self):
        return {"result":"%d"  }

@api.route("/multiply")
class Multiply(Resource):
    def put(self):
        return {"result":"%d"  }

@api.route("/divide")
class Divide(Resource):
    def put(self):
        return {"result":"%d"  }


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=8080)
