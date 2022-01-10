import { fetchAPI } from "./api"

export const getAllPosts = async () => {
    const data = await fetchAPI(`
    query AllPosts {
        posts(first: 20) {
          edges {
            node {
              id
              date
              title
              slug
              categories {
                edges {
                  node {
                    name
                  }
                }
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    `)
    console.log(data.posts.edges)
    return data?.posts
}

export const getAllPostsWithSlug = async () => {
    const data = await fetchAPI(`
        {
            posts(first: 10000) {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `)
    return data?.posts
}

export const getPost = async (slug) => {
    const data = await fetchAPI(`
        fragment PostFields on Post {
            title
            excerpt
            slug
            date
            featuredImage {
                node {
                    sourceUrl
                }
            }
        }
        query PostBySlug($id: ID!, $idType: PostIdType!) {
            post(id: $id, idType: $idType) {
                ...PostFields
                content
            }
        }`,
        {
            variables: {
                id: slug,
                idType: 'SLUG'
            }
        }
    )

    return data
}