var path = require('path');
module.exports = {
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname, './dist'),
        filename:"bundle.js"
    },
    devServer:{
        inline:true,
        contentBase:'./dist',
        port:300
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['es2015','react','stage-1'],
                    plugins:[["antd", {style:"css"}]]
                }
            },{
                test:/\.css$/,
                loader:'style-loader!css-loader'
            }
        ]
    }
};