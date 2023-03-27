import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import useAdmin from '../hooks/useAdmin';

const RequireAdmin = ({children}:any) => {

    const {data:session} = useSession();
    const email = session?.user?.email;
    const [role,isLoading] = useAdmin(email);
    const router = useRouter();
    
    if(isLoading){
        return <p>loading...</p>
    }

    if(!role || !session){
        router.replace('/');
        return;
    }

    return children;
};

export default RequireAdmin;