import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Box, Button } from '@mui/material';
import axios from 'axios';

interface Order {
  id: number;
  address: string;
  city: string;
  postalCode: string;
  totalAmount: number;
  created_at: string;
}

const Order = ({ user }: { user: any }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/orders/${user.id}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.id]);


  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Orders for {user?.username}
      </Typography>
      
      <Divider sx={{ marginBottom: '20px' }} />

      <Typography variant="h6" gutterBottom>
        My Orders
      </Typography>

      {loading ? (
        <Typography>Loading orders...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : orders.length === 0 ? (
        <Typography>No orders yet.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
          <Table aria-label="Orders Table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid #ccc' }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Order Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell sx={{ borderRight: '1px solid #ccc' }}>{order.id}</TableCell>
                  <TableCell>{order.address} {order.city} {order.postalCode}</TableCell>
                  <TableCell>Rs {order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {order.totalAmount > 100 ? 'Completed' : 'Pending'}
                  </TableCell>
                  <TableCell>
                    <Button variant='outlined' size='small' color='info'> Track Order</Button>
                  </TableCell>
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
