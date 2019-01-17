const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const myemail = 'leeparkbaeproject@gmail.com';

router.get('/', (req,res)=>{
   res.render('mail');
});
router.post('/', (req,res, next)=>{
    let email = req.body.email;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:myemail,
            pass:'leeparkbaeproject123!!'
        }
    });

    let mailOptions = {
        from:myemail,
        to: email,
        subject:'Send email using node.js',
        text:'that was easy!'
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
        } else{
            console.log('email send : ' + info.response);
        }
    });
    res.redirect('/');
});
module.exports = router;