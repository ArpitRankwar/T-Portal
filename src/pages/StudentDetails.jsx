import React,{ useState } from "react";
import axios from "axios";
import "./StudentDetails.css";
import styles from "./styles.module.css";

const StudentDetails =  ()=> {    
	const [stdData,setStdData] = React.useState([]);
    var TID=localStorage.getItem('TID');
    const data={Teacher_ID:TID};

	const fetchData = React.useCallback(() => {
		axios.post('https://tportal-server.herokuapp.com/StudentDetails',data).then((res)=>{
			console.log(res);
			setStdData(res.data);
		}).catch(err => console.log(err));
	},[])
	function handleClick(proid,sid){
		localStorage.setItem('PID',proid);
		localStorage.setItem('SID',sid);
		console.log(proid);
		window.location='/ProductDetails';
	}

  	React.useEffect(()=> {
  		fetchData();
  	},[fetchData])
      return(
      <div classname="container">
		  <nav className={styles.navbar}>
        <h1>Wiingy</h1>
      </nav>
	  <br></br>
                <table className="table table-striped">
					<thead align="center">
						<th>Student_ID</th>
						<th>Name</th>
						<th>Product_ID</th>
						<th>Course Name</th>
						<th>Grade</th>
						<th>Max Classes</th>
						<th>Classes Completed</th>
						<th>Class List</th>
					</thead>	
                    <tbody>
                    	{stdData?.map((item,index)=>{
                    		return(<tr key={index}>
									
		                    			<td align="Center">
		                    				{item.Student_ID}
		                    			</td>
	                    			
	                    			
		                    			<td align="Center">
		                    				{item.Student_Name}
		                    			</td>
	                    			
									
		                    			<td align="Center">
		                    				{item.Product_ID}
		                    			</td>
	                    			
		                    			<td align="Center">
		                    				{item.Course}
		                    			</td>
	                    			
		                    			<td align="Center">
		                    				{item.Grade}
		                    			</td>
	                    			
		                    			<td align="Center">
		                    				{item.MaxClasses}
		                    			</td>
	                    			
		                    			<td align="Center">
		                    				{item.Delivered_Classes}
		                    			</td>
										<td align="Center">
											<button className="btn btn-danger" onClick={()=>handleClick(item.Product_ID,item.Student_ID)}>View Classes</button>
										</td>	
	                    			
	                    			
                    		</tr>)
                    	})}
                    </tbody>
                </table>
      </div>
      );
      
};

export default StudentDetails;
