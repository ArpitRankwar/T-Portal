import React,{ useState } from "react";
import axios from "axios";
import "./StudentDetails.css";
import styles from "./styles.module.css";

const StudentDetails =  ()=> {    
	const [stdData,setStdData] = React.useState([]);
    var TID=localStorage.getItem('TID');
    const data={Teacher_ID:TID};
	
	const fetchData = React.useCallback(() => {
		axios.post('https://tportalserverwiingy.herokuapp.com/StudentDetails',data).then((res)=>{
			console.log(res);
			setStdData(res.data);
		}).catch(err => console.log(err));
	},[])
	function handleClick(proid,sid,mclass,dclass){
		if(mclass-dclass===0){
			alert("Course Completed Ask for Upgrade");
		}
		else if (mclass-dclass<3){
			alert("Ask Parents to Upgrade");
		localStorage.setItem('PID',proid);
		localStorage.setItem('SID',sid);
		console.log(proid);
		window.location='/ProductDetails';
		}
		else{
		localStorage.setItem('PID',proid);
		localStorage.setItem('SID',sid);
		console.log(proid);
		window.location='/ProductDetails';
		}
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
		                    				{item.ChildID}
		                    			</td>
	                    			
	                    			
		                    			<td align="Center">
		                    				{item.ChildName}
		                    			</td>
	                    			
									
		                    			<td align="Center">
		                    				{item.ProductID}
		                    			</td>
	                    			
		                    			<td align="Center">
		                    				{item.Course_Name}
		                    			</td>
	                    			
		                    			<td align="Center">
		                    				{item.ChildGrade}
		                    			</td>
	                    			
		                    			<td align="Center">
		                    				{item.Max_Classes}
		                    			</td>
	                    			
		                    			<td align="Center">
		                    				{item.Delivered_Classes}
		                    			</td>
										<td align="Center">
											<button className="btn btn-danger" onClick={()=>handleClick(item.ProductID,item.ChildID,item.Max_Classes,item.Delivered_Classes)}>View Classes</button>
										</td>	
	                    			
	                    			
                    		</tr>)
                    	})}
                    </tbody>
                </table>
      </div>
      );
      
};

export default StudentDetails;
