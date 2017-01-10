module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'html2js:app',
		'bower:install',
		'jst:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
