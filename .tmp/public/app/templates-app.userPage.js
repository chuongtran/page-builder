angular.module('templates-app', ['app/admin/dashboard.tpl.jade', 'app/front/front.tpl.jade']);

angular.module("app/admin/dashboard.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/admin/dashboard.tpl.jade",
    "<h1>TEST</h1><h2>TEST </h2><h3>TEST</h3><h4>TEST</h4>");
}]);

angular.module("app/front/front.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/front/front.tpl.jade",
    "<h1>Test</h1><h2>Front end</h2>");
}]);
