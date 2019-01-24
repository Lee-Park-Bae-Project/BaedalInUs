const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const myemail = 'leeparkbaeproject@gmail.com';
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:myemail,
        pass:'leeparkbaeproject123!!'
    }
});

var rand,mailOptions,host,link;

router.get('/', (req,res)=>{
   res.render('mail');
});

router.post('/send', (req,res)=>{
    const to = req.body.to; // 인증 받을 유저
    rand=Math.floor((Math.random() * 100) + 54); // 랜덤값 생성
    host=req.get('host'); // 사용자 host값 받아옴
    link="http://"+req.get('host')+"/mail/verify?id="+rand; // 임의의 링크 생성

    console.log(`to : ${to}`);
    console.log(`rand : ${rand}`);
    console.log(`link : ${link}`);
    // 메일 옵션 이값들로 채워줌
    let mailOptions={
        to : to,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    };

    console.log(mailOptions);

    // 보내는
    transporter.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
    res.redirect('/');
});


router.get('/verify', (req, res)=>{
    console.log(`in verify`);
    console.log(req.protocol + ":/" + req.get('host'));
    console.log(`req.protocol : ${req.protocol}`);
    console.log(`req.get('host') : ${req.get('host')}`);
    console.log(`host : ${host}`);
    console.log(`mailoprionts : `);
    console.log(mailOptions);

    if((req.protocol+"://"+req.get('host'))==("http://"+host)){
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand) {
            console.log("email is verified");
            res.end("<h1>Email is been Successfully verified</h1>");
        } else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    } else {
        res.end("<h1>Request is from unknown source");
    }
});

module.exports = router;