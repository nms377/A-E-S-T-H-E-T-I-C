const express = require('express');
const router = express.Router();
const fs = require('fs');
const querystring = require('querystring');

router.route('/')
  .get((req,res) => {
    fs.readFile('./public/index.html', (err, data) => {
      if (err) throw err;
      res.write(data)
      res.end();
    });
  })

module.exports = router;