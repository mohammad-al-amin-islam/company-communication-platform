// sign in query
export const signInQuery = {
  query: `
        query MyQuery {
        users {
            email
            password
            role
            name
            id
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

//remove user form query
export const removeUserQuery = (email: any) => {
  const removeuserinfo = {
    query: `
      mutation {
        delete_users(where: {email: {_eq: "${email}"}}) {
          returning {
            id
            role
          }
        }
      }`,
  };

  return removeuserinfo;
};
