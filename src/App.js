import './App.css';
import Home from './Pages/Home';
import Form from './Pages/Form';
import Individual from './Pages/Individual';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/form/:id" component={Form} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/individual/:id" component={Individual} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
