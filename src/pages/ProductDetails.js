import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails({addToCart}){
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(()=> {
    import('../data/products').then(m=>{
      const found = m.default.find(p=>p.id===id);
      setProduct(found);
    });
  },[id]);

  if(!product) return <div>Loading...</div>;
  return (
    <div className="product-detail">
      <div className="thumb large">{product.img? <img src={product.img} alt={product.title}/> : <div className="placeholder large">Image</div>}</div>
      <div className="info">
        <h2>{product.title}</h2>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.desc}</p>
        <div className="qty-row">
          <label>Qty:</label>
          <input type="number" min="1" value={qty} onChange={e=> setQty(Number(e.target.value))}/>
        </div>
        <button className="btn" onClick={()=> addToCart(product, qty)}>Add to cart</button>
      </div>
    </div>
  );
}
