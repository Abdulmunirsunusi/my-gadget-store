// import React, {useState} from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Login({setUser}){
//   const [form, setForm] = useState({email:'', password:''});
//   const nav = useNavigate();

//   const submit = (e)=>{
//     e.preventDefault();
//     const users = JSON.parse(localStorage.getItem('users')||'[]');
//     const found = users.find(u=> u.email === form.email && u.password === form.password);
//     if(!found) return alert('Invalid credentials');
//     setUser(found);
//     localStorage.setItem('currentUser', JSON.stringify(found));
//     nav('/');
//   };

//   return (
//     <div className="auth">
//       <h2>Login</h2>
//       <form onSubmit={submit}>
//         <label>Email</label>
//         <input value={form.email} onChange={e=> setForm({...form, email:e.target.value})}/>
//         <label>Password</label>
//         <input type="password" value={form.password} onChange={e=> setForm({...form, password:e.target.value})}/>
//         <button className="btn" type="submit">Login</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("isLoggedIn", true);
      navigate("/");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Enter your password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Login</button>
        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
