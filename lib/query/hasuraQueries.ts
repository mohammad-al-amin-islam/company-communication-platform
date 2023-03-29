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

export const updateUserInfo = (id: any, role: string, password: any) => {
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

//create teams query
export const createTeams = (name: any, id: any) => {
  const createTeamsQuery = {
    query: `
          mutation {
            insert_teams(objects: {admin_id: ${id}, name: "${name}"}) {
              affected_rows
              returning {
                name
              }
            }
          }`,
  };

  return createTeamsQuery;
};

// create teams query
export const allTeamsQuery = {
  query: `
      query MyQuery {
        teams {
          id
          name
          created_at
        }
      }
    `,
};

//remove team query
export const removeTeams = (id: any) => {
  const removeTeamsQuery = {
    query: `
    mutation {
      delete_teams_by_pk(id: ${id}) {
        name
      }
    }`,
  };

  return removeTeamsQuery;
};

//getAllusersInformation

export const allUserInfo = {
  query: `
  query MyQuery {
    users {
      role
      id
      name
    }
  }
    `,
};

//add team members qurey

export const addTeamsMembers = (teamId: any, userId: any) => {
  const addToTheTeams = {
    query: `
    mutation {
      insert_team_members_one(object: {team_id: ${teamId}, user_id: ${userId}},) {
        id
      }
    }`,
  };

  return addToTheTeams;
};

//all perticipant list

export const allPerticipantInfo = {
  query: `
  query MyQuery {
    team_members {
      user_id
      id
      team_id
      user {
        name
        created_at
      }
    }
  }
    `,
};
