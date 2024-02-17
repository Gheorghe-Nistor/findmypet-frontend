import React from 'react'
import { Carousel } from 'react-responsive-carousel'

const ImageCarousel = ({ images, className }) => (
    <div className={className}>
        <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            interval={3000}>
            {images.map((imageSrc, index) => (
                <div key={index}>
                    <img src={imageSrc} alt={`Image ${index + 1}`} />
                </div>
            ))}
        </Carousel>
    </div>
)

export default ImageCarousel
