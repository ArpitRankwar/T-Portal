import React,{ useState } from "react";
import axios from "axios";
import "./StudentDetails.css";
import styles from "./styles.module.css";

const StudentDetails =  ()=> {    
	const [stdData,setStdData] = React.useState([]);
    var TID=localStorage.getItem('TID');
    const data={Teacher_ID:TID};
	
	const fetchData = React.useCallback(() => {
		axios.post('/studentdetails',data).then((res)=>{
			setStdData(res.data);
		}).catch(err => console.log(err));
	},[])

	const handlejoinclass=async(tid,proid,cid)=>{
		const datatosend={
			"TeacherID":tid,
			"ChildID":cid,
			"CourseID":proid,
			"Joining_Date":new Date().toLocaleDateString('en-US'),
			"Joining_Time":new Date().toLocaleTimeString('en-US', {hour12:false})
		}

		try {
			const url = "/joinclasslog";
			const { datatosend: res } = await axios.post(url, datatosend);
			
		} catch (error) {
		if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status <= 500
		) {}
		}
	}

	const handleClick =async(proid,sid,mclass,dclass,cname)=>{
		if(mclass-dclass===0 || mclass-dclass<0){
			alert("Course Completed Ask for Upgrade");
			localStorage.setItem('Sname',cname);
		}
		else if (mclass-dclass<3){
			alert("Ask Parents to Upgrade");
			const datatosend={'Student_ID':sid};
			const url = "/fetchchannelid";
			axios.post(url, datatosend).then((res)=>{
			localStorage.setItem('Channel_ID',res.data[0].Channel_ID);
			})
		localStorage.setItem('PID',proid);
		localStorage.setItem('SID',sid);
		localStorage.setItem('Sname',cname);
		console.log(proid);
		window.location='/ProductDetails';
		}
		else{
			const datatosend={'Student_ID':sid};
			const url = "/fetchchannelid";
			axios.post(url, datatosend).then((res)=>{
			localStorage.setItem('Channel_ID',res.data[0].Channel_ID);
			})
			
		localStorage.setItem('PID',proid);
		localStorage.setItem('SID',sid);
		localStorage.setItem('Sname',cname);
		window.location='/ProductDetails';
		}
	}

  	React.useEffect(()=> {
  		fetchData();
  	},[fetchData])
      return(
      <div >
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
						<th>Join Class</th>
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
										<a href={item.MeetLINK} target='_blank'><button className="btn btn-danger" onClick={()=>handlejoinclass(TID,item.ChildID,item.ProductID)} type="button"  disabled={item.MeetLINK?false:true}>Join Class</button></a>
									
										</td>
										<td align="Center">
											<button className="btn btn-danger" onClick={()=>handleClick(item.ProductID,item.ChildID,item.Max_Classes,item.Delivered_Classes,item.ChildName)}>View Classes</button>
										</td>	
	                    			
	                    			
                    		</tr>)
                    	})}
                    </tbody>
                </table>
      </div>
      );
      
};

export default StudentDetails;
