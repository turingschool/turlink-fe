import './Login.css';
import exclamationMark from '../../Images/exclamation-mark.png';
import { useState, MouseEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../../utils/localStorage';

interface User {
    email: string;
    password: string;
}

const Login = (): React.JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isMissingEmail, setIsMissingEmail] = useState<boolean>(false);
    const [isMissingPassword, setIsMissingPassword] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const user = {
            email,
            password,
        };
        if (email && password) {
            authenticateUser(user);
            clearInputs();
            setIsMissingEmail(false);
            setIsMissingPassword(false);
        } else if (!email && password) {
            setIsMissingEmail(true);
            setIsMissingPassword(false);
        } else if (email && !password) {
            setIsMissingEmail(false);
            setIsMissingPassword(true);
        } else {
            setIsMissingEmail(true);
            setIsMissingPassword(true);
        }
    };

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    const authenticateUser = (user: User) => {
        return fetch('https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) {
                setIsError(true);
                throw new Error("Incorrect username or password.");
            }
            return response.json();
        })
        .then(data => {
            const userId = data.data.id;
            setLogin(userId); 
            setIsError(false);
            navigate('/dashboard'); 
            window.dispatchEvent(new Event('storage')); 
        })
        .catch(error => console.log(error));
    };

    return (
        <section className="login-page">
            <div className="login-header">
                <p className="login-header-text">Login</p>
            </div>
            <form className='login-form'>
                <div className="email-input-container">
                    <label className="email-label">Email</label>
                    <br></br>
                    <input className="email-input"
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => [setEmail(event.target.value), setIsError(false)]}
                    />
                    <br></br>
                    {isMissingEmail && <p><img src={exclamationMark} alt="exclamation mark" className="exclamation-mark"/><span className='missing-field'>Please enter your email</span></p>}
                </div>
                <div className="password-input-container">
                    <label className="password-label">Password</label>
                    <br></br>
                    <input className="password-input"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                    />
                    <br></br>
                    {isMissingPassword && <p><img src={exclamationMark} alt="exclamation mark" className="exclamation-mark"/><span className='missing-field'>Please enter your password</span></p>}
                    <button type="button" className="login-button" onClick={handleLogin}>Login</button>
                </div>
            </form>
            {isError && <p className="login-error-message">We can't find that username and password. Please try again.</p>}
        </section>
    );
};

export default Login;
