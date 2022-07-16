# 概念

本质上，**webpack** 是一个用于现代 JavaScript 应用程序的 *静态模块打包工具*。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/)，然后将你项目中所需的每一个模块组合成一个或多个 *bundles*，它们均为静态资源，用于展示你的内容。

依赖图：

![依赖图](https://pic3.zhimg.com/v2-a30f8fb3c156b527aadb2f740e633fad_1440w.jpg?source=172ae18b)



在开始前你需要先理解一些**核心概念**：

 

- [入口(entry)](https://webpack.docschina.org/concepts/#entry)

  - 从那个文件开始打包

  - 默认值是 `./src/index.js`

  - 但你可以通过在 [webpack configuration](https://webpack.docschina.org/configuration) 中配置 `entry` 属性，来指定一个（或多个）不同的入口起点。

  - ```
    module.exports = {
      entry: './path/to/my/entry/file.js',
    };
    ```

- [输出(output)](https://webpack.docschina.org/concepts/#output)

  - 捆绑包的结尾

  - 主要输出文件的默认值是 `./dist/main.js`

  - 你可以通过在配置中指定一个 `output` 字段，来配置这些处理过程：

  - ```
    const path = require('path');
    
    module.exports = {
      entry: './path/to/my/entry/file.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js',
      },
    };
    ```

- [loader](https://webpack.docschina.org/concepts/#loaders)

  - webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。**loader** 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 [模块](https://webpack.docschina.org/concepts/modules)，以供应用程序使用，以及被添加到依赖图中。

  - 在更高层面，在 webpack 的配置中，**loader** 有两个属性：

    - `test` 属性，识别出哪些文件会被转换。

    - `use` 属性，定义出在进行转换时，应该使用哪个 loader。

    - ```
      const path = require('path');
      
      module.exports = {
        output: {
          filename: 'my-first-webpack.bundle.js',
        },
        module: {
          rules: [{ test: /\.txt$/, use: 'raw-loader' }],
        },
      };
      
      以上配置中，对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use。这告诉 webpack 编译器(compiler) 如下信息：
      
      “嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先 use(使用) raw-loader 转换一下。”
      ```

- [插件(plugin)](https://webpack.docschina.org/concepts/#plugins)

  - oader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

  - 想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建一个插件实例。

  - ```
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack'); // 用于访问内置插件
    
    module.exports = {
      module: {
        rules: [{ test: /\.txt$/, use: 'raw-loader' }],
      },
      plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    };
    
    在上面的示例中，html-webpack-plugin 为应用程序生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件中。
    ```

    

- [模式(mode)](https://webpack.docschina.org/concepts/#mode)

  - 通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 `production`。

  - ```
    module.exports = {
      mode: 'production',
    };
    ```

- [浏览器兼容性(browser compatibility)](https://webpack.docschina.org/concepts/#browser-compatibility)

  - Webpack 支持所有符合 [ES5 标准](https://kangax.github.io/compat-table/es5/) 的浏览器（不支持 IE8 及以下版本）。webpack 的 `import()` 和 `require.ensure()` 需要 `Promise`。

- [环境(environment)](https://webpack.docschina.org/concepts/#environment)

  - Webpack 5 运行于 Node.js v10.13.0+ 的版本。



# 起步

## 基本安装

命令行：

```
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

