import React,{useEffect} from 'react';
import { Switch,Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import {auth} from './firebase';
import {useDispatch} from 'react-redux';
import ForgotPassword from './pages/auth/ForgotPassword'
const App = () =>{
  const dispatch = useDispatch()
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });
    // cleanup
    return () => unsubscribe();
  },[])

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
    </Switch>
   </div>
  );
}

export default App;
