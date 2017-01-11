this["JST"] = this["JST"] || {};

this["JST"]["assets/app/form-builder.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="navbar navbar-inverse navbar-fixed-bottom">\r\n    <div class="col-lg-12">\r\n        <form class="form_chat clearfix" style="padding-top: 15px;">\r\n            <div class="col-lg-4 col-md-3">\r\n                <!-- Username -->\r\n                <input type="text" ng-model="chatUser" class="form-control" placeholder="TypeYourNameHere">\r\n            </div>\r\n            <div class="col-lg-6 col-md-5">\r\n                <!-- Chat Message -->\r\n                <input type="text" ng-model="chatMessage" class="form-control" placeholder="TypeYourMessageHere">\r\n            </div>\r\n            <button class="btn btn-default col-lg-2 col-md-2" ng-click="sendMsg()">Send</button>\r\n        </form>\r\n    </div>\r\n</div>\r\n\r\n<div class="col-md-12" style="padding:100px">\r\n    <table  class="table">\r\n        <tr class="chat_message" ng-repeat="chat in chatList | orderBy:predicate:reverse">\r\n            <td class="col-md-12 td_class"><strong>{{chat.userName}} : </strong> {{chat.message}}</td>\r\n        </tr>\r\n    </table>\r\n</div>';

}
return __p
};

this["JST"]["assets/app/form-builder.tpl.jade"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 'h1 Form\r\nh2 Title 2\r\ndiv.aaa class aaa';

}
return __p
};

this["JST"]["assets/app/templates/form-builder.jade"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 'h1 Form\r\nh2 Title 2\r\ndiv.aaa class aaa';

}
return __p
};