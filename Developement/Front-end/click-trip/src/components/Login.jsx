import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { analytics ,auth} from '../Analytics/Firebase';
import { logEvent } from 'firebase/analytics';

export default function Login() {
    
    const [userName, setUsername] = useState(''); // Initialize with empty strings
    const [password, setPassword] = useState('');

    const handleAnalytics=(userName)=>{
        logEvent(analytics,'search_performed_app',{
            uuid : userName,
            action :"Login Attemplted"
        });
    }

    const handleLogin = async ()=>{
        console.log('Login attempt with:');
        const username=userName;
        const passkey=password;
        handleAnalytics(userName);
        signInWithEmailAndPassword(auth,username,passkey)
        .then((userCredential)=>{
            console.log("user logged in" , userCredential.user.email);
        }).catch((firebaseError)=>{
            switch (firebaseError.code) {
          case 'auth/user-not-found':
            console.log('No user found with this email.');
            break;
          case 'auth/wrong-password':
            console.log('Incorrect password.');
            break;
          case 'auth/invalid-email':
            console.log('Invalid email address format.');
            break;
          case 'auth/too-many-requests':
            console.log('Too many login attempts. Please try again later.');
            break;
          default:
            console.log('Login failed. Please check your credentials and try again.',firebaseError);
         }
        });

    };

    return (
        <div className="login-container"> {/* Optional: A container for centering */}
            <div className="login-window">
                <h1>ClickTrip</h1> {/* Changed from p to h1 */}
                <div className="input-group">
                    <input
                        type="email" // Use type email for better mobile keyboard
                        placeholder="username@clickTrip.com"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password" // Use type password for security
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="login-button" onClick={handleLogin}>Log In</button>
            </div>
        </div>
    );
}
