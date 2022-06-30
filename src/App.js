
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages';
import SignUp from './pages/SignUp';
import StudentDetails from './pages/StudentDetails';
import ProductDetails from './pages/Product_Details';
function App() {
  axios.defaults.baseURL = 'https://server.wiingy.com';
  // axios.defaults.baseURL = 'http://localhost:8080';
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/SignUp' component={SignUp} />
        <Route path='/StudentDetails' component={StudentDetails} />
        <Route path='/ProductDetails' component={ProductDetails} />
      </Switch>
    </Router>
  );
}
export default App;
