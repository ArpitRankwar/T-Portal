import React,{ useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";


const StudentDetails =  ()=> {    
	const [stdData,setStdData] = React.useState([]);
    var TID=localStorage.getItem('TID');
    const data={Teacher_ID:TID};
    const [error, setError] = useState("");
    var ar;

	const fetchData = React.useCallback(() => {
		axios.post('https://tportal-server.herokuapp.com/StudentDetails',data).then((res)=>{
			console.log(res);
			setStdData(res.data);
		}).catch(err => console.log(err));
	},[])


  	React.useEffect(()=> {
  		fetchData();
  	},[fetchData])

    // const fetchdata = async ()=>{
    //     try {
    //           const url = "https://tportal-server.herokuapp.com/StudentDetails";
    //           const res = await axios.post(url, data);
    //           //window.location = "/"
    //           console.log(res.data);
    //           //return(res);
              
    //     } catch (error) {
    //       if (
    //         error.response &&
    //         error.response.status >= 400 &&
    //         error.response.status <= 500
    //       ) {
    //       }
    //     }
    // }   
    // fetchdata();
    // fetchData()
      return(
      <div>
                <table>
                    <tbody>
                    	{stdData?.map((item,index)=>{
                    		return(<tr key={index}>
                    				<tc>
		                    			<td>
		                    				{item.Course}
		                    			</td>
	                    			</tc>
	                    			<tc>
		                    			<td>
		                    				{item.Delivered_Classes}
		                    			</td>
	                    			</tc>
	                    			<tc>
		                    			<td>
		                    				{item.Grade}
		                    			</td>
	                    			</tc>
	                    			<tc>
		                    			<td>
		                    				{item.MaxClasses}
		                    			</td>
	                    			</tc>
	                    			<tc>
		                    			<td>
		                    				{item.Statuss}
		                    			</td>
	                    			</tc>
	                    			<tc>
		                    			<td>
		                    				{item.Student_ID}
		                    			</td>
	                    			</tc>
	                    			<tc>
		                    			<td>
		                    				{item.Student_Name}
		                    			</td>
	                    			</tc>
                    		</tr>)
                    	})}
                    </tbody>
                </table>
      </div>
      );
      
};

export default StudentDetails;
