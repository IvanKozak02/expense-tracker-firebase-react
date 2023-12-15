import React, {useEffect} from 'react';
import {auth,provider} from '../../config/firebase-config'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from "react-router-dom";
import {useGetUserInfo} from "../../hooks/useGetUserInfo";
function Auth() {

    const navigate = useNavigate();
    const {isAuthenticated} = useGetUserInfo();


    useEffect(()=>{
        if (isAuthenticated){
            navigate('/expense-tracker')
        }
    },[])

    const signInWithGoogle = async () => {
        const res = await signInWithPopup(auth,provider);
        const authUser = {
            userId: res.user.uid,
            name: res.user.displayName,
            profileImg: res.user.photoURL,
            isAuthenticated: true
        };
        localStorage.setItem('auth', JSON.stringify(authUser))
        navigate('/expense-tracker')
    }

    return (
        <>
            <div className="login-page">
                <p>Sign In With Google to Continue</p>
                <button className="login-with-google-btn" onClick={signInWithGoogle}>
                    Sign In With Google
                </button>
            </div>
        </>
    );
}

export default Auth;