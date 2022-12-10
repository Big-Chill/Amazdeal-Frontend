import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Privateroute from './Pages/Privateroute';
import SellerForm from './Pages/SellerForm';
import Imgupload from './Pages/Imgupload';
import Imagepage from './Pages/Imagepage';
import Addresspage from './Pages/Addresspage';
import AddressFormpage from './Pages/AddressFormpage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Privateroute exact path="/" component={Home} />
          <Privateroute exact path="/imgupload" component={Imgupload} />
          <Privateroute exact path="/imagepage" component={Imagepage} />
          <Privateroute exact path="/sellerform" component={SellerForm} />
          <Privateroute exact path="/addresspage" component={Addresspage} />
          <Privateroute exact path="/addressformpage" component={AddressFormpage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
