const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { WebLead } = require('./templates/webleads');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// app.get('/api/getcsv', (req, res) => {
//     const csv = require('./dcm.scv');

//     res.set('Content-Type', 'application/octet-stream');
//     res.send(csv);
// });

app.post('/api/send', (req, res) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: USERNAME,
            pass: PASSWORD
        }
    });

    let mailOptions = {
        from: '"Sam" <sam@gromarketing.io>',
        // to: ['yurlovandrew@gmail.com'],
        to: ['yurlovandrew@gmail.com', 'webleads@dcmotors.dsmessage.com'],
        subject: 'D&C Web Lead',
        html: WebLead(req.body),
    };    

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return console.log(err)
        else return info.messageId
    });
});

app.listen(PORT || 5000, () => {
    console.log("Listening on port ", PORT)
});
