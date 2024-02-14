import { Post } from "@/interfaces/post";

// Assuming Hashnode's GraphQL endpoint and your blog's identifier
const HASHNODE_API_URL = process.env.HASHNODE_API_URL || "https://gql.hashnode.com"
// const YOUR_BLOG_ID = 'your_blog_id_here'; // Use if needed to scope queries to your blog

async function fetchGraphQL(query: string, variables?: Record<string, any>) {
  const response = await fetch(HASHNODE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  // @ts-ignore
    const { data, errors } = await response.json();
  if (errors) {
    console.error(errors);
    throw new Error('Failed to fetch API');
  }
  return data;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const query = `
    query GetPostBySlug($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
              id
              slug
              title
              subtitle
              brief
              author {
                name
                username
                profilePicture
              }
              content {
                html
              }
              url
              tags {
                slug
              }
              seo {
                title
                description
              }
              coverImage {
                url
              }

        }
      }
    }
  `;

  const variables = { host: process.env.HASHNODE_BLOG_URL, slug: slug };
  const data = await fetchGraphQL(query, variables);
  return data.publication.post;
}

export async function getAllPosts(): Promise<Post[]> {
  const query = `
    query GetAllPosts($host: String!) {
      publication(host: $host) {
        isTeam
        title
        posts(first: 20) {
          edges {
            node {
              id
              slug
              title
              subtitle
              brief
              url
              author {
                name
                username
                profilePicture
              }
              tags {
                slug
              }
              seo {
                title
                description
              }
              coverImage {
                url
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;

  const variables = { host: process.env.HASHNODE_BLOG_URL };
  const data = await fetchGraphQL(query, variables);
  return data.publication.posts.edges.map(edge => edge.node);
}
