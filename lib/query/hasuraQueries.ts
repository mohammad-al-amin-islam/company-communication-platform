// sign in query
export const signInQuery = {
  query: `
        query MyQuery {
        users {
            email
            password
        }
    }
    `,
};

//useAdmin hooks query
export const useAddminHasuraQuery = (email: any) => {
  const adminInfoQuery = {
    query: `
        query MyQuery {
            users(where: {email: {_eq: "${email}"}}) {
            role
        }
        
    }`,
  };

  return adminInfoQuery;
};

// get all user list
export const allUserQuery = {
  query: `
    query MyQuery {
        users {
          email
          name
          role
        }
      }
    
    `,
};
