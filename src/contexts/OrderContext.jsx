import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../services/firebaseConfig'; // Firestore configuration
import { collection, query, onSnapshot, orderBy, limit, startAfter } from 'firebase/firestore';
import { useCurrentUser } from './userContext'; // Import user context

const OrdersContext = createContext();

export const useOrders = () => {
  return useContext(OrdersContext);
};

export const OrdersProvider = ({ children }) => {
  const { currentUser } = useCurrentUser(); // Get the current user
  const [orders, setOrders] = useState([]); // State to hold user orders
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

    const ordersRef = collection(db, 'users', currentUser.id, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(10)); // Fetch latest 10 orders

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() }); // Add order data to array
      });

      if (firstLoad) {
        setOrders(fetchedOrders); // Update state with fetched orders on first load
      } else {
        setOrders(prevOrders => [...prevOrders, ...fetchedOrders]); // Append to existing orders
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
    if (!lastVisible) return; // Exit if no more orders to load

    const ordersRef = collection(db, 'users', currentUser.id, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(10)); // Fetch next set of orders

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() }); // Add order data to array
      });

      setOrders(prevOrders => [...prevOrders, ...fetchedOrders]); // Append to existing orders
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
