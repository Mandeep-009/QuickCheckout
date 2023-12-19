const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors(
    {
        origin: ["https://quick-checkout-api.vercel.app"],
        methods: ["POST","GET"],
        credentials: true
    }
));
app.use(express.json());
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  }

const port = process.env.PORT || 5186;

app.get('/firebase-config',(req,res)=>{
    res.send(firebaseConfig);
})

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})