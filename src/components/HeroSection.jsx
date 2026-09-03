import React from 'react'
import banner from '../images/hero-banner.jpeg'

const HeroSection = React.memo(() => {
    return (
        <div className="container" id='home'>
            <section className="hero-section">
                <img src={banner} alt="Hero Banner" />
            </section>
        </div>
    )
})

export default HeroSection