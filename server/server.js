const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require("./db/conn");
const  PORT =3000;
const api = require('./route/api');
const app =express();
const cors = require('cors');
app.use(bodyParser.json());


const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'DELETE',
      'PATCH',
      'PUT'
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));  
  app.use('/api',api)

const DB_URL = "mongodb://127.0.0.1:27017/";
connectDb(DB_URL);


app.get('/',function(req,res){
    console.log('servver runing hello world');
})

app.listen(PORT,function(){
    console.log('servver runing '+PORT);
})