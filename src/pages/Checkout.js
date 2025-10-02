import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Checkout({cart, clearCart, user}){
  const navigate = useNavigate();
  const [details, setDetails] = useState({name: user?.name||'', address:'', phone:''});

  const subtotal = cart.reduce((s,p)=> s + p.price * p.qty, 0);

  const placeOrder = ()=>{
    if(cart.length===0) return alert('Cart empty');
    const orders = JSON.parse(localStorage.getItem('orders')||'[]');
    const order = { id: 'o'+Date.now(), items: cart, total: subtotal, details, date: new Date().toISOString() };
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    clearCart();
    alert('Order placed!');
    navigate('/orders');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div className="order-preview">
        <h3>Order preview</h3>
        {cart.map(i=> (
          <div key={i.id} className="order-row">
            <div>{i.title} x {i.qty}</div>
            <div>${(i.price * i.qty).toFixed(2)}</div>
          </div>
        ))}
        <p className="total">Total: ${subtotal.toFixed(2)}</p>
      </div>

      <div className="form">
        <label>Name</label>
        <input value={details.name} onChange={e=> setDetails({...details, name: e.target.value})}/>
        <label>Address</label>
        <input value={details.address} onChange={e=> setDetails({...details, address: e.target.value})}/>
        <label>Phone</label>
        <input value={details.phone} onChange={e=> setDetails({...details, phone: e.target.value})}/>
        <button className="btn" onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
}