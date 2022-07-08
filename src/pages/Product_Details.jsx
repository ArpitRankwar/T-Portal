import React,{ useState } from "react";
import axios from "axios";
import "./StudentDetails.css";
import styles from "./styles.module.css";
import "./productdetail.css";
import { withAlert } from 'react-alert'

const ProductDetails =  ()=> {  
	const [val, setVal] = useState(0);  
	const [stdData,setStdData] = React.useState([]);
	const [stdclass,setClassData] = React.useState([]);
    var PID=localStorage.getItem('PID');
	var SID=localStorage.getItem('SID');
	var TID=localStorage.getItem('TID');
    const data={Product_ID:PID};
	const classdata={Student_ID:SID,Product_ID:PID};
    const [dummy, setdummy] = useState(false);
	const fetchData = React.useCallback(() => {
		console.log(data);
		axios.post('/productdetails',data).then((res)=>{
			console.log(res.data);
			setStdData(res.data);
			console.log(stdData)
		}).catch(err => console.log(err));
	},[]);
	
	const [classFetchLoading,setClassFetchLoading] = React.useState(false);
	const fetchclass = React.useCallback(() => {
		setClassFetchLoading(true);
		axios.post('/completedclass',classdata).then((res)=>{
			
			setClassData(res.data);
		setClassFetchLoading(false)

		}).catch(err => {setClassFetchLoading(false); console.log(err)});
	},[])

	const handleOnChangeassignCheck=async(Clas,stat)=>{
		var st;
		st=stat;
		let Assignment_Link=val;

		if(Assignment_Link.search("https://www.youtube.com/watch?")==-1){
			alert("Not able to find the video on youtube")
		}
		else{
		const datatosend={
			"Product_ID":PID,
			"Student_ID":SID,
			"Class_ID":Clas,
			"Assignment_Link":Assignment_Link,
			"status":st.toString()
		}
		if(st===false){
					
			alert("Not Allowed - Contact Admin to change");
			window.location = "/ProductDetails";

		}
		if(st===true){
			try {
				const url = "/assignmentdetails";
				const { datatosend: res } = await axios.post(url, datatosend);
				//window.location = "/"
				if(st===true){
					setdummy(true);
				}
				
			} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {}
			}
		}
	}
	}

	const handlechannelid=async()=>{
		let Channel_ID=val;
		const datatosend={
			"Channel_ID":Channel_ID,
			"Student_ID":SID
		}
		const url = "/updatechannelid";
		const { datatosend: res } = await axios.post(url, datatosend);
	}

    const handleOnChangeCheck=async(Clas,maxscore,stat)=>{
		var st;
		let score=val;
		st=stat;
		if(score>maxscore){
			alert(`Quiz Score should less than ${maxscore}`)
		}
		else{
		const datatosend={
			"Product_ID":PID,
			"Student_ID":SID,
			"Class_ID":Clas,
			"Date_Time":new Date().toLocaleDateString('en-US') ,
			"Teacher_ID":TID,
			"Quiz_Score":score,
			"status":st.toString(),
			"Entry_Time":new Date().toLocaleTimeString('en-US', {hour12:false})
		}
		if(st===false){
					
			alert("Not Allowed - Contact Admin to change");

		}
		if(st===true){
			try {
				const url = "/studentclasses";
				const { datatosend: res } = await axios.post(url, datatosend);
				//window.location = "/"
				if(st===true){
					setdummy(true);
					const url= "/notification"
					const { datatosend: res } = await axios.post(url, datatosend);
				}
				
			} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {}
			}
		}	
	}
    }

  	React.useEffect(()=> {
  		fetchData();
  	},[fetchData])
	  React.useEffect(()=> {
		if(!classFetchLoading){
			fetchclass();
		}
		if(dummy === true)
			setdummy(false);
	},[fetchclass,setdummy,dummy])
	
      return(
      <div classname="container">
		<nav className={styles.navbar}>
        <h1 >Wiingy</h1>
		<input 
			style={{"margin-left":"50%"}}
			type="text"
			placeholder="ChannelID"
			onChange={(e) => setVal(e.target.value)}
			defaultValue={localStorage.getItem('Channel_ID')}
		/>
		<button style={{"margin-right":"20%","border-radius":"2rem"}} onClick={handlechannelid}>Update</button>
      </nav>
			<h4>{localStorage.getItem('Sname')}</h4>
                <table className="table table-striped">
					<thead align="center">
						<th>Class_ID</th>
						<th>Name</th>
						<th>PPT Link</th>
						<th>Quiz Link</th>
						<th>Quiz Score</th>
						<th>Status</th>
						<th>Assigment</th>
                        {/* <th>Quiz Score</th>
                        <th>Assigment Score</th> */}
						
					</thead>	
                    <tbody>
                    	{stdData?.map((item,index)=>{
                    		return(<tr key={index}>
									
		                    			<td align="Center">
		                    				{item.ClassID}
		                    			</td>
	                    			
	                    			
		                    			<td align="Center">
		                    				{item.Class_Name}
		                    			</td>
	                    			
									
		                    			<td align="Center">
		                    				<a href={item.PPT_Link} target="_blank"><button className="btn btn-danger" type="button"  disabled={item.PPT_Link?false:true}>PPT</button></a>
		                    			</td>
	                    			
		                    			<td align="Center">
                                        <a href={item.Quiz_Link} target="_blank"><button className="btn btn-danger" type="button"  disabled={item.Quiz_Link?false:true}>Quiz</button></a>
		                    			</td>

										<td align="Center">
                                        <input type="number"
										className="textbox"
										id="marks"
										disabled={stdclass.find((ClassID) =>ClassID.ClassID === item.ClassID) ? true: false}
										onChange={(e) => setVal(e.target.value)}
										defaultValue={  stdclass.filter((stdItem) => stdItem.ClassID === item.ClassID)[0]?.Quiz_Score  }
										// defaultValue={item.Quiz_Score}
                                            />
		                    			</td>

										<td align="Center">
                                        <input type="checkbox" 
										checked={stdclass.find(({ ClassID }) => ClassID === item.ClassID)? true:false}
                                        onChange={()=>handleOnChangeCheck(item.ClassID,item.Max_quiz_Score,stdclass.find(({ ClassID }) => ClassID === item.ClassID)? false:true)}/>
										</td>

										<td align="Center">
                                            <input  
                                                placeholder="Project Link"
                                                className="textbox"
												style={{width: "60%"}}
												disabled={stdclass.find(({ ClassID,Assignment_Status }) => ClassID === item.ClassID && Assignment_Status===1 )? true:false}
												onChange={(e) => setVal(e.target.value)}
												defaultValue={  stdclass.filter((stdItem) => stdItem.ClassID === item.ClassID)[0]?.Assignment_Link  }
										
                                            />
											<input type="checkbox" 
											style={{"margin-left":"15%"}}
										checked={stdclass.find(({ ClassID,Assignment_Status }) => ClassID === item.ClassID && Assignment_Status===1 )? true:false}
                                        onChange={(e)=>handleOnChangeassignCheck(item.ClassID,stdclass.find(({ ClassID,Assignment_Status }) => ClassID === item.ClassID && Assignment_Status===1)? false:true)}/>
		                    			
                                        </td>
		                    			{/* <td align="Center">
										</td> */}
                                        {/* <td align="Center">
                                            <input
                                                placeholder="Score"
                                                className="textbox"
                                            />
                                        </td>
                                        <td align="Center">
                                            <input
                                                placeholder="Score"
                                                className="textbox"
                                            />
                                        </td>        */}
											
	                    			
	                    			
                    		</tr>)
                    	})}
                    </tbody>
                </table>
      </div>
      );
      
};

export default ProductDetails;
