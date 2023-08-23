const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { google } = require('googleapis');
const dayjs = require('dayjs');
const { v4 } = require('uuid');
const { sendEmail } = require('./helper/sendEmail');

const feedRoutes = require('./routes/feed');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/Admin');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');
const commentRoute = require('./routes/comment');
const paymentRoute = require('./routes/payment');

const leadRoute = require('./routes/leads');
const grogripRoute = require('./routes/grogrip')

const corsOpts = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Accept-Language',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Credentials'
    ],
    exposedHeaders: [
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials'
    ],
    credentials: true
};

const app = express();

app.use(express.json());
app.use(cors(corsOpts));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(feedRoutes);
app.use(userRoutes);
app.use('/admin', adminRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/auth', authRoutes);
app.use('/comment', commentRoute);
app.use('/payment', paymentRoute);
app.use(leadRoute);
app.use('/grogrip', grogripRoute)

var meetingDate = null

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.SERVERURL}/google/redirect` 
    
)

const scopes = ['https://www.googleapis.com/auth/calendar']

const calender = google.calendar({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY
})

app.get("/google", (req, res) => {
    const date = req.query.date;
    console.log("query :", req.query);
    meetingDate = date
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes
    });
    console.log("url : ", url)
    res.redirect(url)
})


app.get("/google/redirect", async (req, res) => {
    try {
        const inputDate = dayjs(meetingDate, { format: 'ddd, DD MMM YYYY HH:mm:ss [GMT]' });
        const startingDate = inputDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const outputDate = dayjs(startingDate);
        const newDate = outputDate.add(1, 'hour');
        const endingDate = newDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const code = req.query.code;
        const { tokens } = await oauth2Client.getToken(code);
        await oauth2Client.setCredentials(tokens);
        const response = await calender.events.insert({
            calendarId: "primary",
            auth: oauth2Client,
            conferenceDataVersion: 1,
            requestBody: {
                summary: "This is a Test Event",
                description: "some event that is very very important",
                start: {
                    dateTime: startingDate,
                    timeZone: "Asia/Kolkata"
                },
                end: {
                    dateTime: endingDate,
                    timeZone: "Asia/Kolkata"
                },
                conferenceData: {
                    createRequest: {
                        requestId: v4(),
                    }
                },
                attendees: [{
                    email: process.env.MY_GMAIL,
                    organizer: true
                }]
            }
        });
        let meetingLink = "";
        if (response.data.conferenceData && response.data.conferenceData.entryPoints) {
            meetingLink = response.data.conferenceData.entryPoints.find(entry => entry.entryPointType === 'video').uri;
            console.log("Meeting link:", meetingLink);
        } else {
            console.log("No meeting link found for this event.");
        }
        sendEmail(
            'support@grogrip.com',
            'rajkiranjnv@gmail.com',
            "1:1 meeting Details ",
            `Your meeting link is ${meetingLink} /n do join at ${startingDate}`
        );
        res.redirect(`https://portfolio-git-master-raj-bhai.vercel.app?meetingLink=${encodeURIComponent(meetingLink)}`);
    } catch (err) {
        console.log("Errrrrrrrr :", err);
    }
});




mongoose.connect(
    process.env.mongodb
).then(() => {
    console.log("Database Connected")
    app.listen(process.env.PORT || 9000)
}).catch((err) => {
    console.log(err);
});