import React from 'react';
import './App.css';
import { Route} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from './components/Navbar';




function App(){
  return(
    <div>
    <Header />
    <Route exact path="/">
    <Home />
    </Route>
    <Route path="/Login">
    <Login />
    </Route>
    <Route path="/Signup">
    <Signup />
    </Route>
    </div>
  )
}

export default App;