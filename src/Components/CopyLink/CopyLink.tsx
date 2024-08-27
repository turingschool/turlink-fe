import './CopyLink.css'
import { useState } from 'react'

const CopyLink: React.FC = () => {
    const [shortLink, setShortLink] = useState('')
    const [originalLink, setOriginalLink] = useState('')
    const [copyMessage, setCopyMessage] = useState('')

    const handleCopy = () => {
        navigator.clipboard.writeText(shortLink)
        setCopyMessage(`${shortLink} copied to clipboard!`)
        setTimeout(() => {
            setCopyMessage('');
        }, 3000);
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
                    TEST ORIGINAL LINK {originalLink}
                </p>
                <p className='copy-message-body'>
                    {copyMessage}
                </p>
            </div>
        </div>
    )
}
export default CopyLink