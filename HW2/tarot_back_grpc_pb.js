// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var tarot_back_pb = require('./tarot_back_pb.js');

function serialize_cardRequest(arg) {
  if (!(arg instanceof tarot_back_pb.cardRequest)) {
    throw new Error('Expected argument of type cardRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cardRequest(buffer_arg) {
  return tarot_back_pb.cardRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cardResponse(arg) {
  if (!(arg instanceof tarot_back_pb.cardResponse)) {
    throw new Error('Expected argument of type cardResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cardResponse(buffer_arg) {
  return tarot_back_pb.cardResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chngPwRequest(arg) {
  if (!(arg instanceof tarot_back_pb.chngPwRequest)) {
    throw new Error('Expected argument of type chngPwRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chngPwRequest(buffer_arg) {
  return tarot_back_pb.chngPwRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_idRequest(arg) {
  if (!(arg instanceof tarot_back_pb.idRequest)) {
    throw new Error('Expected argument of type idRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_idRequest(buffer_arg) {
  return tarot_back_pb.idRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_infoData(arg) {
  if (!(arg instanceof tarot_back_pb.infoData)) {
    throw new Error('Expected argument of type infoData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_infoData(buffer_arg) {
  return tarot_back_pb.infoData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_loginRequest(arg) {
  if (!(arg instanceof tarot_back_pb.loginRequest)) {
    throw new Error('Expected argument of type loginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_loginRequest(buffer_arg) {
  return tarot_back_pb.loginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_procResult(arg) {
  if (!(arg instanceof tarot_back_pb.procResult)) {
    throw new Error('Expected argument of type procResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_procResult(buffer_arg) {
  return tarot_back_pb.procResult.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_saveRequest(arg) {
  if (!(arg instanceof tarot_back_pb.saveRequest)) {
    throw new Error('Expected argument of type saveRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_saveRequest(buffer_arg) {
  return tarot_back_pb.saveRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tarotRecords(arg) {
  if (!(arg instanceof tarot_back_pb.tarotRecords)) {
    throw new Error('Expected argument of type tarotRecords');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_tarotRecords(buffer_arg) {
  return tarot_back_pb.tarotRecords.deserializeBinary(new Uint8Array(buffer_arg));
}


var infoManagerService = exports.infoManagerService = {
  chkInfo: {
    path: '/infoManager/ChkInfo',
    requestStream: false,
    responseStream: false,
    requestType: tarot_back_pb.idRequest,
    responseType: tarot_back_pb.procResult,
    requestSerialize: serialize_idRequest,
    requestDeserialize: deserialize_idRequest,
    responseSerialize: serialize_procResult,
    responseDeserialize: deserialize_procResult,
  },
  setInfo: {
    path: '/infoManager/SetInfo',
    requestStream: false,
    responseStream: false,
    requestType: tarot_back_pb.infoData,
    responseType: tarot_back_pb.procResult,
    requestSerialize: serialize_infoData,
    requestDeserialize: deserialize_infoData,
    responseSerialize: serialize_procResult,
    responseDeserialize: deserialize_procResult,
  },
  getInfo: {
    path: '/infoManager/GetInfo',
    requestStream: false,
    responseStream: false,
    requestType: tarot_back_pb.idRequest,
    responseType: tarot_back_pb.infoData,
    requestSerialize: serialize_idRequest,
    requestDeserialize: deserialize_idRequest,
    responseSerialize: serialize_infoData,
    responseDeserialize: deserialize_infoData,
  },
  signUp: {
    path: '/infoManager/SignUp',
    requestStream: false,
    responseStream: false,
    requestType: tarot_back_pb.loginRequest,
    responseType: tarot_back_pb.procResult,
    requestSerialize: serialize_loginRequest,
    requestDeserialize: deserialize_loginRequest,
    responseSerialize: serialize_procResult,
    responseDeserialize: deserialize_procResult,
  },
  logIn: {
    path: '/infoManager/LogIn',
    requestStream: false,
    responseStream: false,
    requestType: tarot_back_pb.loginRequest,
    responseType: tarot_back_pb.procResult,
    requestSerialize: serialize_loginRequest,
    requestDeserialize: deserialize_loginRequest,
    responseSerialize: serialize_procResult,
    responseDeserialize: deserialize_procResult,
  },
  chngPw: {
    path: '/infoManager/ChngPw',
    requestStream: false,
    responseStream: false,
    requestType: tarot_back_pb.chngPwRequest,
    responseType: tarot_back_pb.procResult,
    requestSerialize: serialize_chngPwRequest,
    requestDeserialize: deserialize_chngPwRequest,
    responseSerialize: serialize_procResult,
    responseDeserialize: deserialize_procResult,
  },
  delAccount: {
    path: '/infoManager/DelAccount',
    requestStream: false,
    responseStream: false,
    requestType: tarot_back_pb.loginRequest,
    responseType: tarot_back_pb.procResult,
    requestSerialize: serialize_loginRequest,
    requestDeserialize: deserialize_loginRequest,
    responseSerialize: serialize_procResult,
    responseDeserialize: deserialize_procResult,
  },
};

exports.infoManagerClient = grpc.makeGenericClientConstructor(infoManagerService);
var TarotPlayerService = exports.TarotPlayerService = {
  getCards: {
    path: '/TarotPlayer/GetCards',
    requestStream: false,
    responseStream: false,
    requestType: tarot_back_pb.cardRequest,
    responseType: tarot_back_pb.cardResponse,
    requestSerialize: serialize_cardRequest,
    requestDeserialize: deserialize_cardRequest,
    responseSerialize: serialize_cardResponse,
    responseDeserialize: deserialize_cardResponse,
  },
  saveTarot: {
    path: '/TarotPlayer/SaveTarot',
    requestStream: false,
    responseStream: false,
    requestType: tarot_back_pb.saveRequest,
    responseType: tarot_back_pb.procResult,
    requestSerialize: serialize_saveRequest,
    requestDeserialize: deserialize_saveRequest,
    responseSerialize: serialize_procResult,
    responseDeserialize: deserialize_procResult,
  },
  loadTarot: {
    path: '/TarotPlayer/LoadTarot',
    requestStream: false,
    responseStream: false,
    requestType: tarot_back_pb.idRequest,
    responseType: tarot_back_pb.tarotRecords,
    requestSerialize: serialize_idRequest,
    requestDeserialize: deserialize_idRequest,
    responseSerialize: serialize_tarotRecords,
    responseDeserialize: deserialize_tarotRecords,
  },
};

exports.TarotPlayerClient = grpc.makeGenericClientConstructor(TarotPlayerService);
