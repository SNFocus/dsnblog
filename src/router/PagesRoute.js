const routes = require.context('@/views', true, /\.vue$/)

export default routes.keys().map(key => {
    // routes(key).default || routes(key)
    let name = key.match(/(?<=\.\/).*(?=\.vue)/)[0].toLowerCase()
    return {
        path: "/" + name,
        name: name.replace(/\//,'_'),
        component: routes(key).default || routes(key)
    }
})