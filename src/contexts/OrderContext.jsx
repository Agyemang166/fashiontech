import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../services/firebaseConfig'; // Firestore configuration
import { collection, query, onSnapshot, orderBy, limit, startAfter, where } from 'firebase/firestore';
import { useCurrentUser } from './userContext'; // Import user context

const OrdersContext = createContext();

export const useOrders = () => {
  return useContext(OrdersContext);
};

export const OrdersProvider = ({ children }) => {
  const { currentUser } = useCurrentUser(); // Get the current user
  const [orders, setOrders] = useState([]); // State to hold orders
  const [loading, setLoading] = useState(true); // Loading state
  const [lastVisible, setLastVisible] = useState(null); // Track last visible document for pagination
  const [hasMore, setHasMore] = useState(true); // Track if more orders are available

  // Fetch orders function
  const fetchOrders = async (firstLoad = true) => {
    if (!currentUser) {
      setOrders([]); // Reset orders if there's no user
      setLoading(false); // Set loading to false
      return;
    }

    // Reference to the 'orders' collection in Firestore
    const ordersRef = collection(db, 'orders');
    
    // Query to fetch orders where the userId matches the current logged-in user's ID
    const q = query(
      ordersRef,
      where('userId', '==', currentUser.id), // Fetch only orders for the logged-in user
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() }); // Add order data to array
      });

      if (firstLoad) {
        setOrders(fetchedOrders); // Update state with fetched orders on first load
      } else {
        setOrders((prevOrders) => [...prevOrders, ...fetchedOrders]); // Append to existing orders
      }

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Track last visible document
      setLoading(false); // Set loading to false
      setHasMore(fetchedOrders.length > 0); // Update hasMore state based on fetched orders
    }, (error) => {
      console.error('Error fetching orders: ', error);
      setLoading(false); // Set loading to false on error
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  };

  // Load more orders function
  const loadMoreOrders = async () => {
    if (!lastVisible || !currentUser) return; // Exit if no more orders to load or no user

    // Reference to the 'orders' collection in Firestore
    const ordersRef = collection(db, 'orders');
    
    // Query to fetch next set of orders for the current user, ordered by 'createdAt'
    const q = query(
      ordersRef,
      where('userId', '==', currentUser.id), // Fetch only orders for the logged-in user
      orderBy('createdAt', 'desc'),
      startAfter(lastVisible), // Start after the last fetched order for pagination
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() }); // Add order data to array
      });

      setOrders((prevOrders) => [...prevOrders, ...fetchedOrders]); // Append to existing orders
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Update last visible
      setHasMore(fetchedOrders.length > 0); // Update hasMore state
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  };

  useEffect(() => {
    fetchOrders(); // Initial fetch of orders
  }, [currentUser]);

  return (
    <OrdersContext.Provider value={{ orders, loading, loadMoreOrders, hasMore }}>
      {children}
    </OrdersContext.Provider>
  );
};
