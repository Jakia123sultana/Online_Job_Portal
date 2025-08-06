import {
    createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import PrivateRoute from "../routes/PrivateRoute";
import JobApply from "../pages/JobApply/JobApply";
import JobDetails from "../pages/JobDetails/JobDetails";
import MyApplictions from "../pages/MyApplications/MyApplications";
import AddJob from "../pages/AddJob/AddJob";
import Dashboard from "../layouts/DashBoard";
import ManageUsers from "../DashBoard/Adimn/ManageUser";
import  AdminRoute from "../routes/AdminRoute"
import ManageJob from "../DashBoard/Adimn/ManageJob";
import AdminProfile from "../DashBoard/Adimn/AdminProfile";
import MyApplication from "../DashBoard/User/MyApplication";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'register',
                Component: Register
            },
              {
                path: 'signIn',
                Component: SignIn
            },
              {
                path:'/jobs/:id',
                Component: JobDetails,
                // loader: ({params}) => fetch(`http://localhost:3000/jobs/${params.id}`)
            },
             {
                path: 'jobApply/:id',
                element: <PrivateRoute><JobApply/></PrivateRoute>
            },
            //   {
            //     path: 'myApplications',
            //     element: <PrivateRoute><MyApplictions/></PrivateRoute>
            // },
            {
                path:'/addJob',
                element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
            },
            
        ]
    },
     {
    path: "/dashboard",
    element: (
      <PrivateRoute>
       <Dashboard/>
      </PrivateRoute>
    ),
      children: [
           {
        path: "userProfile",
        element: <AdminProfile/>,
      },
           {
        path: "my-applications",
        element: <MyApplication/>,
      },
         {
        path: "adminProfile",
        element: <AdminRoute><AdminProfile/></AdminRoute>,
      },
      {
        path: "manageuser",
        element: <AdminRoute><ManageUsers/></AdminRoute>,
      },
       {
        path: "manage-jobs",
        element: <AdminRoute><ManageJob/></AdminRoute>,
      },
      ]
}
]);

export default router;