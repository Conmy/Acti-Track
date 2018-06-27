module.exports = function(grunt) {
	"use strict";

	// Project configuration.
    grunt.initConfig({
		
		myGruntSettings: {
			myLocalPort: '8080', //Replace with port number of local Java server
			myAuthorization: '' //Replace with hash value of password
		},

        watch: {
            livereload: {
                options: {
                    livereload: "<%= connect.options.livereload %>"
                },
                files: ["webapp/index.html", "webapp/manifest.json", "webapp/**/*.js", "webapp/**/*.xml", "!node_modules/**"]
            }
        },

        open: {
            root: {
                path: "http://<%= connect.options.hostname %>:<%= connect.options.port %>/<%= connect.app.base %>",
                app: "Chrome",
                options: {
                    delay: 500
                }
            },
            dev: {
            	path: "http://<%= connect.options.hostname %>:<%= connect.options.port %>/test/test.html",
                app: "Chrome",
                options: {
                    delay: 500
                }
            }
        },

        connect: {
            options: {
                livereload: 35729,
                port: 9090,
                hostname: "localhost"
            },

            app: {
                base: "./webapp" 
            },

            proxies: [
                {
                    context: "/proxy",  // When the url contains this...
                    host: "proxy", // Proxy to this host
                    changeOrigin: false,
                    port: 8080,
                    rewrite: {
                        '^/proxy': ''
                    }
                }
            ],

            livereload: {
                options: {
                    
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-open");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-connect-proxy");
    grunt.loadNpmTasks("grunt-concurrent");

	grunt.registerTask("default", [
		"clean",
		"lint",
		"build"
	]);

	grunt.registerTask("serve", function () {
        grunt.task.run(["configureProxies", "connect:livereload", "open:root", "watch"]);
    });

    grunt.registerTask("test", function () {
        grunt.task.run(["configureProxies", "connect:livereload", "open:dev", "watch"]);
    });

};