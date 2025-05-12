const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Removed duplicate require statement for 'express'
// Removed duplicate require statement for 'cors'

const app = express();

// Allow all CORS requests
app.use(cors());


// const app = express();
const PORT = 5000;

// app.use(cors());

app.get('/proxy', async (req: any, res: any) => {
    try {
        const url = req.query.url as string;

        if (!url) {
            return res.status(400).send('URL is required');
        }

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1'
            }
        });

        // Modify content to make resources load correctly
        let modifiedContent = response.data
            .replace(/<head>/i, `<head>
        <base href="${url}" />
        <style>
          body { 
            transform: scale(0.9); 
            transform-origin: top left; 
          }
        </style>`)
            .replace(/(href="|src=")/gi, `$1${new URL(url).origin}/`);

        // res.send(modifiedContent);

        res.send(response.data);
    } catch (error) {
        console.error('Proxy error:', error);
        console.log('Proxy error:', error);
        res.status(500).send('Error fetching website');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});

