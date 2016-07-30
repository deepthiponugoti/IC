module.exports = function(grunt) {
    grunt.initConfig({
        nodeunit: {
            all: ['test/**/*test.js']
        },
        "install-dependencies": {
            options: {
                isDevelopment: true
            }
        },
        exec: {
            coverage: 'node "node_modules/istanbul/lib/cli.js" cover "node_modules/nodeunit/bin/nodeunit" -- test',
            dirverprogram: 'node "src/driverprogram.js" "../resources/woeids.txt"',
            coffeeprogram: 'coffee -c "src/weatherRetrievalCoffee.coffee"',
            nodeunit: 'nodeunit'
        }
    });

    grunt.loadNpmTasks('grunt-install-dependencies');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('coverage', 'exec:coverage');
    grunt.registerTask('dirverprogram', 'exec:dirverprogram');
    grunt.registerTask('copyBack', function() {
        grunt.file.copy('src/includeJs.js', 'src/include.js');
    });
    grunt.registerTask('coffeeprogram', 'exec:coffeeprogram');
    grunt.registerTask('copyFile', function() {
        grunt.file.copy('src/includeCoffee.js', 'src/include.js');
    });
    grunt.registerTask('nodeunit', 'exec:nodeunit');
   	grunt.registerTask('usetheforce_on',
    'force the force option on if needed', 
    function() {
     	if ( !grunt.option( 'force' ) ) {
       		grunt.config.set('usetheforce_set', true);
       		grunt.option( 'force', true );
     	}
   	});
    grunt.registerTask('default', ['install-dependencies', 'nodeunit', 'coverage', 'coffeeprogram', 'copyFile', 'usetheforce_on', 'nodeunit', 'copyBack','dirverprogram']);
}
