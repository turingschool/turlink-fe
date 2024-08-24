import '../LoginForm/LoginForm.css'
import exclamationMark from '../../Images/exclamation-mark.png'
import { useState, MouseEvent, ChangeEvent } from 'react'

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

    // when the user clicks the login button, execute a post request
    // if the response.ok, route the user to their dashboard
    // if the !response.ok, show the user a message
    // clear the inputs
    // as soon as the user starts typing again, clear the error message 


    // isError state default to false
    // then if I get a !response.ok, set error to true
    // return conditional if error = true, then display the error 

    // onChange when setting email, set the error to false again 
    // or could have a useEffect, if a user is typing in the password or email
    // clear the message 


    // create a secure json object??
    // check to see what the backend is expecting

    //  verifying input

    // write a function to confirm email form
    // confirm @ sign 
    // confirm .com 
    // could have message that appears as using is typing 

    // inline error 

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

    const clearInputs = () => {
        setEmail('')
        setPassword('')
    }

    return (
        <div>
            <form>
                <label>Email</label>
                <br></br>
                <input className="email-input"
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                />
                <br></br>
                {isMissingEmail && <p><img src={exclamationMark} alt="exclamation mark" className="exclamation-mark" /> please enter your email</p>}
                <label>Password</label>
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
            {isError && <p className="login-error-message">We can't find that username and password. Try again.</p>}
        </div>
    )
}

export default LoginForm