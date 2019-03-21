// modules是存放所有模块的数组，数组中每个元素存储{ 模块路径: 模块导出代码函数 }
(function(modules) {
	// 模块缓存作用，已加载的模块可以不用再重新读取，提升性能
  var installedModules = {};

  // 关键函数，加载模块代码
  // 形式有点像Node的CommonJS模块，但这里是可跑在浏览器上的es5代码
	function __webpack_require__(moduleId) {
		// 缓存检查，有则直接从缓存中取得
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// 先创建一个空模块，塞入缓存中
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false, // 标记是否已经加载
			exports: {} // 初始模块为空
		};

    // 把要加载的模块内容，挂载到module.exports上
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true; // 标记为已加载

    // 返回加载的模块，调用方直接调用即可
		return module.exports;
	}
	
	// __webpack_require__对象下的r函数：在module.exports上定义__esModule为true，表明是一个模块对象
	__webpack_require__.r = function(exports) {
		Object.defineProperty(exports, '__esModule', { value: true });
  };
  
	// 启动入口模块main.js
	return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
({
  // add模块
  "./src/add.js": (function(module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__); // 在module.exports上定义__esModule为true
    // 直接把add模块内容，赋给module.exports.default对象上
    __webpack_exports__["default"] = (function(a, b) {
      let { name } = { name: 'hello world,'}
      return name + a + b
    });
  }),

  // 入口模块
  "./src/main.js": (function(module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__)
    // 拿到add模块的定义：_add__WEBPACK_IMPORTED_MODULE_0__ = module.exports
    var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/add.js");
    // add模块内容：_add__WEBPACK_IMPORTED_MODULE_0__["default"]
    console.log(_add__WEBPACK_IMPORTED_MODULE_0__["default"], Object(_add__WEBPACK_IMPORTED_MODULE_0__["default"])(1, 2))
  })
});