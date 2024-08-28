import './ShortenedLinkPage.css'
import { useState } from 'react'
import CopyLink from '../CopyLink/CopyLink'
import InputField from '../InputField/InputField'
import { getShortLink } from '../apiCalls/apiCalls'
import { useNavigate } from 'react-router-dom'


const ShortenedLinkPage: React.FC = () => {
    const [id, setId] = useState(1)
    
    const navigate = useNavigate();

    const submitOriginalLink = (linkInput: string) => {
        getShortLink(id, linkInput, navigate)
        .then((data) => {
            console.log('RESPONSE DATA', data.data); 
        })
    }

    return (
        <div className='shortened-link-wrapper'>
            <InputField submitOriginalLink={submitOriginalLink}/>
            <CopyLink />
        </div>
    )
}

export default ShortenedLinkPage