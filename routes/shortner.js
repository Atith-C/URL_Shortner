const Router = require('express').Router;
const urlSchema = require('../modles/url.modles');


const router = Router();

router.post('/generate', async (req, res) => {
    const { url, nameUrl } = req.body;
    if(!url || !nameUrl) {
        res.status(400).send('Please provide url and nameUrl');
        return;
    }

    const urlExist = await urlSchema.findOne({ nameUrl });

    if(urlExist) {
        res.status(400).send('Url already exist try different name');
        return;
    }

    const newUrl = new urlSchema({
        url,
        nameUrl,
    });
    newUrl.save();


    res.status(201).json({
        message: 'Url created successfully',
    });
});


router.get('/:urlname', async (req, res) => {
    const { urlname } = req.params;
    const url = await urlSchema.findOne({ nameUrl: urlname });
    if(!url) {
        res.status(404).send('Url not found');
        return;
    }
    res.redirect(url.url);
});
module.exports = router;