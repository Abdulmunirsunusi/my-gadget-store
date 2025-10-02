import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'

export default function Home({products, addToCart}){
  return (
    <div>
      <h1>Products</h1>
      <div className="grid">
        {products.map(p=> (
          <div key={p.id} className="card">
            <div className="thumb">{p.img? <img src={p.img} alt={p.title} className="thumbImg"/> : <div className="placeholder">Image</div>}</div>
            <h3>{p.title}</h3>
            <p className="price">${p.price.toFixed(2)}</p>
            <p className="desc">{p.desc}</p>
            <div className="card-actions">
              <Link to={`/product/${p.id}`} className="btn">Details</Link>
              <button className="btn outline" onClick={()=> addToCart(p)}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}