import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Slider from 'react-slick'

import styles from '../components/hero.module.css'

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 6000,
  autoplaySpeed: 6000,
  cssEase: 'linear',
}

const BlogPostTemplate = ({ location, data }) => {
  const post = data.contentfulBlogPost
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location}>
      <div style={{ background: '#fff' }}>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <div className={styles.hero}>
          <Img
            className={styles.heroImage}
            alt={post.title}
            fluid={post.heroImage.fluid}
          />
        </div>
        <div className="wrapper">
          <h1 className="section-headline">{post.title}</h1>
          <p
            style={{
              display: 'block',
            }}
          >
            {post.publishDate}
          </p>

          <div className="wrapper">
            <ul className="article-list">
              {post.images &&
                post.images.map((item, index) => {
                  return (
                    <li key={index}>
                      <Img fixed={item.fixed} />
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </li>
                  )
                })}
            </ul>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />

          {/* <section className={styles.template}>
            <div className={styles.center}>
              <div className={styles.images}>
                {post.images.map((item, index) => {
                  return (
                    
                    <Img
                      key={index}
                      fluid={item.fluid}
                      className={styles.image}
                    />
                  )
                })}
              </div>
            </div>
          </section> */}
        </div>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      images {
        title
        description
        fixed(width: 250, height: 200) {
          ...GatsbyContentfulFixed_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
