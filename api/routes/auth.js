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
  const {email,password} = req.body
  Users.findOne({email}).exec()
    .then(user => {
      if(!user){
        return res.send('usuario y/o contraseña incorrecta')
      }
      crypto.pbkdf2(password,user.salt,10000,64,'sha1',(erro,key) =>{
        const encriptedPass = key.toString('base64')
        if(user.password === encriptedPass){
          const token = signToken(user._id)
          return res.send({token})
        }
        return res.send('usuario y/o contraseña incorrecta')
      })
    })
})

module.exports =  router