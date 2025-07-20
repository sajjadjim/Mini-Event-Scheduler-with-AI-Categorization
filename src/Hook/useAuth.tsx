import React, { use } from 'react';
import { AuthContext } from '../Auth/Authcontext';


const useAuth = () => {
    const authInfo = use(AuthContext);
    return authInfo;
};

export default useAuth;