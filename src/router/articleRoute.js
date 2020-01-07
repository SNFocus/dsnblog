const routes = require.context("@/post", true, /\.md$/)
export default routes.keys().map(key => {
    console.log(key)
    let name = key.replace("./",'').replace('.md','')
    // .match(/(?<=\/)[\w|-]*(?=\.md)/)[0].toLowerCase()
    return {
        path: "/article/" + name,
        name: name.replace('/','_'),
        // component: () => {
        //     console.log(key,routes(key).default || routes(key))
        //     return routes(key).default || routes(key)
        // }
        component: () => import('@/post' + key.substring(1))

    }
})