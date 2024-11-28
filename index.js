require('dotenv').config();
const express = require('express');
const connectDB = require('./DB');
const shortner = require('./routes/shortner');
const urlSchema = require('./modles/url.modles');


const app = express();
app.use(express.json());

connectDB();

app.use('/api/shortner', shortner);


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/:urlname', async (req, res) => {
    const { urlname } = req.params;
    console.log(urlname);
    const urldoc = await urlSchema.findOne({ nameUrl: urlname });
    if(!urldoc) {
        res.status(404).send('Url not found');
        return;
    }
    console.log(urldoc);
    let url = urldoc.url;
    console.log(url);
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
                // If not, prepend "http://"
                url = `http://${url}`;
    }

    res.redirect(url);
});



// app.get('/:urlname', async (req, res) => {
//     const { urlname } = req.params;
//     console.log(urlname);
  
//     try {
//       // Fetch the URL from the database using the provided `urlname`
//       const urlDocument = await urlSchema.findOne({ nameUrl: urlname });
      
//       if (!urlDocument || !urlDocument.url) {
//         res.status(404).send('URL not found');
//         return;
//       }
  
//       let url = urlDocument.url;
  
//       // Check if the URL starts with "http://" or "https://"
//       if (!url.startsWith('http://') && !url.startsWith('https://')) {
//         // If not, prepend "http://"
//         url = `http://${url}`;
//       }
  
//       // Redirect to the correct URL
//       res.redirect(url);
//     } catch (error) {
//       console.error('Error fetching URL:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
  

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});