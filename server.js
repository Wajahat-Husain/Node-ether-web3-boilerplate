const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001;
const cors = require("cors")

app.use(cors())
app.use(express.json());

app.post('/addCustomTokens', (req, res) => {
    const { connectionId, token } = req.body;
    console.log(req.body)
    try {
        const filePath = `config/token.json`;
        console.log(filePath)
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading file');
            }

            const jsonData = JSON.parse(data);
            console.log(jsonData)
            jsonData[`0x${connectionId}_Custom_Token`].push(token);

            const updatedJsonData = JSON.stringify(jsonData);

            fs.writeFile(filePath, updatedJsonData, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing to file');
                }

                return res.status(200).send('Token added successfully');
            });
        });
    } catch (error) {
        return res.status(500).send(error)
    }
});


app.post('/addTransactionHash', (req, res) => {
    const { connectionId, transactionHash } = req.body;
    console.log(req.body)
    try {
        const filePath = `config/transactionHash.json`;
        console.log(filePath)
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading file');
            }

            const jsonData = JSON.parse(data);
            console.log(jsonData)
            jsonData[`0x${connectionId}_Transaction_Hash`].push(transactionHash);

            const updatedJsonData = JSON.stringify(jsonData);

            fs.writeFile(filePath, updatedJsonData, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error writing to file');
                }

                return res.status(200).send('Transaction hash added successfully');
            });
        });
    } catch (error) {
        return res.status(500).send(error)
    }
});


app.get('/getAllChainCustomToken', (req, res) => {
    const { connectionId } = req.query;
    try {
        const filePath = `config/token.json`;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading file');
            }
            const jsonData = JSON.parse(data);
            console.log(jsonData[`0x${connectionId}_Custom_Token`])
            return res.json(jsonData[`0x${connectionId}_Custom_Token`]);

        });
    } catch (error) {
        return res.status(500).send(error)
    }
});

app.get('/getAllTransactionHash', (req, res) => {
    const { connectionId } = req.query;
    try {
        const filePath = `config/transactionHash.json`;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error reading file');
            }
            const jsonData = JSON.parse(data);
            console.log(jsonData[`0x${connectionId}_Transaction_Hash`])
            return res.json(jsonData[`0x${connectionId}_Transaction_Hash`]);

        });
    } catch (error) {
        return res.status(500).send(error)
    }
});


app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});
