var express = require('express');
var underscore = require('underscore');
var crypto = require('crypto');
var router = express.Router();

/* GET weixin listing. */
router.get('/', function(req, res, next) {
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var token = 'vegachou';
    var array = [token,timestamp,nonce];
    array = array.sort();
    var compact;
    underscore.each(array,function(item){
	if(compact === undefined){
	    compact = item;
	} else{
	    compact = compact + item;
	}
    });
    var sha1 = crypto.createHash('sha1');
    sha1.update(compact);
    var result = sha1.digest('hex');
    var echostr = req.query.echostr;
    //console.log(signature);
    //console.log(timestamp);
    //console.log(nonce);
    //console.log(array);
    //console.log(compact);
    //console.log(result);
    //console.log(echostr);
    if(result === signature){
	res.send(echostr);    
    } else{
        res.send('get /weixin response');
    }    
});

module.exports = router;
