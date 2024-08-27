import './InputField.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getShortLink } from '../apiCalls/apiCalls'

const InputField: React.FC = () => {
    const [originalLink, setOriginalLink] = useState('')
    const [id, setId] = useState(1)
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("ID: ", id)
        console.log("ORIGINAL LINK: ", originalLink)
        getShortLink(id, originalLink, navigate)
        .then((data) => {
            console.log('RESPONSE DATA', data); 
        })
    }

    return (
        <div className='input-body'>
            <input 
                type="text" 
                placeholder="paste your link" 
                className="input-field"
                value={originalLink}
                onChange={(e) => setOriginalLink(e.target.value)}
            />
            <button onClick={() => handleClick()}>Shorten Link</button>
        </div>
    )
}

export default InputField