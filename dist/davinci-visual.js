(function(global, define)
{
  var THREE = global.THREE;
  console.log('THREE=>' + typeof THREE);

/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                //Lop off the last part of baseParts, so that . matches the
                //"directory" and not name of the baseName's module. For instance,
                //baseName of "one/two/three", maps to "one/two/three.js", but we
                //want the directory, "one/two" for this normalization.
                name = baseParts.slice(0, baseParts.length - 1).concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("../vendor/almond/almond", function(){});

define('davinci-visual/core',["require", "exports"], function (require, exports) {
    var visual = {
        VERSION: '0.0.14'
    };
    return visual;
});

///<reference path="../../typings/threejs/three.d.ts"/>
define('davinci-visual/VisualElement',["require", "exports"], function (require, exports) {
    /**
     * Visual provides the common behavior for all Mesh (Geometry, Material) objects.
     */
    var VisualElement = (function () {
        function VisualElement(geometry, color, opacity, transparent) {
            if (opacity === void 0) { opacity = 1.0; }
            if (transparent === void 0) { transparent = false; }
            this.geometry = geometry;
            this.material = new THREE.MeshLambertMaterial({ "color": color, "opacity": opacity, "transparent": transparent });
            this.mesh = new THREE.Mesh(this.geometry, this.material);
        }
        Object.defineProperty(VisualElement.prototype, "position", {
            get: function () {
                return this.mesh.position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "quaternion", {
            get: function () {
                return this.mesh.quaternion;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "scale", {
            get: function () {
                return this.mesh.scale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "opacity", {
            get: function () {
                return this.material.opacity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VisualElement.prototype, "color", {
            get: function () {
                return this.material.color;
            },
            enumerable: true,
            configurable: true
        });
        return VisualElement;
    })();
    return VisualElement;
});

///<reference path="../../typings/threejs/three.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('davinci-visual/RevolutionGeometry',["require", "exports"], function (require, exports) {
    var RevolutionGeometry = (function (_super) {
        __extends(RevolutionGeometry, _super);
        function RevolutionGeometry(points, generator, segments, phiStart, phiLength, attitude) {
            _super.call(this);
            segments = segments || 12;
            phiStart = phiStart || 0;
            phiLength = phiLength || 2 * Math.PI;
            // Determine heuristically whether the user intended to make a complete revolution.
            var isClosed = Math.abs(2 * Math.PI - Math.abs(phiLength - phiStart)) < 0.0001;
            // The number of vertical half planes (phi constant).
            var halfPlanes = isClosed ? segments : segments + 1;
            var inverseSegments = 1.0 / segments;
            var phiStep = (phiLength - phiStart) * inverseSegments;
            var i;
            var j;
            var il;
            var jl;
            for (i = 0, il = halfPlanes; i < il; i++) {
                var phi = phiStart + i * phiStep;
                var halfAngle = phi / 2;
                var cosHA = Math.cos(halfAngle);
                var sinHA = Math.sin(halfAngle);
                var rotor = new THREE.Quaternion(generator.x * sinHA, generator.y * sinHA, generator.z * sinHA, cosHA);
                for (j = 0, jl = points.length; j < jl; j++) {
                    var pt = points[j];
                    var vertex = new THREE.Vector3(pt.x, pt.y, pt.z);
                    // The generator tells us how to rotate the points.
                    vertex.applyQuaternion(rotor);
                    // The attitude tells us where we want the symmetry axis to be.
                    if (attitude) {
                        vertex.applyQuaternion(attitude);
                    }
                    this.vertices.push(vertex);
                }
            }
            var inversePointLength = 1.0 / (points.length - 1);
            var np = points.length;
            // The denominator for modulo index arithmetic.
            var wrap = np * halfPlanes;
            for (i = 0, il = segments; i < il; i++) {
                for (j = 0, jl = points.length - 1; j < jl; j++) {
                    var base = j + np * i;
                    var a = base % wrap;
                    var b = (base + np) % wrap;
                    var c = (base + 1 + np) % wrap;
                    var d = (base + 1) % wrap;
                    var u0 = i * inverseSegments;
                    var v0 = j * inversePointLength;
                    var u1 = u0 + inverseSegments;
                    var v1 = v0 + inversePointLength;
                    this.faces.push(new THREE.Face3(d, b, a));
                    this.faceVertexUvs[0].push([
                        new THREE.Vector2(u0, v0),
                        new THREE.Vector2(u1, v0),
                        new THREE.Vector2(u0, v1)
                    ]);
                    this.faces.push(new THREE.Face3(d, c, b));
                    this.faceVertexUvs[0].push([
                        new THREE.Vector2(u1, v0),
                        new THREE.Vector2(u1, v1),
                        new THREE.Vector2(u0, v1)
                    ]);
                }
            }
            this.computeFaceNormals();
            this.computeVertexNormals();
        }
        return RevolutionGeometry;
    })(THREE.Geometry);
    return RevolutionGeometry;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('davinci-visual/ArrowGeometry',["require", "exports", 'davinci-visual/RevolutionGeometry'], function (require, exports, RevolutionGeometry) {
    var ArrowGeometry = (function (_super) {
        __extends(ArrowGeometry, _super);
        function ArrowGeometry(scale, attitude, segments, length, radiusShaft, radiusCone, lengthCone, axis) {
            scale = scale || 1;
            attitude = attitude || new THREE.Quaternion(0, 0, 0, 1);
            length = (length || 1) * scale;
            radiusShaft = (radiusShaft || 0.01) * scale;
            radiusCone = (radiusCone || 0.08) * scale;
            lengthCone = (lengthCone || 0.20) * scale;
            axis = axis || new THREE.Vector3(0, 0, 1);
            var lengthShaft = length - lengthCone;
            var halfLength = length / 2;
            var permutation = function (direction) {
                if (direction.x) {
                    return 2;
                }
                else if (direction.y) {
                    return 1;
                }
                else {
                    return 0;
                }
            };
            var orientation = function (direction) {
                if (direction.x > 0) {
                    return +1;
                }
                else if (direction.x < 0) {
                    return -1;
                }
                else if (direction.y > 0) {
                    return +1;
                }
                else if (direction.y < 0) {
                    return -1;
                }
                else if (direction.z > 0) {
                    return +1;
                }
                else if (direction.z < 0) {
                    return -1;
                }
                else {
                    return 0;
                }
            };
            var computeArrow = function (direction) {
                var cycle = permutation(direction);
                var sign = orientation(direction);
                var i = (cycle + 0) % 3;
                var j = (cycle + 1) % 3;
                var k = (cycle + 2) % 3;
                var shL = halfLength * sign;
                var data = [
                    [0, 0, halfLength * sign],
                    [radiusCone, 0, (lengthShaft - halfLength) * sign],
                    [radiusShaft, 0, (lengthShaft - halfLength) * sign],
                    [radiusShaft, 0, (-halfLength) * sign],
                    [0, 0, (-halfLength) * sign]
                ];
                var points = data.map(function (point) {
                    return new THREE.Vector3(point[i], point[j], point[k]);
                });
                var generator = new THREE.Quaternion(direction.x, direction.y, direction.z, 0);
                return { "points": points, "generator": generator };
            };
            var arrow = computeArrow(axis);
            _super.call(this, arrow.points, arrow.generator, segments, 0, 2 * Math.PI, attitude);
        }
        return ArrowGeometry;
    })(RevolutionGeometry);
    return ArrowGeometry;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('davinci-visual/Arrow',["require", "exports", 'davinci-visual/VisualElement', 'davinci-visual/ArrowGeometry'], function (require, exports, VisualElement, ArrowGeometry) {
    var Arrow = (function (_super) {
        __extends(Arrow, _super);
        function Arrow(scale, color, opacity, transparent) {
            if (opacity === void 0) { opacity = 1.0; }
            if (transparent === void 0) { transparent = false; }
            _super.call(this, new ArrowGeometry(scale), color, opacity, transparent);
        }
        return Arrow;
    })(VisualElement);
    return Arrow;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('davinci-visual/Box',["require", "exports", 'davinci-visual/VisualElement'], function (require, exports, VisualElement) {
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box(width, height, depth, color, opacity, transparent) {
            if (opacity === void 0) { opacity = 1.0; }
            if (transparent === void 0) { transparent = false; }
            _super.call(this, new THREE.BoxGeometry(width, height, depth), color, opacity, transparent);
        }
        return Box;
    })(VisualElement);
    return Box;
});

///<reference path="../../typings/threejs/three.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('davinci-visual/VortexGeometry',["require", "exports"], function (require, exports) {
    var VortexGeometry = (function (_super) {
        __extends(VortexGeometry, _super);
        function VortexGeometry(radius, radiusCone, radiusShaft, lengthCone, lengthShaft, arrowSegments, radialSegments) {
            _super.call(this);
            var scope = this;
            var n = 9;
            radius = radius || 1;
            radiusCone = radiusCone || 0.08;
            radiusShaft = radiusShaft || 0.01;
            lengthCone = lengthCone || 0.2;
            lengthShaft = lengthShaft || 0.8;
            arrowSegments = arrowSegments || 6;
            var circleSegments = arrowSegments * n;
            radialSegments = radialSegments || 8;
            var twoPI = Math.PI * 2;
            var R = radius;
            var center = new THREE.Vector3();
            var uvs = [];
            var normals = [];
            var alpha = lengthShaft / (lengthCone + lengthShaft);
            var factor = twoPI / arrowSegments;
            var theta = alpha / (n - 2);
            function computeAngle(circleSegments, i) {
                var m = i % n;
                if (m === n - 1) {
                    return computeAngle(circleSegments, i - 1);
                }
                else {
                    var a = (i - m) / n;
                    return factor * (a + m * theta);
                }
            }
            function computeRadius(i) {
                var m = i % n;
                if (m === n - 1) {
                    return radiusCone;
                }
                else {
                    return radiusShaft;
                }
            }
            for (var j = 0; j <= radialSegments; j++) {
                // v is the angle inside the vortex tube.
                var v = twoPI * j / radialSegments;
                var cosV = Math.cos(v);
                var sinV = Math.sin(v);
                for (var i = 0; i <= circleSegments; i++) {
                    // u is the angle in the xy-plane measured from the x-axis clockwise about the z-axis.
                    var u = computeAngle(circleSegments, i);
                    var cosU = Math.cos(u);
                    var sinU = Math.sin(u);
                    center.x = R * cosU;
                    center.y = R * sinU;
                    var vertex = new THREE.Vector3();
                    var r = computeRadius(i);
                    vertex.x = (R + r * cosV) * cosU;
                    vertex.y = (R + r * cosV) * sinU;
                    vertex.z = r * sinV;
                    this['vertices'].push(vertex);
                    uvs.push(new THREE.Vector2(i / circleSegments, j / radialSegments));
                    normals.push(vertex.clone().sub(center).normalize());
                }
            }
            for (var j = 1; j <= radialSegments; j++) {
                for (var i = 1; i <= circleSegments; i++) {
                    var a = (circleSegments + 1) * j + i - 1;
                    var b = (circleSegments + 1) * (j - 1) + i - 1;
                    var c = (circleSegments + 1) * (j - 1) + i;
                    var d = (circleSegments + 1) * j + i;
                    var face = new THREE.Face3(a, b, d, [normals[a], normals[b], normals[d]]);
                    face.normal.add(normals[a]);
                    face.normal.add(normals[b]);
                    face.normal.add(normals[d]);
                    face.normal.normalize();
                    this.faces.push(face);
                    this.faceVertexUvs[0].push([uvs[a].clone(), uvs[b].clone(), uvs[d].clone()]);
                    face = new THREE.Face3(b, c, d, [normals[b], normals[c], normals[d]]);
                    face.normal.add(normals[b]);
                    face.normal.add(normals[c]);
                    face.normal.add(normals[d]);
                    face.normal.normalize();
                    this.faces.push(face);
                    this.faceVertexUvs[0].push([uvs[b].clone(), uvs[c].clone(), uvs[d].clone()]);
                }
            }
        }
        return VortexGeometry;
    })(THREE.Geometry);
    return VortexGeometry;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('davinci-visual/Vortex',["require", "exports", 'davinci-visual/VisualElement', 'davinci-visual/VortexGeometry'], function (require, exports, VisualElement, VortexGeometry) {
    var Vortex = (function (_super) {
        __extends(Vortex, _super);
        function Vortex(scale, color, opacity, transparent) {
            if (opacity === void 0) { opacity = 1.0; }
            if (transparent === void 0) { transparent = false; }
            _super.call(this, new VortexGeometry(4.0, 0.32, 0.04, 0.08, 0.3, 8, 12), color, opacity, transparent);
        }
        return Vortex;
    })(VisualElement);
    return Vortex;
});

define('davinci-visual/trackball',["require", "exports"], function (require, exports) {
    var trackball = function (object, wnd) {
        var document = wnd.document;
        var documentElement = document.documentElement;
        var screen = { left: 0, top: 0, width: 0, height: 0 };
        var api = {
            enabled: true,
            rotateSpeed: 1.0,
            zoomSpeed: 1.2,
            panSpeed: 0.3,
            noRotate: false,
            noZoom: false,
            noPan: false,
            staticMoving: false,
            dynamicDampingFactor: 0.2,
            minDistance: 0,
            maxDistance: Infinity,
            keys: [65, 83, 68],
            update: function () {
                eye.subVectors(object.position, target);
                if (!api.noRotate) {
                    rotateCamera();
                }
                if (!api.noZoom) {
                    zoomCamera();
                }
                if (!api.noPan) {
                    panCamera();
                }
                object.position.addVectors(target, eye);
                checkDistances();
                object.lookAt(target);
                if (lastPosition.distanceToSquared(object.position) > EPS) {
                    // TODO      dispatchEvent( changeEvent );
                    lastPosition.copy(object.position);
                }
            }
        };
        var handleResize = function () {
            var box = documentElement.getBoundingClientRect();
            screen.left = box.left + wnd.pageXOffset - documentElement.clientLeft;
            screen.top = box.top + wnd.pageYOffset - documentElement.clientTop;
            screen.width = box.width;
            screen.height = box.height;
        };
        var getMouseOnScreen = (function () {
            var vector = new THREE.Vector2();
            return function (pageX, pageY) {
                vector.set((pageX - screen.left) / screen.width, (pageY - screen.top) / screen.height);
                return vector;
            };
        }());
        var getMouseOnCircle = (function () {
            var vector = new THREE.Vector2();
            return function (pageX, pageY) {
                vector.set(((pageX - screen.width * 0.5 - screen.left) / (screen.width * 0.5)), ((screen.height + 2 * (screen.top - pageY)) / screen.width));
                return vector;
            };
        }());
        var moveCurr = new THREE.Vector2();
        var movePrev = new THREE.Vector2();
        var eye = new THREE.Vector3();
        var target = new THREE.Vector3();
        var lastAxis = new THREE.Vector3();
        var lastAngle = 0;
        var rotateCamera = (function () {
            var axis = new THREE.Vector3(), quaternion = new THREE.Quaternion(), eyeDirection = new THREE.Vector3(), objectUpDirection = new THREE.Vector3(), objectSidewaysDirection = new THREE.Vector3(), moveDirection = new THREE.Vector3(), angle;
            return function () {
                moveDirection.set(moveCurr.x - movePrev.x, moveCurr.y - movePrev.y, 0);
                angle = moveDirection.length();
                if (angle) {
                    eye.copy(object.position).sub(target);
                    eyeDirection.copy(eye).normalize();
                    objectUpDirection.copy(object.up).normalize();
                    objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection).normalize();
                    objectUpDirection.setLength(moveCurr.y - movePrev.y);
                    objectSidewaysDirection.setLength(moveCurr.x - movePrev.x);
                    moveDirection.copy(objectUpDirection.add(objectSidewaysDirection));
                    axis.crossVectors(moveDirection, eye).normalize();
                    angle *= api.rotateSpeed;
                    quaternion.setFromAxisAngle(axis, angle);
                    eye.applyQuaternion(quaternion);
                    object.up.applyQuaternion(quaternion);
                    lastAxis.copy(axis);
                    lastAngle = angle;
                }
                else if (!api.staticMoving && lastAngle) {
                    lastAngle *= Math.sqrt(1.0 - api.dynamicDampingFactor);
                    eye.copy(object.position).sub(target);
                    quaternion.setFromAxisAngle(lastAxis, lastAngle);
                    eye.applyQuaternion(quaternion);
                    object.up.applyQuaternion(quaternion);
                }
                movePrev.copy(moveCurr);
            };
        }());
        var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };
        var state = STATE.NONE;
        var prevState = STATE.NONE;
        var zoomStart = new THREE.Vector2();
        var zoomEnd = new THREE.Vector2();
        var touchZoomDistanceStart = 0;
        var touchZoomDistanceEnd = 0;
        var panStart = new THREE.Vector2();
        var panEnd = new THREE.Vector2();
        var zoomCamera = function () {
            var factor;
            if (state === STATE.TOUCH_ZOOM_PAN) {
                factor = touchZoomDistanceStart / touchZoomDistanceEnd;
                touchZoomDistanceStart = touchZoomDistanceEnd;
                eye.multiplyScalar(factor);
            }
            else {
                factor = 1.0 + (zoomEnd.y - zoomStart.y) * this.zoomSpeed;
                if (factor !== 1.0 && factor > 0.0) {
                    eye.multiplyScalar(factor);
                    if (api.staticMoving) {
                        zoomStart.copy(zoomEnd);
                    }
                    else {
                        zoomStart.y += (zoomEnd.y - zoomStart.y) * api.dynamicDampingFactor;
                    }
                }
            }
        };
        var panCamera = (function () {
            var mouseChange = new THREE.Vector2(), objectUp = new THREE.Vector3(), pan = new THREE.Vector3();
            return function () {
                mouseChange.copy(panEnd).sub(panStart);
                if (mouseChange.lengthSq()) {
                    mouseChange.multiplyScalar(eye.length() * api.panSpeed);
                    pan.copy(eye).cross(object.up).setLength(mouseChange.x);
                    pan.add(objectUp.copy(object.up).setLength(mouseChange.y));
                    object.position.add(pan);
                    target.add(pan);
                    if (api.staticMoving) {
                        panStart.copy(panEnd);
                    }
                    else {
                        panStart.add(mouseChange.subVectors(panEnd, panStart).multiplyScalar(api.dynamicDampingFactor));
                    }
                }
            };
        }());
        var checkDistances = function () {
            if (!api.noZoom || !api.noPan) {
                if (eye.lengthSq() > api.maxDistance * api.maxDistance) {
                    object.position.addVectors(target, eye.setLength(api.maxDistance));
                }
                if (eye.lengthSq() < api.minDistance * api.minDistance) {
                    object.position.addVectors(target, eye.setLength(api.minDistance));
                }
            }
        };
        var EPS = 0.000001;
        var lastPosition = new THREE.Vector3();
        // events
        var changeEvent = { type: 'change' };
        var startEvent = { type: 'start' };
        var endEvent = { type: 'end' };
        // for reset
        var target0 = target.clone();
        var position0 = object.position.clone();
        var up0 = object.up.clone();
        var reset = function () {
            state = STATE.NONE;
            prevState = STATE.NONE;
            target.copy(target0);
            object.position.copy(position0);
            object.up.copy(up0);
            eye.subVectors(object.position, target);
            object.lookAt(target);
            // TODO    dispatchEvent( changeEvent );
            lastPosition.copy(object.position);
        };
        // listeners
        function keydown(event) {
            if (api.enabled === false)
                return;
            wnd.removeEventListener('keydown', keydown);
            prevState = state;
            if (state !== STATE.NONE) {
                return;
            }
            else if (event.keyCode === api.keys[STATE.ROTATE] && !api.noRotate) {
                state = STATE.ROTATE;
            }
            else if (event.keyCode === api.keys[STATE.ZOOM] && !api.noZoom) {
                state = STATE.ZOOM;
            }
            else if (event.keyCode === api.keys[STATE.PAN] && !api.noPan) {
                state = STATE.PAN;
            }
        }
        function keyup(event) {
            if (api.enabled === false)
                return;
            state = prevState;
            wnd.addEventListener('keydown', keydown, false);
        }
        function mousedown(event) {
            if (api.enabled === false)
                return;
            event.preventDefault();
            event.stopPropagation();
            if (state === STATE.NONE) {
                state = event.button;
            }
            if (state === STATE.ROTATE && !api.noRotate) {
                moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
                movePrev.copy(moveCurr);
            }
            else if (state === STATE.ZOOM && !api.noZoom) {
                zoomStart.copy(getMouseOnScreen(event.pageX, event.pageY));
                zoomEnd.copy(zoomStart);
            }
            else if (state === STATE.PAN && !api.noPan) {
                panStart.copy(getMouseOnScreen(event.pageX, event.pageY));
                panEnd.copy(panStart);
            }
            document.addEventListener('mousemove', mousemove, false);
            document.addEventListener('mouseup', mouseup, false);
            // TODO dispatchEvent(startEvent);
        }
        function mousemove(event) {
            if (api.enabled === false)
                return;
            event.preventDefault();
            event.stopPropagation();
            if (state === STATE.ROTATE && !api.noRotate) {
                movePrev.copy(moveCurr);
                moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
            }
            else if (state === STATE.ZOOM && !api.noZoom) {
                zoomEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
            }
            else if (state === STATE.PAN && !api.noPan) {
                panEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
            }
        }
        function mouseup(event) {
            if (api.enabled === false)
                return;
            event.preventDefault();
            event.stopPropagation();
            state = STATE.NONE;
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
            // TODO this.dispatchEvent( endEvent );
        }
        function mousewheel(event) {
            if (api.enabled === false)
                return;
            event.preventDefault();
            event.stopPropagation();
            var delta = 0;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 40;
            }
            else if (event.detail) {
                delta = -event.detail / 3;
            }
            zoomStart.y += delta * 0.01;
            //        dispatchEvent( startEvent );
            //        dispatchEvent( endEvent );
        }
        function touchstart(event) {
            if (api.enabled === false)
                return;
            switch (event.touches.length) {
                case 1:
                    state = STATE.TOUCH_ROTATE;
                    moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    movePrev.copy(moveCurr);
                    break;
                case 2:
                    state = STATE.TOUCH_ZOOM_PAN;
                    var dx = event.touches[0].pageX - event.touches[1].pageX;
                    var dy = event.touches[0].pageY - event.touches[1].pageY;
                    touchZoomDistanceEnd = touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
                    var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    panStart.copy(getMouseOnScreen(x, y));
                    panEnd.copy(panStart);
                    break;
                default:
                    state = STATE.NONE;
            }
            // dispatchEvent( startEvent );
        }
        function touchmove(event) {
            if (api.enabled === false)
                return;
            event.preventDefault();
            event.stopPropagation();
            switch (event.touches.length) {
                case 1:
                    movePrev.copy(moveCurr);
                    moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    break;
                case 2:
                    var dx = event.touches[0].pageX - event.touches[1].pageX;
                    var dy = event.touches[0].pageY - event.touches[1].pageY;
                    touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
                    var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    panEnd.copy(getMouseOnScreen(x, y));
                    break;
                default:
                    state = STATE.NONE;
            }
        }
        function touchend(event) {
            if (api.enabled === false)
                return;
            switch (event.touches.length) {
                case 1:
                    movePrev.copy(moveCurr);
                    moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
                    break;
                case 2:
                    touchZoomDistanceStart = touchZoomDistanceEnd = 0;
                    var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                    var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                    panEnd.copy(getMouseOnScreen(x, y));
                    panStart.copy(panEnd);
                    break;
            }
            state = STATE.NONE;
            // dispatchEvent( endEvent );
        }
        // This works, bit we don't unhook it.
        documentElement.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        }, false);
        documentElement.addEventListener('mousedown', mousedown, false);
        documentElement.addEventListener('mousewheel', mousewheel, false);
        documentElement.addEventListener('DOMMouseScroll', mousewheel, false); // firefox
        documentElement.addEventListener('touchstart', touchstart, false);
        documentElement.addEventListener('touchend', touchend, false);
        documentElement.addEventListener('touchmove', touchmove, false);
        wnd.addEventListener('keydown', keydown, false);
        wnd.addEventListener('keyup', keyup, false);
        handleResize();
        // force an update at start
        api.update();
        return api;
    };
    return trackball;
});

define('davinci-visual',["require", "exports", 'davinci-visual/core', 'davinci-visual/Arrow', 'davinci-visual/Box', 'davinci-visual/Vortex', 'davinci-visual/VisualElement', 'davinci-visual/trackball'], function (require, exports, core, Arrow, Box, Vortex, VisualElement, trackball) {
    /**
     * Provides the visual module
     *
     * @module visual
     */
    var visual = {
        'VERSION': core.VERSION,
        Arrow: Arrow,
        Box: Box,
        Vortex: Vortex,
        VisualElement: VisualElement,
        trackball: trackball
    };
    return visual;
});

var library = require('davinci-visual');
if (typeof module !== 'undefined' && module.exports)
{
  // Export library for CommonJS/Node.
  module.exports = library;
}
else if (global.define)
{
  // Define library for global AMD loader that is already present.
  (function (define) {define(function () { return library; });}(global.define));
}
else
{
  // Define library on global namespace for inline script loading.
  global['visual'] = library;
}

}(this));
