import './InputField.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface InputFieldProps  {
    submitOriginalLink: (linkInput: string) => void
    errorMessage: string
}

const InputField: React.FC <InputFieldProps>= ({submitOriginalLink, errorMessage}) => {
    const [linkInput, setLinkInput] = useState<string>('')
    const [error, setError] = useState<string>(errorMessage)

    useEffect(() => {
       setError(errorMessage)
    }, [errorMessage])


    const handleClick = () => {
        submitOriginalLink(linkInput)
        setLinkInput('')
    }

    return (
        <div className='input-body'>
            <p className='shorten-link-text'>Shorten Link</p>
            <input 
                type="text" 
                placeholder="Paste Your Link" 
                className="shorten-link-input"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
            />
            <button className='shorten-link-button'
                onClick={() => handleClick()}
                >Shorten Link</button>
            {error && <p className='error-message'>{error}</p>}
        </div>
    )
}

export default InputField