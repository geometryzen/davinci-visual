/**
 * NOTE: This file has hooks for compiling to AMD and CommonJS which
 * we don't use right now. This is because shimming three.js with the
 * TypeScript compiler in order to perform testing is problematic.
 * A simpler approach using internal modules is satisfactory right now.
 */
module.exports = function(grunt) {

  var path = require('path');
  var cp = require('child_process');
  var Q = require('q');

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    clean: {
      src: ['dist', 'build', 'amd', 'cjs']
    },

    exec: {
      'test': {
        command: 'npm test',
        stdout: true,
        stderr: true
      }
    },

    requirejs: {
      compile: {
        options: {
          mainConfigFile: "build.js"
        }
      }
    },

    uglify: {
      dist: {
        src: 'dist/davinci-visual.js',
        dest: 'dist/davinci-visual.min.js'
      }
    },

    copy: {
      main: {
        expand: true,
        cwd: 'src/modules/',
        src: ['davinci-visual.d.ts'],
        dest: 'dist/'
      }
    },

    connect: {
        test: {
            options: {
                port: 8080
            }
        }
    },

    jasmine: {
        taskName: {
            src: 'amd/**/*.js',
            options: {
                specs: 'test/amd/*_test.js',
                host: 'http://127.0.0.1:8080/',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                      baseUrl: 'amd/'
                    }
                }
            }
        }
    },

    jshint: {
        src: [
            'Gruntfile.js',
            'dist/**/*.js',
            'amd/**/*.js',
            'cjs/**/*.js',
            'spec/**/*.js'
        ],
        options: {
            jshintrc: '.jshintrc'
        }
    },

    yuidoc: {
        compile: {
            name: '<%= pkg.name %>',
            description: '<%= pkg.description %>',
            version: '<%= pkg.version %>',
            url: '<%= pkg.homepage %>',
            logo: '../assets/logo.png',
            options: {
                paths: 'dist',
                outdir: 'documentation'
            }
        }
    },

    complexity: {
      generic: {
          src: ['amd/**/*.js'],
          options: {
              jsLintXML: 'report.xml', // create XML JSLint-like report
              checkstyleXML: 'checkstyle.xml', // create checkstyle report
              errorsOnly: false, // show only maintainability errors
              cyclomatic: 3,
              halstead: 8,
              maintainability: 100
          }
      }
    }
  });

  function tsc(tsfile, option) {
    var command = "node " + path.resolve(path.dirname(require.resolve("typescript")), "tsc ");
    var optArray = Object.keys(option || {}).reduce(function(res, key) {
            res.push(key);
            if(option[key]){
                res.push(option[key]);
            }
            return res;
        }, []);

    return Q.Promise(function(resolve, reject) {
      var cmd = command + " " + tsfile + " " + optArray.join(" ");
      var childProcess = cp.exec(cmd, {});
      childProcess.stdout.on('data', function (d) { grunt.log.writeln(d); });
      childProcess.stderr.on('data', function (d) { grunt.log.error(d); });

      childProcess.on('exit', function(code) {
        if (code !== 0) {
          reject();
        }
        resolve();
      });
    });
  }

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-exec');

  var compilerSources = [
      "src/davinci-visual.ts", "src/davinci-visual/*.ts"
  ];

  function ES5(xs) {
      return ['--target ES5'].concat(xs);
  }

  function ES6(xs) {
      return ['--target ES6'].concat(xs);
  }

  function AMD(xs) {
      return ['--module amd'].concat(xs);
  }

  function COMMONJS(xs) {
      return ['--module commonjs'].concat(xs);
  }

  function INTERNAL(xs) {
      return xs;
  }

  function removeComments(xs) {
      return ['--removeComments'].concat(xs);
  }

  function out(FILE, xs) {
      return ['--out', FILE].concat(xs);
  }

  function outDir(where, xs) {
      return ['--outDir', where].concat(xs);
  }

  var argsAMD = AMD(ES5(compilerSources));
  var argsCJS = COMMONJS(ES5(compilerSources));
  var argsINT = out('dist/davinci-visual.js', INTERNAL(ES5(compilerSources)));

  grunt.registerTask('buildAMD', "Build", function(){
    var done = this.async();
    tsc(['--declaration'].concat(outDir('amd', argsAMD)).join(" ")).then(function(){
      done(true);
    }).catch(function(){
      done(false);
    });
  });

  grunt.registerTask('buildCJS', "Build", function(){
    var done = this.async();
    tsc(['--declaration'].concat(outDir('cjs', argsCJS)).join(" ")).then(function(){
      done(true);
    }).catch(function(){
      done(false);
    });
  });

  grunt.registerTask('build', "Build", function(){
    var done = this.async();
    tsc(['--declaration'].concat(outDir('build', argsINT)).join(" ")).then(function(){
      done(true);
    }).catch(function(){
      done(false);
    });
  });

  grunt.registerTask('test', ['connect:test', 'jasmine']);

  grunt.registerTask('docs', ['yuidoc']);

  grunt.registerTask('testAll', ['exec:test', 'test']);

  grunt.registerTask('default', ['clean', 'build', 'docs'/*, 'copy'*/, 'uglify']);
};
