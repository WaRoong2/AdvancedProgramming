#!/usr/bin/python3
#Search data
import pprint
from pymongo import MongoClient

mongodb_URI = "mongodb://localhost:27017/"
client = MongoClient(mongodb_URI)

db = client.classdb

col = db.students

# find_one document
# pprint.pprint(col.find_one())

# find_one w/ condition
# pprint.pprint(col.find_one({'name':'Lim'}))

# print all documents in 'student' collection
# for student in col.find():
#     pprint.pprint(student)

# find students who have letter 'L' in his name
find_result = col.find({'name':{'$regex':'L'}})



for result in find_result:
    pprint.pprint(result)