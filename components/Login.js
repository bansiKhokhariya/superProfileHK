'use client';

import { useState, useEffect } from 'react';
import { magic } from '../libs/magic';
import { UserContext } from '../libs/UserContext';
import SignInButton from './SignInButton';
import AccountButtonLogin from './AccountButtonLogin';

const Login = ({ children , redirectUrl }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        magic.user.isLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                magic.user.getMetadata().then(setUser);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            <div>
                {user ? <AccountButtonLogin /> : <SignInButton redirectUrl={redirectUrl}/>}
                {children}
            </div>
        </UserContext.Provider>
    );
};

export default Login;

