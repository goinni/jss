/**
 * @since 2016-08-10 21:43
 * @author Jerry.hou
 */
module.exports = function(grunt){

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        /**
         * 基础配制信息
         */
        config: {
          folder: 'release',
          ip: 'http://127.0.0.1',
          port: 9999,
          livereload: 35740
        },
        /**
         * 版权信息
         */
        banner: '/** \n * <%= pkg.name %> - v<%= pkg.version %> \n' +
                ' * Create Date -<%= grunt.template.today("yyyy-mm-dd HH:MM:dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n */\n',
        /**
         * 合并文件
         */
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= banner %>',
            },
            dev: {
                src: [
                        '<%= config.folder %>/tpls.js',
                        'app/jss.js',
                        'app/src/*.js'
                    ],
                dest: '<%= config.folder %>/jss.min.js',
            }
        },
        /**
         * JS 压缩
         */
        uglify: {
            options: {
                mangle: true,
                banner: '<%= banner %>'
            },
            dev: {
                files: {
                    '<%= config.folder %>/jss.min.js': ['<%= config.folder %>/jss.min.js']
                }
            }
        },
        /**
         * html to js 转换器
         */
        htmlConvert: {
            options: {
                base:'<%= config.folder %>',
                rename:function (moduleName) {
                    return moduleName.replace('.html', '');
                }
            },
            jsstpls: {
                src: ['<%= config.folder %>/tpl/*.html'],
                dest: '<%= config.folder %>/tpls.js'
            }
        },
        /**
         * html文件压缩
         */
        htmlmin: {             
            dev: {                              
                options: {                       
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/tpl',
                    src: '**/*.html',
                    dest: '<%= config.folder %>/tpl'
                }]
            }
        },
        /**
         * 静态文件服务器
         */
        connect: {
            server: {
                options: {
                    // 经过测试 connect插件会依照base的定义顺序检索文件
                    // 这意味着如果存在相同文件，定义在前面的会优先返回
                    base: ['<%= config.folder %>', '.'],
                    port: '<%= config.port %>',
                    open: '<%= config.ip+ ":" +config.port %>/',
                    livereload: '<%= config.livereload%>',
                    hostname: '*',
                    middleware: function(connect, options, middlewares) {
                        // inject a custom middleware into the array of default middlewares 
                        middlewares.unshift(function(req, res, next) {
                        // if (req.url !== '/hello/world') return next();
                        // res.end('Hello, world from port #' + options.port + '!');
                            return next();
                        });
                      return middlewares;
                    }
                }
            }
        },
        /**
         * 复制
         */
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['*.html'],
                    dest: '<%= config.folder %>'
                }]
            },
            //watch 时单独处理的任务
            appHtml: {
                expand: true,
                cwd: 'app',
                src: ['*.html'],
                dest: '<%= config.folder %>'
            }
        },
        /**
         * 监听Task改变并执行对应的Task
         */
        watch: {
            options: {
                livereload: '<%= config.livereload%>'
            },
            tpl: {
                files: "app/tpl/**/*",
                tasks: ["htmlmin","htmlConvert","concat:dev"]
            },
            script: {
                files: ["app/src/*", "app/jss.js"],
                tasks: ["concat:dev"]
            },
            appHtml: {
                files: "app/*.html",
                tasks: ["copy:appHtml"]
            }
        },
        /**
         *  清理目录
         */
        clean: {
            dev:['<%= config.folder %>']
        }
    });
    /**
     * 开发模式
     */
    grunt.registerTask('default', function () {
        grunt.task.run([
            'clean:dev', 
            'copy:appHtml', 
            'htmlmin', 
            'htmlConvert', 
            'concat:dev', 
            'connect:server', 
            'watch']);
    });

    /**
     * 打包上线
     */
    grunt.registerTask('release', function () {
        grunt.task.run([
            'clean:dev', 
            'htmlmin', 
            'htmlConvert', 
            'concat:dev', 
            'uglify:dev', 
            'copy:appHtml']);
    });
}
