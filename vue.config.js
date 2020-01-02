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
                }, 'markdown-meta-loader']
            }]
        },
        resolveLoader: {
            modules: ['node_modules', 'loader']
        }
    }
}