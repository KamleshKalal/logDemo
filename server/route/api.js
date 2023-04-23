const express = require('express');
const router =express.Router();
const jwt= require('jsonwebtoken');
const UserModel = require('../models/users');
router.get('/', function(req, res){
    res.send('from Api route');
})



router.post('/register', async (req, res)=>{
 
     let user =await UserModel(req.body)
     user.save();
     let payload ={subject:user._id}
     let token = jwt.sign(payload,"secretKey")
     res.status(201).send({token});
})


router.post('/login', async (req, res)=>{
    let userdata= req.body
const datalogin=await UserModel.findOne({email:userdata.email})

    if(!datalogin){
        res.status(401).send({message : 'email not found'})
    }
    else{
            if(userdata.password !== datalogin.password) {
                res.status(401).send({message : 'password invaild'})
            }else{

                let payload ={subject:datalogin._id}
                let token = jwt.sign(payload,"secretKey")

            res.status(201).send({token})
            }  
    }

})

router.get('/events',verfiyToken(),(req,res)=>{
    const event =
        [{"first_name":"Alexandrina","last_name":"Burnell","email":"aburnell0@cbslocal.com","gender":"Female","ip_address":"0.218.207.88"},
{"first_name":"Spense","last_name":"Bottell","email":"sbottell1@lulu.com","gender":"Male","ip_address":"35.152.181.237"},
{"first_name":"Ashby","last_name":"Coulston","email":"acoulston2@storify.com","gender":"Male","ip_address":"29.242.115.249"},
{"first_name":"Merwyn","last_name":"Chesser","email":"mchesser3@moonfruit.com","gender":"Male","ip_address":"14.218.100.16"},
{"first_name":"Myra","last_name":"Grouse","email":"mgrouse4@usgs.gov","gender":"Female","ip_address":"108.81.105.108"},
{"first_name":"Ansel","last_name":"Moye","email":"amoye5@ox.ac.uk","gender":"Male","ip_address":"79.95.154.155"},
{"first_name":"Melinde","last_name":"Vasyukhichev","email":"mvasyukhichev6@unc.edu","gender":"Female","ip_address":"149.14.31.37"},
{"first_name":"Bill","last_name":"Saffill","email":"bsaffill7@uol.com.br","gender":"Male","ip_address":"208.28.100.205"},
{"first_name":"Darin","last_name":"Gullick","email":"dgullick8@nydailynews.com","gender":"Male","ip_address":"105.116.132.31"},
{"first_name":"Woodrow","last_name":"Bessent","email":"wbessent9@yandex.ru","gender":"Male","ip_address":"63.243.7.55"}]
res.json(event)
})

router.get('/special',(req,res)=>{
    let special =
        [{"first_name":"Alexandrina","last_name":"Burnell","email":"aburnell0@cbslocal.com","gender":"Female","ip_address":"0.218.207.88"},
{"first_name":"Spense","last_name":"Bottell","email":"sbottell1@lulu.com","gender":"Male","ip_address":"35.152.181.237"},
{"first_name":"Ashby","last_name":"Coulston","email":"acoulston2@storify.com","gender":"Male","ip_address":"29.242.115.249"},
{"first_name":"Merwyn","last_name":"Chesser","email":"mchesser3@moonfruit.com","gender":"Male","ip_address":"14.218.100.16"},
{"first_name":"Myra","last_name":"Grouse","email":"mgrouse4@usgs.gov","gender":"Female","ip_address":"108.81.105.108"},
{"first_name":"Ansel","last_name":"Moye","email":"amoye5@ox.ac.uk","gender":"Male","ip_address":"79.95.154.155"},
{"first_name":"Melinde","last_name":"Vasyukhichev","email":"mvasyukhichev6@unc.edu","gender":"Female","ip_address":"149.14.31.37"},
{"first_name":"Bill","last_name":"Saffill","email":"bsaffill7@uol.com.br","gender":"Male","ip_address":"208.28.100.205"},
{"first_name":"Darin","last_name":"Gullick","email":"dgullick8@nydailynews.com","gender":"Male","ip_address":"105.116.132.31"},
{"first_name":"Woodrow","last_name":"Bessent","email":"wbessent9@yandex.ru","gender":"Male","ip_address":"63.243.7.55"}]
    
 res.json(special);
})



function verfiyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unknown request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token ==='null'){
        return res.status(401).send('Unknown request')
    }
    let payload =jwt.verify(token,'secretkey')
    if(!payload){
        return res.status(401).send('Unknown request')
    }

    req.userId=payload.subject
    next();
}


module.exports = router;