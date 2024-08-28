import './CopyLink.css'
import { useState } from 'react'

type CopyLinkProps = {
    shortenedLink: string;
    originalLink: string;
}

const CopyLink: React.FC<CopyLinkProps>= ({shortenedLink, originalLink}) => {
    const [shortLink, setShortLink] = useState('')
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
                    placeholder="Shorten Link Above"
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
                <p className='copy-message-body'>
                    {shortenedLink}
                </p>
            </div>
        </div>
    )
}
export default CopyLink