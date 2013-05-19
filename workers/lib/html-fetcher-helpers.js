var fs = require('fs');
var http = require('http');
var url = require('url');
exports.readUrls = function(filePath, cb){
  fs.readFile(filePath, 'utf8', function(err,data){
    if (err){
      console.log('there was an error!', err);
    } else {
     var urlArray = data.split('\n');
     urlArray.splice(urlArray.length - 1, 1);
     urlArray.forEach(cb);
    }
  });
};

exports.downloadUrl = function(url){
    var options = {
      hostname: url,
      port: 80,
      path: '/',
      method: 'GET'
    };
    var req = http.request(options, function(res){
      var body = "";
      console.log(url,' STATUS: ' + res.statusCode);
      res.setEncoding('utf8');
      res.on('data', function(data){
        body += data;
      });
      res.on('end', function(){
        console.log(res.url);
        fs.writeFile(__dirname + '/../../data/sites/' + url, body, function(err){
          if (err){
            console.error(err);
          } else {
            console.log('File downloaded at: ' + __dirname + '/../../data/sites/' + url);
          }
        });
      });
    });
    req.on('error', function(e) {
      console.log("Got error: " + e.message);
    });
    req.end();
};





