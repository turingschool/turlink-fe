import '../LoginForm/LoginForm.css'
import exclamationMark from '../../Images/exclamation-mark.png'
import { useState, useEffect, MouseEvent, ChangeEvent } from 'react'

interface User {
    email: string;
    password: string;
}

const LoginForm = (): React.JSX.Element => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isMissingEmail, setIsMissingEmail] = useState<boolean>(false)
    const [isMissingPassword, setIsMissingPassword] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    const handleLogin = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const user = {
            email,
            password,
        }
        if (email && password) {
            authenticateUser(user)
            clearInputs()
            setIsMissingEmail(false)
            setIsMissingPassword(false)
        } else if (!email && password) {
            setIsMissingEmail(true)
            setIsMissingPassword(false)
        } else if (email && !password) {
            setIsMissingEmail(false)
            setIsMissingPassword(true)
        } else {
            setIsMissingEmail(true)
            setIsMissingPassword(true)
        }
    }

    useEffect(() => {
        setIsError(false)
    }, [email, password])

    const clearInputs = () => {
        setEmail('')
        setPassword('')
    }

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
                    setIsError(true)
                    throw new Error("Incorrect username or password.")
                }
                else {
                    setIsError(false)
                    return response.json()
                }

            })
            .then(response => console.log("response:", response))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <form>
                <label className="email-label">Email</label>
                <br></br>
                <input className="email-input"
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => [setEmail(event.target.value), setIsError(false)]}
                />
                <br></br>
                {isMissingEmail && <p><img src={exclamationMark} alt="exclamation mark" className="exclamation-mark" /> please enter your email</p>}
                <label className="password-label">Password</label>
                <br></br>
                <input className="password-input"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                />
                <br></br>
                {isMissingPassword && <p><img src={exclamationMark} alt="exclamation mark" className="exclamation-mark" /> please enter your password</p>}
                <button type="button" className="login-button" onClick={handleLogin}>Login</button>
            </form>
            {isError && <p className="login-error-message">We can't find that username and password. Please try again.</p>}
        </div>
    )
}

export default LoginForm