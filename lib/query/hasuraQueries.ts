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

//all teams query
export const allTeamsQueryById = (id: any) => {
  const allTeamsQuery = {
    query: `query MyQuery {
      teams(where: {admin_id: {_eq: ${id}}}) {
        created_at
        id
        name
        admin_id
      }
    }`,
  };

  return allTeamsQuery;
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

// export const allPerticipantInfo = (id: any, limit: any, offset: any) => {
//   const allTeamsParticipant = {
//     query: `query MyQuery {
//       team_members(where: {team_id: {_eq: ${id}}}, limit: ${limit}, offset: ${offset}, order_by: {user: {name: asc}}) {
//         id
//         user {
//           name
//           created_at
//           id
//         }
//       }
//       team_members_aggregate(where: {team_id: {_eq: ${id}}}) {
//         aggregate {
//           count
//         }
//       }
//     }
//     `,
//   };
//   return allTeamsParticipant;
// };
export const allPerticipantInfo = (id: any) => {
  const allTeamsParticipant = {
    query: `query MyQuery {
      team_members(where: {team_id: {_eq: ${id}}}) {
        id
        user {
          name
          created_at
          id
        }
      }
    }`,
  };
  return allTeamsParticipant;
};

//delete perticipant info

export const deleteTeamsMembers = (id: any) => {
  const deleteFormTheTeam = {
    query: `
    mutation {
      delete_team_members_by_pk(id: ${id}) {
        id
        team_id
      }
    }`,
  };

  return deleteFormTheTeam;
};

//get all the teams of an user

export const getAllTeamsForUser = (id: any) => {
  const userTeams = {
    query: `
    query MyQuery {
      teams(where: {team_members: {user_id: {_eq: ${id}}}}) {
        id
        name
      }
    }`,
  };

  return userTeams;
};

//send message to teams
export const getSendMessageQuery = (content: any, teamId: any, userId: any) => {
  const sendMessage = {
    query: `
    mutation {
      insert_messages_one(object: {content: "${content}", team_id: ${teamId}, user_id: ${userId}}) {
        created_at
        content
        id
        user_id
        team_id
      }
    }`,
  };

  return sendMessage;
};

//send message using mutation
export const sentMessageUsingMutation = `
  
  mutation MyMutation($content: String = "", $user_id: Int = 10, $team_id: Int = 10) {
    insert_messages_one(object: {content: $content, user_id: $user_id, team_id: $team_id}) {
      content
      created_at
      id
      team_id
      user_id
    }
  }
  
  `;

//get all messages
export const getAllMessage = {
  query: `
  query MyQuery {
    messages {
      content
      id
      created_at
      team_id
      user_id
    }
  }
    `,
};

//get specific groups messages
export const getSpecificTeamMessage = (id: any) => {
  const getAllMessage = {
    query: `
    query MyQuery {
      messages(where: {team_id: {_eq: ${id}}}) {
        content
        created_at
        id
        team_id
        user_id
        user {
          name
        }
      }
    }`,
  };

  return getAllMessage;
};
export const getSpecificTeamMessageSubsCription = (id: any) => {
  const getAllMessage = {
    query: `
    subscription MySubscription {
      messages(where: {team_id: {_eq: ${id}}}) {
        content
        created_at
        id
        team_id
        user_id
        user {
          name
        }
      }
    }`,
  };

  return getAllMessage;
};

//delete message

export const deleteMessegeQuery = (id: any) => {
  const deleteMessage = {
    query: `
    mutation {
      delete_messages_by_pk(id: ${id}) {
        team_id
        user_id
      }
    }`,
  };

  return deleteMessage;
};

// get teamInfo

export const getTeamInfo = (id: any) => {
  const getTeam = {
    query: `query MyQuery {
      teams_by_pk(id: ${id}) {
        name
        team_members {
          id
        }
      }
    }`,
  };

  return getTeam;
};

//edit message query
export const editMessegeQuery = (id: any, content: string) => {
  const editedMessage = {
    query: `
    mutation {
      update_messages_by_pk(pk_columns: {id: ${id}}, _set: {content:"${content}"}}) {
        id
        content
      }
    }`,
  };

  return editedMessage;
};

export const getUpdateInformationQuery = `
mutation MyMutation($id: Int = 10, $name: String = "", $password: Int = 10) {
  update_users_by_pk(pk_columns: {id: $id}, _set: {name: $name, password: $password}) {
    updated_at
  }
}`;

export const getUserInfo = (id: any) => {
  const getdata = {
    query: `query MyQuery($id: Int = 10) {
      users_by_pk(id: $id) {
        name
      }
    }`,
    variables: { id: id },
  };

  return getdata;
};

//pagination
export const getAlluserPagination = (limit: any, offset: any) => {
  const getUser = {
    query: `query MyQuery {
      users(limit: ${limit}, offset: ${offset}, order_by: {created_at: desc}), {
        email
        name
        role
        id
      }
      users_aggregate {
        aggregate {
          count
        }
      }
    }`,
  };

  return getUser;
};
