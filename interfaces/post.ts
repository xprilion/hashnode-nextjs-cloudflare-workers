import { type Author } from "./author";

export type Post = {
    id: string;
    slug: string;
    brief: string;
    title: string;
    subtitle: string;
    url: string;
    publishedAt: string;
    author: Author;
    coverImage?: {
      url: string;
    };
    content?: {
      html: string;
      },
  seo: {
      title: string;
      description: string;
    }
};
