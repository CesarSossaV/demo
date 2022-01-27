import React from "react";
import {Route,Link,BrowserRouter as Router,Switch} from 'react-router-dom'
import Artists from "../../pages/Artist/Artist";


import Sidebar from '../sidebar/sidebar'

const AppRouter = () =>{
    return(
        <Router>
            <Sidebar />

            <Switch>
                
                <Route exact path='/artists' component={Artists}></Route>
                
            </Switch>
        </Router>
    );
}

export default AppRouter