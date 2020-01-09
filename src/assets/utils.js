import articleList from '@/config/articleMeta'

export const articleFuncs = {
    /**
     * 获取所有文章信息
     */
    getAll() {
        return articleList
    },
    getArticlesByPath(path) {
        return articleList.filter(article => article.path.includes(`/${path}/`))
    },
    /**
     * 获取前端文章信息
     */
    getFont() {
        return articleList.filter(article => article.path.includes("/font/"))
    },
    /**
     * 获取后端文章信息
     */
    getServe() {
        return articleList.filter(article => article.path.includes("/serve/"))
    },
    /**
     * 获取工具相关文章信息
     */
    getTool() {
        return articleList.filter(article => article.path.includes("/tool/"))
    },
    /**
     * 获取所有文章标签信息
     */
    getTags() {
        let tags = new Set();
        articleList.forEach(article => {
            article.tags.forEach(a => tags.add(a))
        })
        return Array.from(tags)
    },
    /**
     * 根据标签获取相关文章信息
     */
    getArticlesByTag(tag) {
        return articleList.filter(article => article.tags.includes(tag))
    }
}