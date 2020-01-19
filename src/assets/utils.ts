import articleList from "@/config/articleMeta.ts";
import { ArticleMeta } from "../types/meta";

export class ArticleFuncs {
  /**
   * 获取所有文章信息
   */
  getAll(): Array<ArticleMeta> {
    return articleList;
  }

  getArticlesByPath(path: string): Array<ArticleMeta> {
    return articleList.filter(article => article.path.includes(`/${path}/`));
  }

  /**
   * 获取前端文章信息
   */
  getFont(): Array<ArticleMeta> {
    return articleList.filter(article => article.path.includes("/font/"));
  }

  /**
   * 获取后端文章信息
   */
  getServe(): Array<ArticleMeta> {
    return articleList.filter(article => article.path.includes("/serve/"));
  }

  /**
   * 获取工具相关文章信息
   */
  getTool(): Array<ArticleMeta> {
    return articleList.filter(article => article.path.includes("/tool/"));
  }

  /**
   * 获取所有文章标签信息
   */
  getTags(): string[] {
    let tags: Set<string> = new Set();
    articleList.forEach(article => {
      article.tags.forEach(a => tags.add(a));
    });
    return <string[]>Array.from(tags);
  }

  /**
   * 根据标签获取相关文章信息
   */
  getArticlesByTag(tag: string): Array<ArticleMeta> {
    return articleList.filter(article => article.tags.includes(tag));
  }
}
