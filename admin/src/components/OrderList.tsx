import React ,{useEffect, useState}from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

interface Order {
  id: number;
  address: string;
  city: string;
  postalCode: string;
  totalAmount: number;
  created_at: string;
}
const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8081/admin/orders');
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

   
   
  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Order List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Ship To</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>{order.city}</TableCell>
              <TableCell>{order.postalCode}</TableCell>
              <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
              <TableCell>{ order.created_at }</TableCell>
             
         
                {/*<TableCell>
                  <Select
                    
                    value={order.status}
                    
                    variant="outlined"
                    fullWidth
                    sx={{ width: '80px', height: '30px', fontSize: 12 }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                  </Select>
                </TableCell>*/}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderList;
