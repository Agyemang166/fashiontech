import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Paper, Divider } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

// Define your truck icon or use a default one from leaflet
import L from 'leaflet';
const truckIcon = new L.Icon({
  iconUrl: 'https://png.pngtree.com/png-vector/20240131/ourmid/pngtree-small-cargo-truck-png-png-image_11574572.png',
  iconSize: [30, 30],
});

const Order = () => {
  // Example order data
  const order = {
    orderId: '123456789',
    status: 'Shipped',
    trackingNumber: 'TRACK123456',
    trackingUrl: 'https://www.example.com/track',
    items: [
      {
        id: 1,
        name: 'Floral Summer Dress',
        quantity: 1,
        price: 29.99,
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Cotton T-Shirt',
        quantity: 2,
        price: 19.99,
        image: 'https://via.placeholder.com/150',
      },
    ],
    estimatedDelivery: 'September 30, 2024',
    subtotal: 69.97,
    tax: 5.00,
    shipping: 7.99,
    total: 82.96,
  };

  // Example truck data
  const deliveryTrucks = [
    { id: 1, name: 'Truck 1', position: [6.692, -1.570] },
  ];

  return (
    <Box sx={{ padding: 3, maxWidth: '900px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: 2 }}>
      {/* Order Header */}
      <Card variant="outlined" sx={{ padding: 2, marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            Order Details
          </Typography>
          <Typography variant="body1">Order ID: {order.orderId}</Typography>
          <Typography variant="body1" color="text.secondary">
            Status: {order.status}
          </Typography>
          <Typography variant="body1">
            Tracking Number: 
            <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '5px', textDecoration: 'underline', color: '#0073e6' }}>
              {order.trackingNumber}
            </a>
          </Typography>
          <Typography variant="body1">Estimated Delivery: {order.estimatedDelivery}</Typography>
        </CardContent>
      </Card>

      {/* Items Section */}
      <Box sx={{ backgroundColor: '#ffffff', borderRadius: 2, padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Items in Your Order
        </Typography>

        <Grid container spacing={2}>
          {order.items.map(item => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Paper elevation={2} sx={{ padding: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '120px', height: 'auto', borderRadius: '5px' }}
                  />
                  <Box sx={{ marginLeft: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ margin: '10px 0' }}>
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000' }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Order Summary Section */}
      <Box sx={{ backgroundColor: '#ffffff', borderRadius: 2, padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Order Summary
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 1 }}>
          <Typography variant="body1">Subtotal:</Typography>
          <Typography variant="body1">${order.subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 1 }}>
          <Typography variant="body1">Shipping:</Typography>
          <Typography variant="body1">${order.shipping.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 1 }}>
          <Typography variant="body1">Tax:</Typography>
          <Typography variant="body1">${order.tax.toFixed(2)}</Typography>
        </Box>
        <Divider sx={{ margin: '10px 0' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>${order.total.toFixed(2)}</Typography>
        </Box>
      </Box>

      {/* Customer Service Button */}
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Button variant="contained" color="primary" sx={{ padding: '10px 40px', borderRadius: 50, fontWeight: 'bold', fontSize: '16px' }}>
          Contact Customer Service
        </Button>
      </Box>

      {/* Map Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Delivery Truck Location
        </Typography>
        <MapContainer 
          center={[6.692, -1.570]}  // Center the map on Kumasi, Ghana
          zoom={13} 
          style={{ height: '500px', width: '100%' }}  // Adjust height as needed
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          
          {/* Render truck markers on the map */}
          {deliveryTrucks.map(truck => (
            <Marker key={truck.id} position={truck.position} icon={truckIcon}>
              <Popup>{truck.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default Order;
