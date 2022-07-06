
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages';
import SignUp from './pages/SignUp';
import StudentDetails from './pages/StudentDetails';
import ProductDetails from './pages/Product_Details';
function App() {
  axios.defaults.baseURL = 'https://server.wiingy.com';
  // axios.defaults.baseURL = 'http://localhost:8080';
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Login/>} />
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/StudentDetails' element={<StudentDetails/>} />
        <Route path='/ProductDetails' element={<ProductDetails/>} />
      </Routes>
    </Router>
  );
}
export default App;
