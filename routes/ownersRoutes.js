const express = require('express');
const router  = express.Router();

router.get('/',(req,res)=>{
    res.send('Billionaire Suman Saha Owner')
})


module.exports = router