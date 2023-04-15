import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const PotectedSessionRoute = ({children}:any) => {

    const { data: session, status } = useSession();
    // console.log(session);
    const router = useRouter();
  
   
    if (status === "loading") {
      return <p className="text-center mt-10 text-xl">Loading or not authenticated...</p>
    }

    if(!session){
        router.replace('/sign-in');
    }
    
    return children;
};

export default PotectedSessionRoute;