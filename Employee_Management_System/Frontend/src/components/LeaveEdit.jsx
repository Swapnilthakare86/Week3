import { useState,useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

function LeaveEdit(){

const {id} = useParams();
const navigate = useNavigate();

const [form,setForm] = useState({
start_date:"",
end_date:"",
reason:""
});

useEffect(()=>{
axios.get(`http://localhost:3000/api/leave/${id}`)
.then(res=>{
setForm(res.data);
});
},[id]);


const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};


const handleSubmit=async(e)=>{
e.preventDefault();

await axios.put(
`http://localhost:3000/api/leave/${id}`,
form
);

alert("Leave Updated");

navigate("/leave-list");

};


return(

<div className="container mt-4">

<h3>Edit Leave</h3>

<form onSubmit={handleSubmit}>

<div className="mb-3">
<label>Start Date</label>
<input
type="date"
name="start_date"
value={form.start_date}
onChange={handleChange}
className="form-control"
/>
</div>

<div className="mb-3">
<label>End Date</label>
<input
type="date"
name="end_date"
value={form.end_date}
onChange={handleChange}
className="form-control"
/>
</div>

<div className="mb-3">
<label>Reason</label>
<textarea
name="reason"
value={form.reason}
onChange={handleChange}
className="form-control"
/>
</div>

<button className="btn btn-success">
Update Leave
</button>

</form>

</div>

);

}

export default LeaveEdit;