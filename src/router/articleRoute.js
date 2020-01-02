const routes = require.context("@/post", true, /\.md$/)
export default routes.keys().map(key => {
    let name = key.match(/(?<=\/)[\w|-]*(?=\.md)/)[0].toLowerCase()
    return {
        path: "/" + name,
        name: name,
        // component: () => {
        //     console.log(key,routes(key).default || routes(key))
        //     return routes(key).default || routes(key)
        // }
        component: () => {
            return import('@/post' + key.substring(1))
        }

    }
})