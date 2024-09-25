import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Collapse from '@mui/material/Collapse';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { Link } from 'react-router-dom';


export const SidebarListItems = () => {
  const [openOrders, setOpenOrders] = React.useState(false);
  const [openCustomers, setOpenCustomers] = React.useState(false);

  const handleOrdersClick = () => {
    setOpenOrders(!openOrders);
  };

  const handleCustomersClick = () => {
    setOpenCustomers(!openCustomers);
  };

  return (
    <React.Fragment>
      <ListItemButton component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
         <ListItemText primary="Dashboard" /> 
      </ListItemButton>

      <ListItemButton onClick={handleOrdersClick}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
        {openOrders ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openOrders} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
             <AddIcon />
          </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
             <ListOutlinedIcon />
          </ListItemIcon>
            <ListItemText primary="List" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleCustomersClick}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
        {openCustomers ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCustomers} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="New Customers" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Returning Customers" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton component={Link} to="/category">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Category" /> 
      </ListItemButton>

      <ListItemButton component={Link} to="/book">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Book" /> 
      </ListItemButton>

      <ListItemButton component={Link} to="/language">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Language" /> 
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>

      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItemButton>
    </React.Fragment>
  );
};