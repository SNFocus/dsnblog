// vue.config.js
module.exports = {
    configureWebpack: {
        module: {
            rules: [{
                test: /\.md$/,
                use: [
                    'vue-loader',
                    {
                        loader: 'vue-markdown-loader/lib/markdown-compiler',
                        options: {
                            raw: true
                        }
                    },
                    {
                        loader: 'extract-meta-loader',
                        options: {
                            dest: 'src/config/articleMeta.js',
                            wrapper: '---',
                            deleteMetaInfo: true,
                            metasRegexps: {
                                title: 'title:',
                                tags: function(data, getRegexpRes) {
                                    let tagText = getRegexpRes(data, /(?<=tags:\s*).*/g)
                                    return getRegexpRes(tagText, /(?<=\[\s?).*(?=\])/).split(/,\s+/)
                                },
                                date: 'date:',
                                categories: 'categories:',
                                test: 'test:'
                            },
                            append: function(loaderCtx, data, getRegexpRes) {
                                let path = '/article' + getRegexpRes(loaderCtx.resourcePath, /(?<=\\post)\\.*?(?=.md)/).replace(/\\/g, '/')
                                return { path }
                            }
                        }
                    }
                ]
            }]
        },
        // resolveLoader: {
        //     modules: ['node_modules', 'loader']
        // }
    }
}