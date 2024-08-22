import './InputField.css'

const InputField: React.FC = () => {
    return (
        <div className='input-body'>
            <input 
                type="text" 
                placeholder="paste your link" 
                className="input-field"
            />
            <button>Try It!</button>
        </div>
    )
}

export default InputField