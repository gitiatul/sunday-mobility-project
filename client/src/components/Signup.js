import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';


function Signup(){
  const history=useHistory();

  const [user,setuser]=useState({
    name:"",email:"",phone:"" ,work:"",password:"",cpassword:""
  })

  function handleinput(event){
   const {name,value}=event.target;
   setuser({...user,[name]:value});
  }

  async function handleclick(event){
    event.preventDefault();
      const {name,email,phone,work,password,cpassword}=user;
      const res= await fetch("/Signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:name,email:email,phone:phone,work:work,password:password,cpassword:cpassword
        })
      })
      await res.json();
      
      if(res.status === 422 ){
        window.alert("Invalid Registration");
      }
      else {
        window.alert("Registration successfull");
        console.log("Registration successfull");
        history.push("/Login");
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
              <form className="form-signin" method="POST">
                <h1 className="h3 mb-3 font-weight-normal">Signup</h1>
                <input type="text" id="name" onChange={handleinput} name="name" value={user.name} className="form-control inputform" placeholder="Name" required/>
                <input pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"  id="inputEmail" onChange={handleinput} name="email" value={user.email} className="form-control inputform" placeholder="Email address" required />
                <input type="text" id="phone" maxlength="10" title="Error Message" pattern="[1-9]{1}[0-9]{9}" onChange={handleinput} name="phone" value={user.phone} className="form-control inputform" placeholder="Phone Number" required />
                <input type="text" id="work" onChange={handleinput} name="work" value={user.work} className="form-control inputform" placeholder="Work" required />
                <input type="password" id="password" onChange={handleinput} name="password" value={user.password} className="form-control inputform" placeholder="Password" required />
                <input type="password" id="cPassword" onChange={handleinput} name="cpassword" value={user.cpassword} className="form-control inputform" placeholder="Confirm Password" required />
                <br></br>
                <button className="btn btn-lg btn-secondary btn-block inputform" onClick={handleclick} style={{"background-color": "#61acb3"}} type="submit">SignUp</button>
              </form>
            </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Signup;