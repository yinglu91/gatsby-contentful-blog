import React, { useState } from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'

const LightboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 5px;

  @media (min-width: 568px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
  @media (min-width: 991px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
`

const ImageContainer = styled.div`
  background-color: lightgray;
  width: 300px;
  height: 280px;
`

const PreviewButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0 0 20px;
`

const Lightbox = ({ images }) => {
  const [showLightbox, setShowLightbox] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <>
      <LightboxContainer>
        {images.map((image) => (
          <PreviewButton
            key={image.fluid.src}
            type="button"
            onClick={() => {
              setShowLightbox(true)
              setSelectedImage(image)
            }}
          >
            <ImageContainer>
              <Img fluid={image.fluid} style={{ width: 300, height: 200 }} />
              {image.title && <h4>{image.title}</h4>}
              {image.description && <p>{image.description}</p>}
            </ImageContainer>
          </PreviewButton>
        ))}
      </LightboxContainer>

      {showLightbox && (
        <Dialog>
          <Img fluid={selectedImage.fluid} />
          {selectedImage.title && <h4>{selectedImage.title}</h4>}
          {selectedImage.description && <p>{selectedImage.description}</p>}

          <button type="button" onClick={() => setShowLightbox(false)}>
            x
          </button>
        </Dialog>
      )}
    </>
  )
}

export default Lightbox

// https://www.gatsbyjs.org/blog/2018-11-03-building-an-accessible-lightbox/#connecting-the-image-click-to-the-lightbox
