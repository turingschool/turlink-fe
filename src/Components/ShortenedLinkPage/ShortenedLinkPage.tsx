import './ShortenedLinkPage.css'
import { useState, useEffect } from 'react'

const ShortenedLinkPage: React.FC = () => {
    const [shortLink, setShortLink] = useState('')
    const [originalLink, setOriginalLink] = useState('')

    const handleCopy = () => {
        navigator.clipboard.writeText(shortLink)
    }

    return (
        <div className='shortened-link-wrapper'>
            <div className='shortened-link-container'>
                <input 
                    type="text" 
                    value={shortLink}
                    className="shortened-link-input"
                    onChange={(e) => setShortLink(e.target.value)}
                />
                <button className='copy-button'
                    onClick={handleCopy}
                >Copy</button> 
            </div>
            <div className='original-link-container'>
                <h3 className='original-link-header'>Original URL:</h3>
                <p className='original-link-body'>
                    {originalLink}
                </p>
            </div>
        </div>
    )
}

export default ShortenedLinkPage