import './InputField.css'

const InputField: React.FC = () => {
    return (
        <div className='input-body'>
            <input 
                type="text" 
                placeholder="paste your link" 
                className="input-field"
            />
        </div>
    )
}

export default InputField