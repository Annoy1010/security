require('dotenv').config();
const e = require('express');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 5000;

// MiddLeware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.post('/', (req, res) => {
    console.log(req.body);

    if (req.body.email == "") {
        console.log(req.body.password);
    }
    else {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        
        // step 2
        const mailOptions = { 
            from: 'SERVER',
            to: req.body.email,
            subject: req.body.subject,
            text: req.body.message
        };
        
        // step 3
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.error('ERROR: ', err);
                res.send('error');
            }
            else {
                console.log('Email sent: ' + info.response);
                res.send('success');
            }
        });
    }
})

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})

