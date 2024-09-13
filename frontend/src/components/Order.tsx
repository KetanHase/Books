import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';


interface Order {
  order_id: number;
  address: string;
  city: string;
  postal_code: string;
  total_amount: number;
  order_date: string;
}

interface OrdersProps {
  userId: number;
}

const mockOrders = [
  {
    order_id: 1,
    address: '123 Main St',
    city: 'Anytown',
    postal_code: '12345',
    total_amount: 100.99,
    order_date: '2022-01-01T12:00:00.000Z'
  },
  {
    order_id: 2,
    address: '456 Elm St',
    city: 'Othertown',
    postal_code: '67890',
    total_amount: 50.00,
    order_date: '2022-01-05T14:30:00.000Z'
  },
  {
    order_id: 3,
    address: '789 Oak St',
    city: 'Thistown',
    postal_code: '34567',
    total_amount: 200.00,
    order_date: '2022-01-10T10:00:00.000Z'
  },
  {
    order_id: 4,
    address: '321 Pine St',
    city: 'That-town',
    postal_code: '90123',
    total_amount: 75.50,
    order_date: '2022-01-12T16:45:00.000Z'
  }
];


const Order = ({ user }: { user: any }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulate API call with mock data
    setOrders(mockOrders);
  }, []);
  {/*useEffect(() => {
    axios.get(`http://localhost:8081/orders/${userId}`)
      .then(response => {
        setOrders(response.data.orders);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, [userId]);*/}
  return (
    <div>
      <Typography variant="h4">Orders for {user?.username}</Typography>
            
            <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.order_id}>
              <div>Order ID: {order.order_id}</div>
              <div>Address: {order.address}, {order.city}, {order.postal_code}</div>
              <div>Total Amount: ${order.total_amount}</div>
              <div>Order Date: {new Date(order.order_date).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Order;
