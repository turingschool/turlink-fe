import { useState, MouseEvent, ChangeEvent } from 'react'

interface User {
    email: string;
    password: string;
    password_confirmation: string;
}

const LoginForm = (): React.JSX.Element => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
            password_confirmation: password, 
        }
        console.log('user:', user)
        authenticateUser(user)
    }

    const authenticateUser = (user: User) => {
        fetch('http://localhost:5000/api/v1/sessions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',  
            },
            body: JSON.stringify(user)
        })
    }

    return (
        <form>
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            />
            <button type="button" onClick={handleLogin}>Login</button>
        </form>
    )
}

export default LoginForm

