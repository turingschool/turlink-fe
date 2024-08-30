import './CopyLink.css'
import { useState } from 'react'

type CopyLinkProps = {
    shortenedLink: string;
    originalLink: string;
}

const CopyLink: React.FC<CopyLinkProps>= ({shortenedLink, originalLink}) => {
    const [copyMessage, setCopyMessage] = useState('')

    const handleCopy = () => {
        navigator.clipboard.writeText(shortenedLink)
        setCopyMessage(`${shortenedLink} copied to clipboard!`)
        setTimeout(() => {
            setCopyMessage('');
        }, 3000);
    }

    return (
        <div className='shortened-link-wrapper'>
            <div className='shortened-link-container'>
                <input 
                    type="text" 
                    defaultValue={shortenedLink}
                    className="shortened-link-input"
                    placeholder="Shorten Link Above"
                    readOnly
                />
                <button className='copy-button'
                    onClick={handleCopy}
                >Copy</button>
                <p className='copy-message-body'>
                    {copyMessage}
                </p> 
            </div>
            <div className='original-link-container'>
                <h2 className='original-link-label'>Original URL:</h2>
                <p className='original-link-body'>
                    {originalLink}
                </p>
            </div>
        </div>
    )
}
export default CopyLink