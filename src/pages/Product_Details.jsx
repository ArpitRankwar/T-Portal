import React,{ useState } from "react";
import axios from "axios";
import "./StudentDetails.css";
import styles from "./styles.module.css";
import "./productdetail.css";
import { withAlert } from 'react-alert'
const ProductDetails =  ()=> {    
	const [stdData,setStdData] = React.useState([]);
	const [stdclass,setClassData] = React.useState([]);
    var PID=localStorage.getItem('PID');
	var SID=localStorage.getItem('SID');
    const data={Product_ID:PID};
	const classdata={Student_ID:SID};
    const [isChecked, setIsChecked] = useState([]);
	const fetchData = React.useCallback(() => {
		axios.post('https://tportal-server.herokuapp.com/ProductDetails',data).then((res)=>{
			
			setStdData(res.data);
		}).catch(err => console.log(err));
	},[])
	const fetchclass = React.useCallback(() => {
		axios.post('https://tportal-server.herokuapp.com/extractclass',classdata).then((res)=>{
			
			setClassData(res.data);
			
		}).catch(err => console.log(err));
	},[])

    const handleOnChangeCheck=async(Clas,stat)=>{
		var st;
		if(stdclass.find(({ Student_ID }) => Student_ID === SID)){
			console.log("dddds");
		}
		st=stat;
		
		const datatosend={
			"Product_ID":PID,
			"Student_ID":SID,
			"Class_ID":Clas,
			"Date_Time":new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString() ,
			"status":st.toString()
		}
		console.log(datatosend);
			try {
				const url = "https://tportal-server.herokuapp.com/updateDetails";
				const { datatosend: res } = await axios.post(url, datatosend);
				//window.location = "/"
				console.log(datatosend);
				if(st===false){
					
					alert("Deleted Successfully");
					window.location = "/ProductDetails";

				}
				if(st===true){
					
					alert("Added Successfully");
					window.location = "/ProductDetails";
				}
				
			} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {}
			}
    }

  	React.useEffect(()=> {
  		fetchData();
  	},[fetchData])
	  React.useEffect(()=> {
		fetchclass();
	},[fetchclass])
	console.log(stdclass);
      return(
      <div classname="container">
		  <nav className={styles.navbar}>
        <h1>Wiingy</h1>
      </nav>
	  <br></br>
                <table className="table table-striped">
					<thead align="center">
						<th>Class_ID</th>
						<th>Name</th>
						<th>PPT Link</th>
						<th>Quiz Link</th>
						<th>Assigment</th>
                        {/* <th>Quiz Score</th>
                        <th>Assigment Score</th> */}
						<th>Status</th>
					</thead>	
                    <tbody>
                    	{stdData?.map((item,index)=>{
                    		return(<tr key={index}>
									
		                    			<td align="Center">
		                    				{item.Class_ID}
		                    			</td>
	                    			
	                    			
		                    			<td align="Center">
		                    				{item.Class_Name}
		                    			</td>
	                    			
									
		                    			<td align="Center">
		                    				<a href={item.PPT_Link}>Link</a>
		                    			</td>
	                    			
		                    			<td align="Center">
                                        <a href={item.Quiz_Link}>Link</a>
		                    			</td>
	                    			
		                    			<td align="Center">
		                    				{item.Assignment}
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
										<td align="Center">
                                        <input type="checkbox" 
										checked={stdclass.find(({ Class_ID }) => Class_ID === item.Class_ID)? true:false}
                                        onChange={()=>handleOnChangeCheck(item.Class_ID,stdclass.find(({ Class_ID }) => Class_ID === item.Class_ID)? false:true)}/>
										</td>	
	                    			
	                    			
                    		</tr>)
                    	})}
                    </tbody>
                </table>
      </div>
      );
      
};

export default ProductDetails;
