var bbConfig = require('@atlassian/bitbucket-component-dev-dependencies').config;

module.exports = function(grunt) {
    grunt.initConfig(bbConfig.grunt.getConfig(grunt));
    bbConfig.grunt.registerTasks(grunt);
};
