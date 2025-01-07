const axios = require('axios');

// Fetch all store information from CheapShark API
const fetchStoresFromAPI = async () => {
    const API_URL = 'https://www.cheapshark.com/api/1.0/stores';
    const response = await axios.get(API_URL);
    if (response.data && response.data.length > 0) {
        // Map store data to a dictionary for quick lookups by store ID
        const storeMap = {};
        response.data.forEach(store => {
            storeMap[store.storeID] = store.storeName;
        });
        return storeMap;
    }
    throw new Error('Failed to fetch store data');
};

// Fetch prices from CheapShark API and decode store names
const fetchPricesFromAPI = async (gameName) => {
    try {
        const storeMap = await fetchStoresFromAPI();  // Fetch store data
        
        const API_URL = `https://www.cheapshark.com/api/1.0/games?title=${gameName}`;
        const response = await axios.get(API_URL);
        
        // If no data returned, throw an error
        if (!response.data || response.data.length === 0) {
            throw new Error('No prices found for this game.');
        }

        // Map prices and decode store names
        const prices = response.data.map((item) => ({
            title: item.external,  // Title of the game (e.g., "FIFA 20 (XBOX)")
            storeId: item.storeID,  // Store ID to map to the store name
            store: storeMap[item.storeID] || "Unknown Store",  // Get store name from map
            price: item.cheapest,  // Price of the game
            thumb: item.thumb,  // Thumbnail image of the game
        }));

        return prices;  // Return the formatted prices with store names
    } catch (error) {
        console.error('Error fetching data from CheapShark:', error);
        throw new Error("Failed to fetch prices. Please try again later.");
    }
};

module.exports = { fetchPricesFromAPI };
