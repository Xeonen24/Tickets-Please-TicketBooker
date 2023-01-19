import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';
import React, { createContext, useReducer } from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './pages/login/login'
import Signup from './pages/signup/signup';
import Logout from './pages/logout/logout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Detail from './pages/detail/Detail';
import {initialState,reduce} from './reducer/UseReducer';

export const UserContext = createContext();
export const loggedIN = localStorage.getItem("isLoggedIn")

const App = () =>{
    const [state, dispatch]= useReducer(reduce,initialState)
    return (
        <BrowserRouter>
            <Route render={props => (
                <>
                <UserContext.Provider value={{state, dispatch}}>
                    <Header {...props}/>
                    <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/logout" component={Logout} />
                            <Route path='/:category/search/:keyword'component={Catalog}/>
                             <Route path='/:category/:id' component={Detail}/>
                            <Route path='/:category' component={Catalog}/>
                            <Route path='/' exact component={Home}/>
                    </Switch>
                    <Footer/>
                </UserContext.Provider>
                </>
            )}/>
        </BrowserRouter>
    );
}

export default App;


