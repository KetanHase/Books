import React from 'react';
import { Typography } from '@mui/material';

const Order = ({ user }: { user: any }) => {
  return (
    <div>
      <Typography variant="h4">Orders for {user?.username}</Typography>
      {/* Display user's past orders */}
    </div>
  );
};

export default Order;
