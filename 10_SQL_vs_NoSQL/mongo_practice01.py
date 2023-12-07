#!/usr/bin/python3
# Create DB/Collections and insert data

from pymongo import MongoClient

mongodb_URI = "mongodb://localhost:27017/"
client = MongoClient(mongodb_URI)

#print(client.list_database_names())

db = client.classdb

col = db.students

students = [
    {'id':'32201234', 'name':'Lee', 'email':'lee1234@naver.com'},
    {'id':'32211234', 'name':'Kim', 'email':'kim1234@gmail.com'},
    {'id':'32221234', 'name':'Park', 'email':'park1234@naver.com'},
    {'id':'32193767', 'name':'Lim', 'email':'lim1234@naver.com'}
]

ret = col.insert_many(students)
print(ret)