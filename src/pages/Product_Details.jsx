import React,{ useState } from "react";
import axios from "axios";
import "./StudentDetails.css";
import styles from "./styles.module.css";
import "./productdetail.css";
import { withAlert } from 'react-alert'
const ProductDetails =  ()=> {    
	const [stdData,setStdData] = React.useState([]);
    var PID=localStorage.getItem('PID');
    const data={Product_ID:PID};
    const [isChecked, setIsChecked] = useState(false);
	const fetchData = React.useCallback(() => {
		axios.post('https://tportal-server.herokuapp.com/ProductDetails',data).then((res)=>{
			console.log(res);
			setStdData(res.data);
		}).catch(err => console.log(err));
	},[])

    function handleOnChangeCheck(){
        setIsChecked(!isChecked);
        isChecked?alert('Updated Successfully'):alert('Updated Successfully')
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
						<th>Class_ID</th>
						<th>Name</th>
						<th>PPT Link</th>
						<th>Quiz Link</th>
						<th>Assigment</th>
                        <th>Quiz Score</th>
                        <th>Assigment Score</th>
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
                                        <td align="Center">
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
                                        </td>       
										<td align="Center">
                                        <input type="checkbox" 
                                        checked={isChecked}
                                        onChange={handleOnChangeCheck}/>
										</td>	
	                    			
	                    			
                    		</tr>)
                    	})}
                    </tbody>
                </table>
      </div>
      );
      
};

export default ProductDetails;
