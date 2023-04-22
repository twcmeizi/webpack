const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const toml=require('toml')
const yaml=require('yaml')
const json5=require('json5')

console.log(__dirname)
module.exports={
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./dist'),
        clean:true,
        assetModuleFilename:'image/[contenthash][ext]'
    },
    mode:'development',
    devtool:'inline-source-map',
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'app.html',
            inject:'body'
        }),
        new MiniCssExtractPlugin({
            filename:'css/[contenthash].css'
        })
    ],
    devServer:{
        static:'./dist'
    },
    module:{
        rules:[
            {
                test:/\.jpg$/i,
                type:'asset/resource',
                generator:{
                    filename:'image/[contenthash][ext]' //优先级比output高
                }
            },
            {
                test:/\.jpeg$/i,
                type:'asset/inline',
                // generator:{
                //     filename:'image/[contenthash][ext]' //优先级比output高
                // }
            },
            {
                test:/\.txt$/i,
                type:'asset/source',
                // generator:{
                //     filename:'image/[contenthash][ext]' //优先级比output高
                // }
            },
            // {
            //     test:/\.jpg$/i,
            //     type:'asset',
            //     parser:{
            //         dataUrlCondition:{
            //             maxSize:4*1024*1024
            //         }
            //     }
            //     // generator:{
            //     //     filename:'image/[contenthash][ext]' //优先级比output高
            //     // }
            // },
            {
                test:/\.(css|less)$/i,
                use:[MiniCssExtractPlugin.loader,'css-loader','less-loader']
                // use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'      
            },
            {
                test:/\.(csv|tsv)$/,
                use:'csv-loader'
            },
            {
                test:/\.xml$/,
                use:'xml-loader'
            },
            {
                test:/\.toml$/,
                type:'json',
                parser:{
                    parse:toml.parse
                }
            },
            {
                test:/\.yaml$/,
                type:'json',
                parser:{
                    parse:yaml.parse
                }
            },
            {
                test:/\.json5$/,
                type:'json',
                parser:{
                    parse:json5.parse
                }
            }
        ]
    },
    optimization:{
        minimizer:[
            new CssMinimizerPlugin()
        ]
    }
}