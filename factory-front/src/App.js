import React,{ useState, useEffect } from "react";
import './App.css';
import Axios from 'axios'

function App() {

  const [Name, setName] = useState("")
  const [Address, setAddress] = useState("")
  // const [Phonenumber, setPhonenumber] = useState("")
  const [Email, setEmail] = useState("")
  const [List,setList] = useState([])

 const [Newname, setNewname] = useState("")

  useEffect(()=>{
    Axios.get("https://factory-details.herokuapp.com/").then((response)=>{
      setList(response.data);
    });
  },[])

  // const updateEmail = (id)=>{
  //   Axios.put('http://localhost:3001/api/update',{Email: newEmail, id:id}).then((response)=>{
  //     setList(List.map((val)=>{
  //       return val.Factory_id===id ? {Factory_id :val.Factory_id,Factory_name:val.Factory_name,location:val.location,/*phone_number:newPhonenumber,*/email:newEmail}:val
  //     }))
  //   } );
  //   };

  const updatename = (id) =>{
    Axios.put('https://factory-details.herokuapp.com/update',{
      Name:Newname,
      id:id
    });
  }

  const SubmitAdd = ()=>{
    Axios.post('https://factory-details.herokuapp.com/insert',{Name:Name, Address:Address, /*PhoneNumber:Phonenumber, */
    Email:Email});
    setList([...List,{Factory_name:Name,location:Address,/*phone_number:Phonenumber,*/email:Email}])
  };

  const deleteFactory = (id)=>{
    Axios.delete(`https://factory-details.herokuapp.com/delete/${id}`)
  }

  return (
    <div className="App">
      <h1>Factory Application</h1>
      <div className="form">
        <label>Factory Name:</label>
      <input
          type="text"
          name="Name"
          required="required"
          placeholder="Enter a name..."
          onChange={(e)=>{
            setName(e.target.value)
          }}
        />
        <label>Address:</label>
        <input
          type="text"
          name="Address"
          required="required"
          placeholder="Enter an addres..."
          onChange={(e)=>{
            setAddress(e.target.value)
          }}
        />
        {/* <label>phone Number:</label>
        <input
          type="text"
          name="Phonenumber"
          placeholder="Enter a phone number..."
          required="required"
          onChange={(e)=>{
            setPhonenumber(e.target.value)
          }}
           /> */}
        <label>Email:</label>
        <input
          type="email"
          name="Email"
          required="required"
          placeholder="Enter an email..."
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
        />
        <button type="submit" onClick={SubmitAdd}>Add</button>
          {List.map((val=>{
          return(
           <div className="card">
            <h1>Factory_Name:{val.Factory_name} </h1>
              <p> Address:{val.location}</p>
              {/* <p>PhoneNumber:{val.phone_number}</p> */}
              <p>Email:{val.email}</p>

              <button onClick={() => {deleteFactory(val.Factory_id)}}>Delete</button>


              <input type="text" id="updateInput" placeholder="update name.." onChange={(e)=>{
                setNewname(e.target.value);
              }}/>

              <button onClick={()=>{updatename(val.Factory_id)}}>Update</button>
             </div>
          )}))}

      </div>
    </div>
  );
}

export default App;
