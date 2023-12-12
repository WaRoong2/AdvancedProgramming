#!/usr/bin/python3
from concurrent import futures
from pymongo import MongoClient
import grpc, tarot_back_pb2, tarot_back_pb2_grpc
import random
from datetime import datetime

mongodb_URI = "mongodb://localhost:27017/"
client = MongoClient(mongodb_URI)

db = client.Tarot
cardCol = db['Cards']
userCol = db['User']
logInCol = db['LogIn']
historyCol = db['History']

class infoManager(tarot_back_pb2_grpc.infoManagerServicer):
    def ChkInfo(self, request, context): #
        userId = request.id
        print(userId)
        value = "1" if logInCol.find_one({"id":userId}) else "0"
        return tarot_back_pb2.procResult(result = value)

    def SetInfo(self, request, context): #
        print(request)
        id = request.id
        gender = request.gender
        age = request.age
        job = request.job
        relation = request.relation
        info = {"id":id, "gender":gender, "age":age, "job":job,"relation":relation}
        value = "1" if userCol.insert_one(info).inserted_id else "0"
        return tarot_back_pb2.procResult(result=value)
    
    def GetInfo(self, request, context): #
        userId = request.id
        print(userCol.find_one({"id":userId}))
        userInfo = userCol.find_one({"id":userId})
        userGender = userInfo["gender"]
        userAge = userInfo["age"]
        userJob = userInfo["job"]
        userRelation = userInfo["relation"]
        return tarot_back_pb2.infoData(id=userId, gender=userGender, age=userAge, job=userJob, relation=userRelation)
    
    def SignUp(self, request, context): #
        userId = request.id
        userPw = request.pw
        print(userId, userPw)
        user = {"id": userId, "pw": userPw}
        value = "1" if logInCol.insert_one(user).inserted_id else "0"
        value = "1" if historyCol.insert_one({"id":userId}).inserted_id else "0"
        return tarot_back_pb2.procResult(result = value)
    
    def LogIn(self, request, context): #
        userId = request.id
        userPw = request.pw
        print(userId, userPw)
        user = {"id": userId, "pw": userPw}
        value = userId if logInCol.find_one(user) else "0"
        return tarot_back_pb2.procResult(result = value)
    
    def ChngPw(self, request, context): #
        userId = request.id
        curPw = request.pw1
        newPw = request.pw2
        print(userId, curPw, newPw)
        user = {"id": userId, "pw": curPw}
        pwCorrect = True if logInCol.find_one(user) else False
        done = "0"
        if pwCorrect:
            done = "1" if logInCol.update_one(user,{"$set":{"pw":newPw}}).modified_count>0 else "0"
        return tarot_back_pb2.procResult(result = done)
    
    def DelAccount(self, request, context): #
        userId = request.id
        userPw = request.pw
        print(userId, userPw)
        user = {"id": userId, "pw": userPw}
        pwCorrect = True if logInCol.find_one(user) else False
        done = "0"
        if pwCorrect:
            done = "1" if logInCol.delete_one(user).deleted_count>0 else "0"
            # 로그인 컬렉션 삭제 수행 안됨
            if done == "0":
                return tarot_back_pb2.procResult(result = "0")
            done = "1" if userCol.delete_one({"id":userId}).deleted_count>0 else "0"
            # 유저 컬렉션 삭제 수행 안됨
            if done == "0":
                # 로그인 컬렉션 복구
                logInCol.insert_one(user)
                return tarot_back_pb2.procResult(result = "0")
        return tarot_back_pb2.procResult(result = done)


class tarotPlayer(tarot_back_pb2_grpc.TarotPlayerServicer):
    def GetCards(self, request, context): #
        deck = list(range(78))
        random.shuffle(deck)
        print("input: ", request.n1, request.n2, request.n3)
        i1 = deck[request.n1]
        i2 = deck[request.n2]
        i3 = deck[request.n3]
        print("output: ", i1, i2, i3)

        card = cardCol.find_one({"number":i1})
        card1 = tarot_back_pb2.card()
        card1.n = card["number"] if card["number"] != 0 else -1
        card1.eng = card["name"]
        card1.kor = card["korean"]
        card1.meaning = card["meaning"]
        card1.reverse = random.randint(1,2)

        card = cardCol.find_one({"number":i2})
        card2 = tarot_back_pb2.card()
        card2.n = card["number"] if card["number"] != 0 else -1
        card2.eng = card["name"]
        card2.kor = card["korean"]
        card2.meaning = card["meaning"]
        card2.reverse = random.randint(1,2)

        card = cardCol.find_one({"number":i3})
        card3 = tarot_back_pb2.card()
        card3.n = card["number"] if card["number"] != 0 else -1
        card3.eng = card["name"]
        card3.kor = card["korean"]
        card3.meaning = card["meaning"]
        card3.reverse = random.randint(1,2)

        return tarot_back_pb2.cardResponse(c1=card1, c2=card2, c3=card3)
    
    def SaveTarot(self, request, context): #
        content = request.content
        current_time = datetime.now()
        formatted_time = current_time.strftime("%Y-%m-%d %H:%M")
        record = {formatted_time:content}
        print(record)
        value = "1" if historyCol.update_one({"id":request.id}, {'$set':record}).modified_count>0 else "0"
        return tarot_back_pb2.procResult(result = value)
   
    def LoadTarot(self, request, context): #
        userId = request.id
        loadedData = []
        data = historyCol.find({"id":userId})
        for rec in data:
            ks = rec.keys()
            for k in ks:
                if "id" in k:
                    continue
                record = tarot_back_pb2.record()
                print(k)
                record.date = k
                record.content = rec[k]
                loadedData.append(record)
        return tarot_back_pb2.tarotRecords(records = loadedData)
    

def server():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    tarot_back_pb2_grpc.add_infoManagerServicer_to_server(infoManager(), server)
    tarot_back_pb2_grpc.add_TarotPlayerServicer_to_server(tarotPlayer(), server)
    server.add_insecure_port('0.0.0.0:8080')
    server.start()
    server.wait_for_termination()

server()
