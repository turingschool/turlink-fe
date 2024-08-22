import './InputField.css'

const InputField: React.FC = () => {
    return (
        <div className='input-body'>
            <input 
                type="text" 
                placeholder="paste your link" 
                className="input-field"
            />
            <button>Shorten Link</button>
        </div>
    )
}

export default InputField