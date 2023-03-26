import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';
import React, { createContext, useReducer ,useState,useEffect} from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './pages/login/login'
import Signup from './pages/signup/signup';
import Logout from './pages/logout/logout';
import BookMovie from './pages/BookMovie/BookMovie';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Detail from './pages/detail/Detail';
import  ClipLoader from 'react-spinners/ClipLoader'
import {initialState,reduce} from './reducer/UseReducer';
import BookPage from './pages/detail/BookPage';
import TheatreSelect from './pages/TheatreSelect/TheatreSelect';
import Profile from './pages/profile/Profile';
import Payment from './pages/Payment/Payment';
import AdminLogin from './pages/AdminLogin/AdminLogin';

export const UserContext = createContext();
export const loggedIN = localStorage.getItem("isLoggedIn")


const App = () =>{
    const [state, dispatch]= useReducer(reduce,initialState)
    const [load,setLoading] = useState(false)
    useEffect(() =>{
        setLoading(true)
        setTimeout(() =>{
            setLoading(false)
        },1200)
    },[])
    
    return (
        <BrowserRouter>
            <Route render={props => ( 
                <>
                {
                 load?
                  <ClipLoader className="spinner" color={'#D00218'} loading={load} size={200}/>
                     :
                     <UserContext.Provider value={{state, dispatch}}>
                    <Header {...props}/>
                    <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/payments" component={Payment} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/adminlogin" component={AdminLogin} />
                    <Route path="/book-movie" component={BookMovie} />
                    <Route path="/booking-page" component={BookPage} />
                    <Route path="/select-theatre" component={TheatreSelect} />
                            <Route path='/:category/search/:keyword'component={Catalog}/>
                            <Route path='/:category/:id' component={Detail}/>
                            <Route path='/:category' component={Catalog}/>
                            <Route path='/' exact component={Home}/>
                    </Switch>
                    <Footer/>
                </UserContext.Provider>
                 }
                </>
            )}/>
        </BrowserRouter>
    );
}

export default App;

