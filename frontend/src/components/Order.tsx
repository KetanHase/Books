import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Box } from '@mui/material';
import axios from 'axios';

interface Order {
  order_id: number;
  address: string;
  city: string;
  postal_code: string;
  total_amount: number;
  order_date: string;
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

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Orders for {user?.username}
      </Typography>
      
      <Divider sx={{ marginBottom: '20px' }} />

      <Typography variant="h6" gutterBottom>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders yet.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
          <Table aria-label="Orders Table">
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: 'bold',borderRight: '1px solid #ccc'}}>Order ID</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Address</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Total Amount</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Order Date</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Status</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell sx={{borderRight: '1px solid #ccc'}}>{order.order_id}</TableCell>
                  <TableCell>{order.address} {order.city} {order.postal_code}</TableCell>
                  <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                  <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {order.total_amount > 100 ? 'Completed' : 'Pending'}
                  </TableCell>
                  <TableCell> Buttons (Track Orders )</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Order;
