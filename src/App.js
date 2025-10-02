import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import "./styles/Auth.css";


export default function App(){
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(()=> JSON.parse(localStorage.getItem('cart')||'[]'));
  const [user, setUser] = useState(()=> JSON.parse(localStorage.getItem('currentUser')||'null'));
  const navigate = useNavigate();

  useEffect(()=>{
    // load product data
    import('./data/products').then(m=> setProducts(m.default));
  },[]);

  useEffect(()=> localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  useEffect(()=> localStorage.setItem('currentUser', JSON.stringify(user)), [user]);

  const addToCart = (product, qty=1) => {
    setCart(prev=>{
      const exists = prev.find(p=>p.id===product.id);
      if(exists) return prev.map(p=> p.id===product.id? {...p, qty: p.qty+qty}: p);
      return [...prev, {...product, qty}];
    });
  };

  const removeFromCart = (id) => setCart(prev=> prev.filter(p=>p.id!==id));
  const updateQty = (id, qty) => setCart(prev=> prev.map(p=> p.id===id? {...p, qty}: p));
  const clearCart = ()=> setCart([]);

  const logout = ()=> {
    setUser(null);
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div className="app">
      <Navbar cartCount={cart.reduce((s,p)=>s+p.qty,0)} user={user} logout={logout}/>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home products={products} addToCart={addToCart}/>}/>
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart}/>}/>
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQty={updateQty}/>}/>
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} user={user}/>}/>
          <Route path="/login" element={<Login setUser={setUser}/>}/>
          <Route path="/register" element={<Register setUser={setUser}/>}/>
          <Route path="/orders" element={<Orders />}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}