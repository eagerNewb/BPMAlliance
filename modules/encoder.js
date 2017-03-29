var fs = require('fs');
var exports = module.exports = {};

exports.saveRecording = function(req, res) {
  var buf = new Buffer(req.body, 'base64'); // decode
  fs.writeFile("../test.wav", buf, function(err) {
    if(err) {
      console.log("err", err);
    } else {
      return res.json({'status': 'success'});
    }
  }) 
}