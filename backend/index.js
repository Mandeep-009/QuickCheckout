const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// const apiKey = `${process.env.API_KEY}`
// const authDomain = `${process.env.AUTH_DOMAIN}`
// const databaseURL = `${process.env.DB_URL}`
// const projectId = `${process.env.PROJECT_ID}`
// const storageBucket = `${process.env.STORAGE_BUCKET}`
// const messagingSenderId = `${process.env.MESSAGING_SENDER_ID}`
// const appId = `${process.env.APP_ID}`
// const measurementId = `${process.env.MEASUREMENT_ID}`
  
// const firebaseConfig = {
//     apiKey,
//     authDomain,
//     databaseURL,
//     projectId,
//     storageBucket,
//     messagingSenderId,
//     appId,
//     measurementId
// }

const firebaseConfig = {

    apiKey: "AIzaSyAW9jWu21SHpjunQMTNvzc7OcLn19dZY_Q",
  
    authDomain: "receipt-system-12689.firebaseapp.com",
  
    databaseURL: "https://receipt-system-12689-default-rtdb.asia-southeast1.firebasedatabase.app",
  
    projectId: "receipt-system-12689",
  
    storageBucket: "receipt-system-12689.appspot.com",
  
    messagingSenderId: "145988567998",
  
    appId: "1:145988567998:web:474061542e89226b38efef",
  
    measurementId: "G-2ZNSFBKKPP"
  
  };
  
  

const port = process.env.PORT || 5186;

app.get('/',(req,res)=>{
    res.send('hello guys....');
})

app.get('/firebase-config',(req,res)=>{
    res.send(firebaseConfig);
})

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})