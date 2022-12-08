import './App.css';
import Home from './Pages/Home';
import Form from './Pages/Form';
import Individual from './Pages/Individual';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Privateroute from './Pages/Privateroute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Privateroute exact path="/" component={Home} />
          <Privateroute exact path="/form" component={Form} />
          <Privateroute exact path="/form/:id" component={Form} />
          <Privateroute exact path="/individual/:id" component={Individual} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
