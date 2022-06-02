import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  function handleSignUp(){
    window.location='/SignUp'
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      const url = "https://tportalserverwiingy.herokuapp.com/LogIn";
      const { data: res } = await axios.post(url, data);
      window.location='/StudentDetails';
      localStorage.setItem('TID',res[0].Teacher_ID);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <h1>Wiingy</h1>
      </nav>
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Login</h1>
              <input
                placeholder="Email"
                name="username"
                onChange={handleChange}
                value={data.username}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Sign In
              </button>
              
              {/* <button className={styles.white_btn} onClick={handleSignUp}>New User?Register Here</button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
