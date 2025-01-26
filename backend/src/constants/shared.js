const OtpSendEmailTypes = {
  EMAIL: "email",
  PASSWORD: "password",
};

const MongoDbErrorCodes = {
  DUPLICATE_KEY: 11000,
};

const SocketKeys = {
  GET_ONLINE_USERS: "getOnlineUsers",
};

const ModalNames = {
  USER: "User",
  MESSAGE: "Message",
};

const SocketRelatedMethods = {
  CONNECTION: "connection",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
};

module.exports = {
  OtpSendEmailTypes,
  MongoDbErrorCodes,
  SocketKeys,
  ModalNames,
  SocketRelatedMethods,
};
