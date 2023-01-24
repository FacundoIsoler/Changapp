const { Router } = require('express');
const  transporter  = require('../config/mailer.js');
const message = require('../config/messanges.js');
const maierControllers = require('../config/mailerController.js');

const router = Router();

router.get('/', async (req, res, next) => {

  const { success, email, receiptId } = req.query

  if(success){

    const order = await maierControllers.getData(receiptId);

  try{
    if(success === "true"){
      await transporter.sendMail(message.successMessage(email, order));
    }else if(success === "false"){
      await transporter.sendMail(message.failureMessage(email, order))
    }
      return res.json("Envio de correo exitoso")

    }catch(err){
      console.log(err)
      next(err)
    }
  }

  next();

})

module.exports = router;

