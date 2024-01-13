import React from 'react'
import image1 from '../../../images/0nline-trends-2022.png'
import './footer.scss'
function Footer() {
    return (
        <div className="footer">
            <div className='leftfooter'>
                <h4>download </h4>
                <p>sdggsds</p>
                <img src={image1} alt="" />
                <img src={image1} alt="" />
            </div>
            <div className='midfooter'>
                <h1>h1</h1>
                <p>paragrap</p>
                <p>paragrap</p>
            </div>
            <div className='rightfooter'>
                <h4>h2</h4>
                <a href="tailwindcss.com">link</a>
                <a href="tailwindcss.com">link</a>
                <a href="tailwindcss.com">link</a>
            </div>
        </div>
    )
}

export default Footer