import React, { useState } from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'

const LightboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`

const PreviewButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
`

const Lightbox = ({ images: carImages }) => {
  const [showLightbox, setShowLightbox] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <>
      <LightboxContainer>
        {carImages.map((image) => (
          <PreviewButton
            key={image.fluid.src}
            type="button"
            onClick={() => {
              setShowLightbox(true)
              setSelectedImage(image)
            }}
          >
            <Img fluid={image.fluid} />
            {image.title && <h4>{image.title}</h4>}
            {image.description && <p>{image.description}</p>}
          </PreviewButton>
        ))}
      </LightboxContainer>

      {showLightbox && (
        <Dialog>
          <Img fluid={selectedImage.fluid} />
          {selectedImage.title && <h4>{selectedImage.title}</h4>}
          {selectedImage.description && <p>{selectedImage.description}</p>}

          <button type="button" onClick={() => setShowLightbox(false)}>
            Close
          </button>
        </Dialog>
      )}
    </>
  )
}

export default Lightbox

// https://www.gatsbyjs.org/blog/2018-11-03-building-an-accessible-lightbox/#connecting-the-image-click-to-the-lightbox
