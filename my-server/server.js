const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const config = require('./config');

app.use(cors());

const PORT = 8080;

app.get('/cryptocurrency/listings/latest-with-logos', async (req, res) => {
  try {
    const latestResponse = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': config.apiKey,
        },
        params: req.query,
      }
    );

    const cryptos = latestResponse.data.data;
    const cryptoIds = cryptos.map((crypto) => crypto.id);

    const infoResponse = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
      {
        headers: {
          'X-CMC_PRO_API_KEY': config.apiKey,
        },
        params: { id: cryptoIds.join(',') },
      }
    );

    const infoData = infoResponse.data.data;

    const cryptosWithLogos = cryptos.map((crypto) => {
      return {
        ...crypto,
        logo: infoData[crypto.id].logo,
      };
    });

    res.send({ data: cryptosWithLogos });
  } catch (ex) {
    console.error(ex);
    res.status(500).send({ message: 'Error fetching data from CoinMarketCap' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost/:${PORT}`);
});
