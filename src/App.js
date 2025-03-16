import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import awsExports from './aws-exports';
import { createToy, deleteToy } from './graphql/mutations';
import { listToys } from './graphql/queries';

// Configure Amplify
Amplify.configure(awsExports);

// Generate GraphQL client
const client = generateClient();

function App() {
  const [toys, setToys] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchToys();
  }, []);

  const fetchToys = async () => {
    try {
      const toyData = await client.graphql({ query: listToys });
      setToys(toyData.data.listToys.items);
    } catch (error) {
      console.error('Error fetching toys:', error);
      setMessage('Failed to load toys. Try again!');
    }
  };

  const addToy = async () => {
    if (!name || !price) {
      setMessage('Please enter both name and price!');
      return;
    }
    try {
      const toy = { name, price: parseFloat(price), id: Date.now().toString() };
      await client.graphql({ query: createToy, variables: { input: toy } });
      setName('');
      setPrice('');
      fetchToys();
      setMessage('Toy added successfully!');
      setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
    } catch (error) {
      console.error('Error adding toy:', error);
      setMessage('Failed to add toy. Try again!');
    }
  };

  const removeToy = async (id) => {
    try {
      await client.graphql({ query: deleteToy, variables: { input: { id } } });
      fetchToys();
      setMessage('Toy removed successfully!');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error('Error removing toy:', error);
      setMessage('Failed to remove toy. Try again!');
    }
  };

  const clearAllToys = async () => {
    if (toys.length === 0) {
      setMessage('No toys to clear!');
      return;
    }
    try {
      await Promise.all(toys.map((toy) => removeToy(toy.id)));
      setMessage('All toys cleared successfully!');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error('Error clearing toys:', error);
      setMessage('Failed to clear toys. Try again!');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to ToyShop! 🎉</h1>
      {message && <p style={styles.message}>{message}</p>}
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Toy Name"
        />
        <input
          style={styles.input}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
        />
        <button style={styles.button} onClick={addToy}>
          Add Toy
        </button>
      </div>
      <button style={styles.clearButton} onClick={clearAllToys}>
        Clear All Toys
      </button>
      <ul style={styles.list}>
        {toys.length === 0 ? (
          <li style={styles.noToys}>No toys available. Add some!</li>
        ) : (
          toys.map((toy) => (
            <li key={toy.id} style={styles.toyItem}>
              <span style={styles.toyName}>{toy.name}</span> -- $
              {toy.price.toFixed(2)}
              <button
                style={styles.removeButton}
                onClick={() => removeToy(toy.id)}
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

// Inline Styles for Engagement
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '20px',
  },
  message: {
    textAlign: 'center',
    color: '#27ae60',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    flex: '1',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  clearButton: {
    padding: '8px 16px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  noToys: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  toyItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '4px',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  toyItemHover: {
    transform: 'scale(1.02)',
  },
  toyName: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  removeButton: {
    padding: '4px 10px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default App;