// // import axios from 'axios';
// // import React from 'react';

// // import { useNavigate } from 'react-router';
// // import useAuth from './useAuth';

// // const axiosSecure = axios.create({
// //     baseURL: `http://localhost:5000`
// // });

// // const useAxiosSecure = () => {   
// //     const { user,logOut } = useAuth();
// //     console.log(user);
// //   const navigate = useNavigate();
// //     axiosSecure.interceptors.request.use(config => {
// //         config.headers.Authorization = `Bearer ${user.accessToken}`
// //         return config;
// //     }, error => {
// //         return Promise.reject(error);
// //     })
// //  axiosSecure.interceptors.response.use(res => {
// //         return res;
// //     }, error => {
// //         const status = error.status;
// //         if (status === 403) {
// //             navigate('/forbidden');
// //         }
// //         else if (status === 401) {
// //             logOut()
// //                 .then(() => {
// //                     navigate('/login')
// //                 })
// //                 .catch(() => { })
// //         }

// //         return Promise.reject(error);
// //     })

   
// //     return axiosSecure;
// // };

// // export default useAxiosSecure;

// // useAxiosSecure.jsx
import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({ baseURL: 'https://career-code-server-with-crud.vercel.app' });

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(async config => {
    const currentUser = user;
    if (currentUser) {
      const token = await currentUser.getIdToken(/* forceRefresh? */);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosSecure.interceptors.response.use(
    res => res,
    err => {
      if (err.response?.status === 403) navigate('/forbidden');
      else if (err.response?.status === 401) {
        logOut().then(() => navigate("/login"));
      }
      return Promise.reject(err);
    },
  );

  return axiosSecure;
};
export default useAxiosSecure;


// import axios from 'axios';
// import React from 'react';
// import useAuth from './useAuth';

// const axiosSecure = axios.create({
//     baseURL: `http://localhost:5000`
// });

// const useAxiosSecure = () => {
//     const { user } = useAuth();
   

//     axiosSecure.interceptors.request.use(config => {
//        console.log(user,user.accessToken)
//         config.headers.Authorization = `Bearer ${user.accessToken}`
//         return config;
//     }, error => {
//         return Promise.reject(error);
//     })


//     return axiosSecure;
// };

// export default useAxiosSecure;