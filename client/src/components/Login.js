import '../CSS/style.css';
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    // Keeps track of the values the user has entered in the Log In fields
    const [loginValues, setLoginValues] = useState({
        username: '',
        password: ''
    });
    // Called when Sign In is pressed
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/account/login', loginValues)
        .then(res => {
            // server sends back one of the following responses:
            // "There is no account with the given username." + success: false
            // "The given password is incorrect." + success: false
            // "Successfully logged in as [username]." + success: true
            // Display the returned message
            console.log(res.data.message);
            if(res.data.success) {
                // Do login stuff
                console.log("success");
            }
        })
        .catch(err => console.log(err));
    };

    // Keeps track of the values the user has entered in the Sign Up fields
    const [accountValues, setAccountValues] = useState({
        username: '',
        password: '',
        passwordConfirm: ''
    });
    // Called when Create Account is pressed
    const handleAccountSubmit = (e) => {
        e.preventDefault();
        if(accountValues.password === accountValues.passwordConfirm){
            axios.post('http://localhost:9000/account/create_account', accountValues)
            .then(res => {
                // server sends back one of the following responses
                // "There is already an account associated with this username." + success false
                // "Account [username] successfully created. You may now log in." + success false
                // Display the returned message
                console.log(res.data);
            })
            .catch(err => console.log(err));
        } else {
            // display passwords do not match
            console.log('passwords do not match');
        }
    };

    return (
        <>
            <head>
                <title>Log In/Sign Up</title>
                <meta charset="UTF-8" />
            </head>
            <body class="login-page">
                <h1>PetSmarter</h1>
                <div class="login">
                    <div class="subtitle">
                        <h2>Please Log In</h2>
                    </div>

                    <form class="user-pass" onSubmit={handleLoginSubmit}>
                        <input type="text" name="Username" id="user" placeholder="Username:" required="required" minlength="5" maxlength="20" 
                        onChange={e => setLoginValues({...loginValues, username: e.target.value})}></input>
                        <input type="password" name="Password" id="pass" placeholder="Password:" required="required" minlength="8" maxlength="20" 
                        onChange={e => setLoginValues({...loginValues, password: e.target.value})}></input>

                        <div class="login-submit">
                            <input type="submit" class="login-button" name="login-button" id="login-button" value="Sign In"></input>
                        </div>
                    </form>
                </div>
                <h2>or</h2>
                <div class="signup">
                    <div class="subtitle">
                        <h2>Sign Up</h2>
                    </div>

                    <form class="user-pass" onSubmit={handleAccountSubmit}>
                        <input type="text" name="Username" id="user" placeholder="Set Username:" required="required" minlength="5" maxlength="20" 
                        onChange={e => setAccountValues({...accountValues, username: e.target.value})}></input>
                        <input type="password" name="Password" id="pass" placeholder="Set Password:" required="required" minlength="8" maxlength="20" 
                        onChange={e => setAccountValues({...accountValues, password: e.target.value})}></input>
                        <input type="password" name="Password" id="pass" placeholder=" Confirm Password:" required="required" minlength="8" maxlength="20" 
                        onChange={e => setAccountValues({...accountValues, passwordConfirm: e.target.value})}></input>

                        <div class="signup-submit">
                            <input type="submit" class="signup-button" name="signup-button" id="signup-button" value="Create Account"></input>
                        </div>
                    </form>
                </div>
            </body>
        </>
    );
}

export default Login;