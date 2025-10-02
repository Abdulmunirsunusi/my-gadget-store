import React, { useState, useEffect } from "react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handlePlaceOrder = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      products: cart,
      total: cart.reduce(
        (sum, item) => sum + (item?.price ? Number(item.price) * (item?.quantity || 1) : 0),
        0
      ),
      date: new Date().toLocaleString(),
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    localStorage.removeItem("cart");

    window.dispatchEvent(new Event("ordersUpdated"));
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Order placed successfully!");
  };

  const handleClearOrders = () => {
    localStorage.removeItem("orders");
    setOrders([]);
    window.dispatchEvent(new Event("ordersUpdated"));
    alert("All orders cleared!");
  };

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      <div className="order-buttons">
        <button onClick={handlePlaceOrder} className="place-order-btn">
          Place Order
        </button>
        <button onClick={handleClearOrders} className="clear-order-btn">
          Clear Orders
        </button>
      </div>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order #{order.id}</h3>
              <p>
                <strong>Date:</strong> {order.date}
              </p>
              <p>
                <strong>Total:</strong> $
                {order?.total ? Number(order.total).toFixed(2) : "0.00"}
              </p>
              <ul>
                {order.products && order.products.length > 0 ? (
                  order.products.map((item, idx) => (
                    <li key={idx}>
                      {item?.name || "Unknown Product"} (x{item?.quantity || 1}) - $
                      {item?.price ? Number(item.price).toFixed(2) : "0.00"}
                    </li>
                  ))
                ) : (
                  <li>No products found</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
