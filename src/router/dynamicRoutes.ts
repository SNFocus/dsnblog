import { RouteItem } from "@/types/dynamicRoutes";

const routes1 = require.context("@/post", true, /\.md$/);
export let articleRoutes: RouteItem[] = routes1.keys().map(key => {
  let name = key.replace("./", "").replace(".md", "");
  // .match(/(?<=\/)[\w|-]*(?=\.md)/)[0].toLowerCase()
  return {
    path: "/article/" + name,
    name: name.replace("/", "_"),
    // component: () => {
    //     console.log(key,routes(key).default || routes(key))
    //     return routes(key).default || routes(key)
    // }
    component: () => import("@/post" + key.substring(1))
  };
});

const routes2 = require.context("@/demoCmp", true, /\.vue$/);
const routes3 = require.context("@/views", true, /\.vue$/);

export let pageRoutes: RouteItem[] = routes3.keys().map(key => {
  // routes(key).default || routes(key)
  let name = key.replace("./", "").replace(".vue", "");
  // .match(/(?<=\.\/).*(?=\.vue)/)[0].toLowerCase()

  if (name === "demo") {
    let demoChildren = routes2.keys().map(key => {
      let name = key
        .replace("./", "")
        .replace(".vue", "")
        .replace(/\/index$/, "");
      // .match(/(?<=\/)[\w|-]*(?=\.md)/)[0].toLowerCase()
      return {
        path: name,
        component: () => import("@/demoCmp" + key.substring(1))
      };
    });
    return {
      path: "/" + name,
      name: name.replace(/\//, "_"),
      component: () => import("@/views" + key.substring(1)),
      children: [
        ...demoChildren,
        { path: "", component: demoChildren[0].component }
      ]
    };
  }

  return {
    path: "/" + name,
    name: name.replace(/\//, "_"),
    component: routes3(key).default || routes3(key)
  };
});
