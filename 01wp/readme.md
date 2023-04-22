1.什么是插件
2.使用html-webpack-plugin
3.清理dist


4.在开发过程中，并不能直观的看到错误所在的地方，可以通过
devtool:inline-source-map
实现精准确定代码行数
5.在开发过程中，每次都需要通过npx webpack的命令行进行更新，很麻烦
1）使用watch mode的模式
npx webpack --watch
缺点：需要手动刷新
2）使用webpack-dev-server,具有实时加载页面的功能
安装：npm i webpack-dev-server -D
devServer:{
    static:'./dist'
}
启动项目：npx webpack-dev-server 
原理：真正没有输出任何物理文件，把打包之后的bundle文件放到了内存了，把dist文件夹删除了，也不影响

6.使用内置资源模块加载资源
1.asset/resource
发送一个单独的文件，并导出url
module={
    rules:[
        {
            test:/\.jpg$/i,
            type:'asset/resource'   
            问题是：什么时候用type,什么时候用use
        }
    ]
}
可以通过：npx webpack --open，自动打开浏览器
生成的文件可以自定义位置，两种方式
1.在output中配置：
    assetModuleFilename:'image/[contenthash][ext]'
2）在rules中配置generator:{
    filename:'image/[contenthash][ext]'  //优先级比output 高
}
2.asset/inline
生成base64的形式

3.asset/source
用于导出资源的源代码

4.asset

通用资源类型，在dataurl和发送一个单独的文件(默认大于8K)之间自动选择

  {
                test:/\.jpg$/i,
                type:'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize:4*1024*1024
                    }
                }
            }

7.通过loader来加载css
1)css-loader,style-loader,less-loader,less
解析.css文件，通过css-loader解析，通过style-loader进行挂载
解析.less文件，需要less-loader插件，该插件依赖于less 
module:{
    rules:['style-loader','css-loader','less-loader']
}

8.分离css 
安装插件：npm i mini-css-extract-plugin -D
引用：const MiniCssExtractPlugin=require('mini-css-extract-plugin')
在plugins中添加：（自定义文件位置跟文件名称）
  new MiniCssExtractPlugin({
            filename:'css/[contenthash].css' 
    })

9.压缩css,生产环境
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
安装：npm i css-minimizer-webpack-plugin -D

引用：const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
使用：
  optimization:{
        minimizer:[
            new CssMinimizerPlugin()
        ]
    }
注意：需要将mode修改为production


10.如何在css 中加载图片资源