export declare interface ArticleMeta {
  title: string | undefined | null;
  tags: string[] | undefined | null;
  date: string | undefined | null;
  categories: string | undefined | null;
  path: string | undefined | null;
}

export interface PageMeta {
  pages: Array<{
    name: string;
    img: any;
    key: string;
  }>;

  link: Array<{
    name: string;
    img: any;
    key: string;
  }>;
}
