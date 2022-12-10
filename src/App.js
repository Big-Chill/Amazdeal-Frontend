import './App.css';
import Home from './Pages/Home/Home';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import SellerForm from './Pages/SellerForm/SellerForm';
import ImageUpload from './Pages/ImageUpload/ImageUpload';
import Privateroute from './Components/PrivateRoute/Privateroute';
import Address from './Pages/Address/Address';
import Header from './Layouts/Header/Header';
import Cart from './Pages/Cart/Cart';
import Order from './Pages/Order/Order';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Privateroute exact path="/form" component={SellerForm} />
            <Privateroute exact path="/imgupload" component={ImageUpload} />
            <Privateroute exact path="/address" component={Address} />
            <Privateroute exact path="/order" component={Order} />
          </Switch>
          </Header>
        </Router>
    </>
  );
}

export default App;
