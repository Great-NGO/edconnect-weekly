import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './Home';
import Signup from './Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/Signup" component={Signup} />
        
        <Route path="*" render={() => <div className="text-center p-5"><h1>OOPs you're lost</h1></div>} />
      </Switch>
    </Router>
    
  );
}

export default App;

// <Route path="*" render={() => <div className="text-center p-5"><h1>OOPs you're lost</h1></div>} /> */}
// The code above is a: Catch all component, if the entered component/url doesn't exist 