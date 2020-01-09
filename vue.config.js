// vue.config.js
module.exports = {
    configureWebpack: {
        module: {
            rules: [{
                test: /\.md$/,
                use: ['vue-loader', {
                    loader: 'vue-markdown-loader/lib/markdown-compiler',
                    options: {
                        raw: true
                    }
                }, {
                    loader:'markdown-meta-loader',
                    options:{
                        dest:'src/config/articleMeta.js',
                        wrapperRegexp:/(?<=---\s+)[\s\S]*?(?=---+)/g,
                        metasRegexps:{
                            title: /(?<=title:\s*).*/g,
                            tags: function(data){
                                /(?<=tags:\s*).*/g
                            },
                            date: /(?<=date:\s*).*/g,
                            categories: /(?<=categories:\s*).*/g
                        },
                        append:function(loaderCtx,data){

                        }
                    }
                }]
            }]
        },
        resolveLoader: {
            modules: ['node_modules', 'loader']
        }
    }
}