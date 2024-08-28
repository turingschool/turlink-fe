import './InputField.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface InputFieldProps  {
    submitOriginalLink: (linkInput: string) => void
}

const InputField: React.FC <InputFieldProps>= ({submitOriginalLink}) => {
    
    const [linkInput, setLinkInput] = useState<string>('')


    const handleClick = () => {
        submitOriginalLink(linkInput)
        setLinkInput('')
    }

    return (
        <div className='input-body'>
            <input 
                type="text" 
                placeholder="Paste Your Link" 
                className="input-field"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
            />
            <button onClick={() => handleClick()}>Shorten Link</button>
        </div>
    )
}

export default InputField