import './InputField.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type InputFieldProps = {
    submitOriginalLink: (link: string) => void
}

const InputField: React.FC <InputFieldProps>= ({submitOriginalLink}) => {
    const [linkInput, setLinkInput] = useState('')


    const handleClick = () => {
        submitOriginalLink(linkInput)
    }

    return (
        <div className='input-body'>
            <input 
                type="text" 
                placeholder="paste your link" 
                className="input-field"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
            />
            <button onClick={() => handleClick()}>Shorten Link</button>
        </div>
    )
}

export default InputField