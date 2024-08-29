import './CopyLink.css'
import { useState } from 'react'

interface CopyLinkProps {
    shortenedLink: string;
    originalLink: string;
}

const CopyLink: React.FC<CopyLinkProps>= ({shortenedLink, originalLink}) => {
    const [copyMessage, setCopyMessage] = useState<string>('')

    const handleCopy = () => {
        navigator.clipboard.writeText(shortenedLink)
        setCopyMessage(`${shortenedLink} copied to clipboard!`)
        setTimeout(() => {
            setCopyMessage('');
        }, 3000);
    }

    return (
        <div className='copy-link-body'>
            <div className='shortened-link-container'>
                <p className='copy-message-body'>
                    {copyMessage}
                </p> 
                <div className='submission-container'>
                    <input 
                        type="text" 
                        value={shortenedLink}
                        className="copy-link-input"
                        placeholder="Shorten Link Above"
                    />
                    <button className='copy-button'
                        onClick={handleCopy}
                    >Copy</button>
                </div>

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