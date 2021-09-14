import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

function Login(){
  const history=useHistory();
  const [user,setuser]=useState({
    email:"",password:""
  })
  
  function handleinput(event){
    const name=event.target.name;
    const value=event.target.value;
    setuser({...user,[name]:value});
    console.log(event);
  }

 async function handleclick(event){
  event.preventDefault();
  const {email,password}=user;
  const res= await fetch("/Login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      email:email,password:password
    })
  })
  const data=await res.json();
  
  if(res.status === 422 || res.status === 400 || !data){
    window.alert("Invalid User");
  }
  else{
    window.alert("Login succesfully");
    history.push("/");
  }
  }

  return(
    <div>
    <div class="container">
          <div class="row">
            <div class="col col-lg-6 col-sm-12 logo">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80"
               alt="image" width="700" height="350" />
            </div>
            <div class="col col-lg-6 col-sm-12">
            <div className="text-center form1" >
             <form className="form-signin " method="POST">
               <h1 className="h3 mb-3 font-weight-normal">LOGIN</h1>
               <div className="inputform">
               <input type="email" onChange={handleinput} name="email" value={user.email} id="inputEmail" className="form-control " placeholder="Email address" required autofocus />
               <input type="password" onChange={handleinput} name="password" value={user.password} id="password" className="form-control " placeholder="Password" required />
               </div>
               <br></br>
               <button className="btn btn-lg  btn-secondary btn-block inputform" style={{"background-color": "#61acb3"}} onClick={handleclick} type="submit">LogIn</button>
             </form>
             </div>
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default Login;