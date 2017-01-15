process.on('uncaughtException', function (error) {
   console.log(error.stack);
});
var http = require('http');
module.exports = {
	userhome: function(req, res) {
    res.view('homepage');
  },
  redirect: function(req,res,next) {
    var routes = staticRoutes.routes();
    if(routes.hasOwnProperty(req.param('staticRoute'))) {
      return res.redirect(routes[req.param('staticRoute')]);
    } else {
      next();
    }
  },
  pmapi: function(req, res){
    try {
      http.get({
        host: req.param("inputhost"),
        port: 44323,
        path: req.url
      }, function(response) {
          // Continuously update stream with data
          var body = '';
          response.on('data', function(d) {
              body += d;
          });
          response.on('end', function() {
            var parsed = JSON.parse(body);
            res.json(200, parsed);
          });
      });
    } catch (e) {
      res.send(400, e);
    }
  }
}
process.on('uncaughtException', function (error) {
   console.log(error.stack);
});