const express = require('express')
const crypto = require('crypto')
const Users = require('../models/Users')

const router = express.Router()


router.post('/Register',(req,res) =>{
  const {email,password} = req.body
  crypto.randomBytes(16,(err,salt) =>{
    const newSalt = salt.toString('base64')
    crypto.pbkdf2(password,newSalt,10000,64,'sha1',(erro,key) =>{
      const encriptedPass = key.toString('base64')
      Users.findOne({email}).exec()
        .then(user =>{
          if(user){
            return res.send('Usuario ya existe')
          }
          Users.create({
            email,
            password: encriptedPass,
            salt: newSalt,
          }).then(()=>{
            res.send('Usuario creado con exito')
          })
        })
    })
  })
})

router.post('/login',(req,res) =>{
  res.send('soy login')
})

module.exports =  router