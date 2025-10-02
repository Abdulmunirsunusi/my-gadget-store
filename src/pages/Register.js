// import React, {useState} from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Register({setUser}){
//   const [form, setForm] = useState({name:'', email:'', password:''});
//   const nav = useNavigate();

//   const submit = (e)=>{
//     e.preventDefault();
//     const users = JSON.parse(localStorage.getItem('users')||'[]');
//     if(users.find(u=> u.email===form.email)) return alert('Email exists');
//     const user = {...form, id: 'u'+Date.now()};
//     users.push(user);
//     localStorage.setItem('users', JSON.stringify(users));
//     setUser(user);
//     localStorage.setItem('currentUser', JSON.stringify(user));
//     nav('/');
//   };

//   return (
//     <div className="auth">
//       <h2>Register</h2>
//       <form onSubmit={submit}>
//         <label>Name</label>
//         <input value={form.name} onChange={e=> setForm({...form, name:e.target.value})}/>
//         <label>Email</label>
//         <input value={form.email} onChange={e=> setForm({...form, email:e.target.value})}/>
//         <label>Password</label>
//         <input type="password" value={form.password} onChange={e=> setForm({...form, password:e.target.value})}/>
//         <button className="btn" type="submit">Register</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = { name, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        />
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Create a password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Register</button>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Register;
