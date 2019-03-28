(function(modules) { // webpackBootstrap
  // 获取到异步chunk代码后的回调函数
  // 连接两个文件的关键函数
	function webpackJsonpCallback(data) {
    // data[0]存放了异步模块对应的chunkId
    // data[1]存放了异步模块代码
		var chunkIds = data[0];
		var moreModules = data[1];

    // 把异步模块对应的chunkId，都标记为已加载成功
		var moduleId, chunkId, i = 0, resolves = [];
		for(;i < chunkIds.length; i++) {
			chunkId = chunkIds[i];
			if(installedChunks[chunkId]) {
				resolves.push(installedChunks[chunkId][0]);
			}
			installedChunks[chunkId] = 0;
    }
    // 把异步模块代码都存放到modules中
		for(moduleId in moreModules) {
			modules[moduleId] = moreModules[moduleId];
    }

    // 万事具备，代码都已经加载到modules中
    // 执行resolve() = installedChunks[chunkId][0]()使得可以去promise.then(...)
    // 接下来的then中，可以像同步一样加载异步代码了__webpack_require__('./src/async.js')
		while(resolves.length) {
			resolves.shift()();
		}
  };

	// 模块缓存
	var installedModules = {};
	// object to store loaded and loading chunks
	// undefined = chunk not loaded, null = chunk preloaded/prefetched
	// Promise = chunk loading, 0 = chunk loaded
	var installedChunks = {
		"main": 0
  };
  
	// __webpack_require__依然是同步读取模块代码作用
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// Flag the module as loaded
		module.l = true;
		// Return the exports of the module
		return module.exports;
	}

  // 异步加载被分出去的文件chunk
  // 代码精简保留核心，边界问题如：网络正在加载、内存泄漏等代码省略了
	__webpack_require__.e = function requireEnsure(chunkId) {
    // 创建promise
    // 把resolve保存到installedChunks[chunkId]中
    // 重点：等待异步代码加载完成，执行installedChunks[chunkId][0]()即可执行promise.then(...)
    var promise = new Promise(function(resolve, reject) {
      installedChunks[chunkId] = [resolve, reject];
    });

    // 通过往head头部插入script标签异步加载到chunk代码
    var script = document.createElement('script');
    script.charset = 'utf-8';
    script.timeout = 120;
    script.src = __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".bundle.js"
    var onScriptComplete = function (event) {
      var chunk = installedChunks[chunkId];
    };
    script.onerror = script.onload = onScriptComplete;
    document.head.appendChild(script);

		return promise;
	};

	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  // 关键代码： window["webpackJsonp"].push = webpackJsonpCallback
	jsonpArray.push = webpackJsonpCallback;

	// 入口文件
	return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
/************************************************************************/
({
"./src/add.js": (function(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);
  __webpack_exports__["default"] = (function (a, b) {
    var _name = {    name: 'hello world,'  }, name = _name.name;
    return name + a + b;
  })
}),

"./src/main.js": (function(module, exports, __webpack_require__) {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this, args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  // 同步方式
  var Add = __webpack_require__("./src/add.js").default;
  console.log(Add, Add(1, 2), 123);

  // 异步方式
  var asyncModuleWarp =function () {
    var _ref = _asyncToGenerator( regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
                  case 0:
                  _context.next = 2;
                  return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, "./src/async.js")); 
                  case 2:
                  return _context.abrupt("return", _context.sent);
                  case 3:
                  case "end":
                  return _context.stop();
                  }
                }
      }, _callee);
    }));

    return function asyncModuleWarp() {
      return _ref.apply(this, arguments);
    };
  }();
  console.log(asyncModuleWarp().default, 234)
})
});