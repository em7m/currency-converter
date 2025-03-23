require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({ origin: '*' }));

const CURRENCY_API_KEY = process.env.CURRENCY_API_KEY;
const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";
//test route 
app.get('/exchange-rates/:currency', async (req, res) => {
    try {
        const { currency } = req.params;
        const response = await fetch(`${BASE_URL}${currency}`);
        const data = await response.json();
        console.log("API Response:", data);
        res.json(data.rates);   
    } catch(error) {
        console.error("Error fetching exchange rates", error);
        res.status(500).json({ error: 'Failed to fetch exchange rates'});
    }
});
    

app.listen(port, () => console.log(`App listening on port ${port}`));
