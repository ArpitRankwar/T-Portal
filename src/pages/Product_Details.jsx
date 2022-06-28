import React,{ useState } from "react";
import axios from "axios";
import "./StudentDetails.css";
import styles from "./styles.module.css";
import "./productdetail.css";
import { withAlert } from 'react-alert'

const ProductDetails =  ()=> {  
	const [val, setVal] = useState();  
	const [stdData,setStdData] = React.useState([]);
	const [stdclass,setClassData] = React.useState([]);
    var PID=localStorage.getItem('PID');
	var SID=localStorage.getItem('SID');
	var TID=localStorage.getItem('TID');
    const data={Product_ID:PID};
	const classdata={Student_ID:SID};
    const [dummy, setdummy] = useState(false);
	const fetchData = React.useCallback(() => {
		axios.post('https://tportalserverwiingy.herokuapp.com/ProductDetails',data).then((res)=>{
			
			setStdData(res.data);
		}).catch(err => console.log(err));
	},[])
	const fetchclass = React.useCallback(() => {
		axios.post('https://tportalserverwiingy.herokuapp.com/extractclass',classdata).then((res)=>{
			
			setClassData(res.data);

		}).catch(err => console.log(err));
	},[])

	const handleOnChangeassignCheck=async(Clas,stat)=>{
		var st;
		st=stat;
		const datatosend={
			"Product_ID":PID,
			"Student_ID":SID,
			"Class_ID":Clas,
			"status":st.toString()
		}
		if(st===false){
					
			alert("Not Allowed - Contact Admin to change");
			window.location = "/ProductDetails";

		}
		if(st===true){
			try {
				const url = "https://tportalserverwiingy.herokuapp.com/updateassignDetails";
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

    const handleOnChangeCheck=async(Clas,stat)=>{
		var st;
		var score=val;
		console.log(score);
		if(stdclass.find(({ Student_ID }) => Student_ID === SID)){
			console.log("dddds");
		}
		st=stat;
		
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
		console.log(datatosend);
		if(st===false){
					
			alert("Not Allowed - Contact Admin to change");
			//window.location = "/ProductDetails";

		}
		if(st===true){
			try {
				const url = "https://tportalserverwiingy.herokuapp.com/updateDetails";
				const { datatosend: res } = await axios.post(url, datatosend);
				//window.location = "/"
				if(st===true){
					setdummy(true);

					//window.location = "/ProductDetails";
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

  	React.useEffect(()=> {
  		fetchData();
  	},[fetchData])
	  React.useEffect(()=> {
		fetchclass();
		setdummy(false);
		console.log(stdData);
	},[fetchclass,setdummy,dummy])
      return(
      <div classname="container">
		  <nav className={styles.navbar}>
        <h1 >Wiingy</h1>
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
                                        onChange={()=>handleOnChangeCheck(item.ClassID,stdclass.find(({ ClassID }) => ClassID === item.ClassID)? false:true)}/>
										</td>

		                    			<td align="Center">
										<input type="checkbox" 
										checked={stdclass.find(({ ClassID,Assignment_Status }) => ClassID === item.ClassID && Assignment_Status===1 )? true:false}
                                        onChange={(e)=>handleOnChangeassignCheck(item.ClassID,stdclass.find(({ ClassID,Assignment_Status }) => ClassID === item.ClassID && Assignment_Status===1)? false:true)}/>
		                    			</td>
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
