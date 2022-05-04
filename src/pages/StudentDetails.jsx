import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
const StudentDetails =  ()=> {    
    var TID=localStorage.getItem('TID');
    const data={Teacher_ID:TID};
    const [error, setError] = useState("");
    var ar;
    const fetchdata = ()=>{
        try {
              const url = "https://tportal-server.herokuapp.com/StudentDetails";
              const res = axios.post(url, data);
              //window.location = "/"
              console.log(res);
              //return(res);
              
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
          }
        }
    }   
    fetchdata();
      return(
        
      <div>
                <table>
                    <tbody>
                        
                    </tbody>
                </table>
      </div>);
      
};

export default StudentDetails;
