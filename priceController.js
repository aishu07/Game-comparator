const { fetchPricesFromAPI } = require('../services/apiService');

const getGamePrices = async (req, res) => {
    const { gameName } = req.params;
    try {
        // Fetch game prices
        const prices = await fetchPricesFromAPI(gameName);
        console.log("Prices fetched:", prices);  // Log fetched prices

        // Map store IDs to store names (this is already done inside fetchPricesFromAPI)
        const enrichedPrices = prices.map((item) => {
            console.log(`Mapping Store ID: ${item.storeId} to Store Name: ${item.store}`);  // Log the mapping
            return {
                ...item,
                store: item.store || 'Unknown Store',  // If no match found, default to 'Unknown Store'
            };
        });

        res.status(200).json(enrichedPrices);
    } catch (error) {
        console.error('Error fetching game prices:', error);
        res.status(500).json({ error: 'Error fetching game prices' });
    }
};

module.exports = { getGamePrices };
