
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages';
import SignUp from './pages/SignUp';
import StudentDetails from './pages/StudentDetails'
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/SignUp' component={SignUp} />
        <Route path='/StudentDetails' component={StudentDetails} />
      </Switch>
    </Router>
  );
}
export default App;
