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
          id
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

// user specific info

export const getUserById = (id: any) => {
  const removeuserinfo = {
    query: `query MyQuery{
      users_by_pk(id: ${id}) {
        email
        id
        name
        password
        role
      }
    }`,
  };

  return removeuserinfo;
};

// edit user info query

export const updateUserInfo = (id: any,role:string,password:any) => {
  const removeuserinfo = {
    query: `
    mutation {
      update_users_by_pk(pk_columns: {id: ${id}}, _set: {role: "${role}", password: ${password}}) {
        id
      }
    }`,
  };

  return removeuserinfo;
};
