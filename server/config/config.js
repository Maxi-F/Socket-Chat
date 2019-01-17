// Port
process.env.PORT = process.env.PORT || 3000;

// enviroment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// DB
if (process.env.NODE_ENV === 'dev') process.env.URLDB = 'mongodb://localhost:27017/heavenly_chat_DB';
else process.env.URLDB = process.env.MONGO_URI