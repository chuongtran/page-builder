angular.module('templates-app', ['form-builder.html', 'form-builder.tpl.jade', 'templates/form-builder.jade']);

angular.module("form-builder.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("form-builder.html",
    "<div class=\"navbar navbar-inverse navbar-fixed-bottom\">\n" +
    "    <div class=\"col-lg-12\">\n" +
    "        <form class=\"form_chat clearfix\" style=\"padding-top: 15px;\">\n" +
    "            <div class=\"col-lg-4 col-md-3\">\n" +
    "                <!-- Username -->\n" +
    "                <input type=\"text\" ng-model=\"chatUser\" class=\"form-control\" placeholder=\"TypeYourNameHere\">\n" +
    "            </div>\n" +
    "            <div class=\"col-lg-6 col-md-5\">\n" +
    "                <!-- Chat Message -->\n" +
    "                <input type=\"text\" ng-model=\"chatMessage\" class=\"form-control\" placeholder=\"TypeYourMessageHere\">\n" +
    "            </div>\n" +
    "            <button class=\"btn btn-default col-lg-2 col-md-2\" ng-click=\"sendMsg()\">Send</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-md-12\" style=\"padding:100px\">\n" +
    "    <table  class=\"table\">\n" +
    "        <tr class=\"chat_message\" ng-repeat=\"chat in chatList | orderBy:predicate:reverse\">\n" +
    "            <td class=\"col-md-12 td_class\"><strong>{{chat.userName}} : </strong> {{chat.message}}</td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>");
}]);

angular.module("form-builder.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("form-builder.tpl.jade",
    "<h1>Form</h1><h2>Title 2</h2><div class=\"aaa\">class aaa</div>");
}]);

angular.module("templates/form-builder.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/form-builder.jade",
    "<h1>Form</h1><h2>Title 2</h2><div class=\"aaa\">class aaa</div>");
}]);
