module.exports = {
  create: function(req, res) {

    var userParams = {
      email : req.param('email'),
      firstName : req.param('firstName'),
      lastName : req.param('lastName'),
    };
    console.log(userParams);
    User.create(userParams, function (err, user) {
      if (err) {
        return res.json(400,err);
        console.log(err);
        return;
      } else {
        res.json(user);
      } 
    });
  },
}