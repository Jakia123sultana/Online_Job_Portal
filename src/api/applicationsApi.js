export const myApplicationsPromise = async (email,accessToken) =>
  (await fetch(`http://localhost:3000/applications?email=${email}`, 
  
  //   {
  //   credentials: 'include',
  // },
  {
    headers:{
      authorization:`Bearer ${accessToken}`
    }
  })).json();
  
