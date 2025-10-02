import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Cart({cart, removeFromCart, updateQty}){
  const navigate = useNavigate();
  const subtotal = cart.reduce((s,p)=> s + p.price * p.qty, 0);
  if(cart.length===0) return <div><h2>Your cart is empty</h2><Link to="/">Continue shopping</Link></div>;
  return (
    <div>
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cart.map(item=> (
          <div className="cart-item" key={item.id}>
            <div className="thumb small">{item.img? <img src={item.img} className="thumbImg"/> : <div className="placeholder small">Img</div>}</div>
            <div className="meta">
              <h4>{item.title}</h4>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="controls">
              <input type="number" min="1" value={item.qty} onChange={e=> updateQty(item.id, Number(e.target.value))}/>
              <button className="btn outline" onClick={()=> removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-box">
        <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
        <button className="btn" onClick={()=> navigate('/checkout')}>Proceed to checkout</button>
      </div>
    </div>
  );
}