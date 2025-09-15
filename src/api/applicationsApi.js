export const myApplicationsPromise = async (email,accessToken) =>
  (await fetch(`https://career-code-server-with-crud.vercel.app/applications?email=${email}`, 
  
  //   {
  //   credentials: 'include',
  // },
  {
    headers:{
      authorization:`Bearer ${accessToken}`
    }
  })).json();
  
