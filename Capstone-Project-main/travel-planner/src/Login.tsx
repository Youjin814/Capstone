import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import { logIn } from './firebaseHandler';
import LoginLayout from './Layouts/LoginLayout';

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function userAuth(username: String, password: String){
        const response = await logIn(username, password)
        
        if (response) navigate('/home')
    }

    return(
        <div className="App">
            <LoginLayout>
            <header className="App-header">
                <h2>Log In</h2>
                <input
                id="LoginBar"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                />
                <input
                id="LoginBar"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                />

                <button id="LoginButton" onClick={() => userAuth(username, password)}>
                Login
                </button>

                <p>Dont have an account? <Link to={`/register`}>Register here!</Link></p>
            </header>
            </LoginLayout>
        </div>
    )
}
export default Login