import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './NavBar';
import axios from 'axios';
import '../Cards1.css';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://ecothread-backend.vercel.app',
  withCredentials: true,
});

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // First verify the user is authenticated
        await api.get('/auth/verify');
        
        // Then fetch items
        const response = await api.get('/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
        if (error.response?.status === 401) {
          // Redirect to login or show message
          window.location.href = '/login';
        }
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <Navbar />
      <div className="items-container">
        <div className="items-list">
          {items.map((item) => (
            <div key={item._id} className="item-box">
              <img 
                src={`https://ecothread-backend.vercel.app${item.imageUrl}`} 
                alt={item.title} 
                className="item-image" 
              />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p>Size: {item.size}</p>
                <p>Condition: {item.condition}</p>
                <p>Preferences: {item.preferences}</p>
                <p><strong>Created By:</strong> {item.createdBy?.username || "Unknown"}</p>
                <p><strong>Email:</strong> {item.createdBy?.email || "Unknown"}</p>
                <Link to={`/item/${item._id}`}>
                  <button className="view-item-button">View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Items;