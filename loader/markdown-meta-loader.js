let fs = require('fs'),
    metaList = [],
    mdFileRegexps = {
        meta: /(?<=---\s+)[\s\S]*?(?=---+)/g,
        title: /(?<=title:\s*).*/g,
        tags: /(?<=tags:\s*).*/g,
        date: /(?<=date:\s*).*/g,
        categories: /(?<=categories:\s*).*/g
    }

const getRegexpRes = (text, exp) => {
    let res = text.match(exp)
    return res && res.length > 0 ? res[0] : ''
}

const getFileMetas = (text) => {
    let metaText = getRegexpRes(text, mdFileRegexps.meta)
    if (!metaText) { return null }
    let res = Object.keys(mdFileRegexps).reduce((obj, key) => {
        if (key !== 'meta') {
            obj[key] = getRegexpRes(metaText, mdFileRegexps[key])
        }
        return obj
    }, {})
    res.tags = getTags(res.tags || "")
    return res
}

const writeFile = (content) => {
    fs.writeFile('src/config/articleMeta.js', content, (err) => {
        if (err) { console.error(err) }
    })
}

const getTags = tagText => getRegexpRes(tagText, /(?<=\[\s?).*(?=\])/).split(/,\s+/)

module.exports = function(content) {
    let metaInfo = getFileMetas(content)
    metaInfo.path = '/article' + getRegexpRes(this.resourcePath, /(?<=\\post)\\.*?(?=.md)/).replace(/\\/g, '/')
    let listItem = metaList.find(item => item.path === metaInfo.path)
    listItem ? Object.assign(listItem, metaInfo) : metaList.push(metaInfo)
    writeFile(`export default ${JSON.stringify(metaList, null, 2)}`)
    return content.replace(/---[\s\S]*?---/, "");
};