import './ShortenedLinkPage.css'
import { useState } from 'react'

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
                <label className='original-link-label'>Original URL:</label>
                <p className='original-link-body'>
                    {originalLink}
                </p>
            </div>
        </div>
    )
}

export default ShortenedLinkPage