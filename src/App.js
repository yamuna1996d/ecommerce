import React,{useEffect} from 'react';
import { Switch,Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import AdminDashboard from './pages/admin/AdminDashboard';
import Header from './components/nav/Header';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import RegisterComplete from './pages/auth/RegisterComplete';
import {auth} from './firebase';
import {useDispatch} from 'react-redux';
import ForgotPassword from './pages/auth/ForgotPassword';
import {currentUser} from './functions/auth';
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';

const App = () =>{
  const dispatch = useDispatch()
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  },[dispatch])

  return (
   <div>
      <Header></Header>
      <ToastContainer />
    <Switch>
      <Route path="/" component={Home} exact></Route>
      <Route path="/login" component={Login} exact></Route>
      <Route path="/register" component={Register} exact></Route>
      <Route path="/register/complete" component={RegisterComplete} exact></Route>
      <Route path="/forgot/password" component={ForgotPassword} exact></Route>
      <UserRoute path="/user/history" component={History} exact></UserRoute>
      <UserRoute path="/user/password" component={Password} exact></UserRoute>
      <UserRoute path="/user/wishlist" component={Wishlist} exact></UserRoute>
      <AdminRoute path="/admin/admindashboard" component={AdminDashboard} exact></AdminRoute>
    </Switch>
   </div>
  );
}

export default App;
