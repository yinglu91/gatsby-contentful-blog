const path = require('path')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const response = await graphql(
    `
      {
        allContentfulBlogPost {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `
  )

  if (response.errors) {
    console.log(response.errors)
    return
  }

  const blogPost = path.resolve('./src/templates/blog-post.js')
  const posts = response.data.allContentfulBlogPost.edges
  posts.forEach((post, index) => {
    createPage({
      path: `/blog/${post.node.slug}/`,
      component: blogPost,
      context: {
        slug: post.node.slug,
      },
    })
  })
}
