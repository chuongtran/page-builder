// module.exports = {
//   addConv: function(req, res) {
//     var chatParams = {
//       userName : req.param('userName'),
//       message : req.param('message'),
//     };
//     console.log(req);
//     if (req.isSocket && req.method === 'POST') {
//       console.log(chatParams);
//       async.waterfall([
//         function (next) {
//           Chat.create(chatParams, function (err, chatResult) {
//             if (err) {
//               console.log(err);
//               return next(err);
//             }
//             next(null, chatResult);
//           })
//         },
//         function (chatResult, next) {
//           Chat.publishCreate({
//             id: chatResult.id,
//             userName: chatResult.userName,
//             message: chatResult.message
//           });
//           next(null, chatResult);
//         }
//       ], function (err, result) {
//         if (err) {
//           return res.status(err.status || 500).json(err);
//         }
//         res.status(200).json(result);
//       });
//     }
//     else {
//       Chat.watch(req.socket);
//       console.log('User subscribed to ' + req.socket.id);
//     }
    
//   },
// }

module.exports = {

    addConv: function(req, res) {
      var data_from_client = req.params.all();
      console.log(req.method);
      if (req.isSocket && req.method === 'POST') {
        // This is the message from connected client
        // So add new conversation
        Chat.create(data_from_client)
          .exec(function(error, data_from_client) {
            console.log(data_from_client);
            Chat.publishCreate({ 
              id: data_from_client.id, 
              message: data_from_client.message,
              userName: data_from_client.userName
            });
            Chat.watch(req.socket);
            console.log('User subscribed to ' + req.socket.id);
          });
        }
    },
    getAll: function (req, res) {
      // Chat.watch(req.socket);
      Chat.find({}, function (err, result) {
        if (err) {
          return res.status(err.status || 500).json(err);
        }
        res.status(200).json(result);
      })
    },
    connectIO: function (req, res) {
      Chat.watch(req.socket);
      console.log(req.socket.id + ' is connected');
      res.status(200).json({});
    }
};