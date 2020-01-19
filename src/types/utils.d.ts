export declare interface articleFuncs {
  /**
   * 获取所有文章信息
   */
  getAll: () => Array<any>;

  getArticlesByPath: (path: string) => Array<any>;

  /**
   * 获取前端文章信息
   */
  getFont: () => Array<any>;

  /**
   * 获取后端文章信息
   */
  getServe: () => Array<any>;

  /**
   * 获取工具相关文章信息
   */
  getTool: () => Array<any>;

  /**
   * 获取所有文章标签信息
   */
  getTags: () => Array<any>;

  /**
   * 根据标签获取相关文章信息
   */
  getArticlesByTag: (tag: string) => Array<any>;
}
