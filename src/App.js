import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';
import React from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './pages/login/login'
import Signup from './pages/signup/signup';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Detail from './pages/detail/Detail';

// import GlobalLoading from './components/loading/Loading'

function App() {
    
    return (
        <>
        <BrowserRouter>
            <Route render={props => (
                <>    
                    <Header {...props}/>
                    <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                            <Route path='/:category/search/:keyword'component={Catalog}/>
                             <Route path='/:category/:id' component={Detail}/>
                            <Route path='/:category' component={Catalog}/>
                            <Route path='/' exact component={Home}/>
                    </Switch>
                <Footer/>
                </>
                
            )}/>
        </BrowserRouter>
     </>
    );
}
export default App;