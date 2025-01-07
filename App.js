import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [gameName, setGameName] = useState('');
    const [prices, setPrices] = useState([]);
    const [error, setError] = useState(null); // To handle errors

    // Function to decode store name from URL encoding
    const decodeStoreName = (storeName) => {
        try {
            const decoded = decodeURIComponent(storeName);
            return decoded;
        } catch (err) {
            console.error("Error decoding store name:", err);
            return storeName; // Fallback to the raw store name
        }
    };

    // Fetch prices from API
    const fetchPrices = async (gameName) => {
        setError(null); // Clear any previous error
        try {
            const response = await fetch(`http://localhost:5000/api/prices/${gameName}`);
            if (!response.ok) {
                throw new Error('Failed to fetch prices. Please try again later.');
            }
            const data = await response.json();

            // Decode the store names properly
            const decodedData = data.map((item) => ({
                ...item,
                store: decodeStoreName(item.store),
            }));

            setPrices(decodedData);
        } catch (error) {
            console.error('Error fetching prices:', error);
            setError(error.message); // Set error message
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (gameName.trim()) {
            fetchPrices(gameName.trim());
        }
    };

    return (
        <div className="fade-in">
            <div className="overlay"></div>
            <div className="container">
                <h1 className="text-center mb-4 text-white neon-text">Game Price Comparison</h1>
                <form onSubmit={handleSubmit} className="mb-4 d-flex justify-content-center">
                    <div className="input-group" style={{ maxWidth: '600px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter game name (e.g., FIFA)"
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </form>
                {error && <p className="text-center text-danger">{error}</p>}
                <div className={`row ${prices.length === 1 ? 'single-card' : ''}`}>
                    {prices.length === 0 && !error ? (
                        <p className="text-center text-white">No results found.</p>
                    ) : (
                        prices.map((item, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <div className="card h-100 neon-card">
                                    <img
                                        src={item.thumb}
                                        className="card-img-top"
                                        alt={item.title}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">Store: {item.store}</p>
                                        <p className="card-text">Price: ${item.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
