import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const SignUp = () => {
  const [data, setData] = useState({ Name: "", Password: "",Teacher_Name:"" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  function handleSignIn(){
    window.location='/'
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          const url = "/SignUp";
          const { data: res } = await axios.post(url, data);
          window.location = "/"
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
              <h1>Sign Up</h1>
              <input
                placeholder="Expert Full Name"
                name="Teacher_Name"
                onChange={handleChange}
                value={data.Teacher_Name}
                required
                className={styles.input}
              />
              <input
                placeholder="Email"
                name="Name"
                onChange={handleChange}
                value={data.Name}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="Password"
                onChange={handleChange}
                value={data.Password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn} onClick={handleSubmit}>
                Sign Up
              </button>
              
              <button className={styles.white_btn} onClick={handleSignIn}>Registered User?Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
