const express = require('express');
const mongoose = require('mongoose');
const querystring = require('querystring');

let db=mongoose.connect('mongodb://127.0.0.1:27017/db1');
let MyUser=mongoose.model("users",{
    email:String,
    password:String,
    nickname:String,
    phone:String
});

let app=express();

app.post("/post/api/1.0/create",(req,res)=>{
    req.on('data',data=>{
        //将获取到的数据进行解码
        let decodedata = decodeURIComponent(data);
        //将获取到的数据进行JSON化
        let result=JSON.parse(decodedata);

        let auser=new MyUser({
            email:result.email,
            password:result.password,
            nickename:result.nickname,
            phone:result.phone
        });
        auser.save();
    });
});

//响应前端页面对query的操作请求
app.post("/post/api/1.0/query",(req,res)=>{
    req.on('data',data=>{
        //将获取到的数据进行解码
        let decodedata = decodeURIComponent(data);
        //将获取到的数据进行JSON化
        let result=JSON.parse(decodedata);

        let ema=result.userName;
        let psw=result.password;

        MyUser.findOne({
            email:ema
        }, function(err, docs) {
            console.log(docs);
            console.log(psw);
            if(docs.password==psw){
                console.log("登录成功");
            }else{
                console.log("登录失败");
            }
        });
    });
});


app.listen(3000,function () {
    console.log("运行成功");
});
