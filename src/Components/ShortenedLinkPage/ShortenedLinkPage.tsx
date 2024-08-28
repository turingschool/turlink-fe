import './ShortenedLinkPage.css'
import { useState } from 'react'
import CopyLink from '../CopyLink/CopyLink'
import InputField from '../InputField/InputField'
import { getShortLink } from '../apiCalls/apiCalls'
import { useNavigate } from 'react-router-dom'


const ShortenedLinkPage: React.FC = () => {
    const [id, setId] = useState<number>(1)
    const [originalLink, setOriginalLink] = useState<string>('')
    const [shortenedLink, setShortenedLink] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])
    const [userId, setUserId] = useState<string>('')
    const navigate = useNavigate();

    const submitOriginalLink = (linkInput: string) => {
        getShortLink(id, linkInput, navigate)
        .then((data) => {
            const attributes = data.data.attributes;
            setOriginalLink(attributes.original)
            setShortenedLink(attributes.short)
            setTags(attributes.tags)
            setUserId(attributes.user_id)
        })
    }

    return (
        <div className='shortened-link-wrapper'>
            <InputField submitOriginalLink={submitOriginalLink}/>
            <CopyLink shortenedLink={shortenedLink} originalLink={originalLink}/>
        </div>
    )
}

export default ShortenedLinkPage