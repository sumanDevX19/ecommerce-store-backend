const express = require('express');
const router  = express.Router();

router.get('/',(req,res)=>{
    res.send('Billionaire Suman Saha Products')
})


module.exports = router