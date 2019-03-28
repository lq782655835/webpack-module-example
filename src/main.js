let Add = require('./add').default
console.log(Add, Add(1, 2), 123)

// 按需加载
// 方式1: webpack内置懒加载api：require.ensure
// require.ensure([], function(require){
//     var asyncModule = require('./async')
//     console.log(asyncModule.default)
// })

// 方式2: webpack4新的import语法
// 需要加@babel/plugin-syntax-dynamic-import插件
let asyncModuleWarp = async () => await import('./async')
console.log(asyncModuleWarp().default, 234)