var fs = require('fs');
var exports = module.exports = {};

exports.saveRecording = function(req, res) {
	console.log(req.body.blob,"__REQBOYY");	
  	var buf = new Buffer(JSON.stringify({"blob" : req.body.blob}), 'base64'); // decodeJSON.stringify({"hello":"world"})).toString("base64")
  	console.log("encoder.js.Buffer___",buf,"___encoder.js.Buffer");
	fs.writeFile("/test.txt", buf, function(err) {
      if(err) {
         console.log("err", err);
      } else {
         return res.json({'status': 'success'});
      }
	}) 
}