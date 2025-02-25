const express = require('express')
const routerforhome = express.Router()

routerforhome.get('/',(req,res)=>{
    console.log('Hit')
  
 
})




module.exports = routerforhome;