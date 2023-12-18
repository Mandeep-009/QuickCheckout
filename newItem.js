import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getFirestore,doc,getDoc,addDoc,setDoc,collection} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAW9jWu21SHpjunQMTNvzc7OcLn19dZY_Q",
  authDomain: "receipt-system-12689.firebaseapp.com",
  databaseURL: "https://receipt-system-12689-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "receipt-system-12689",
  storageBucket: "receipt-system-12689.appspot.com",
  messagingSenderId: "145988567998",
  appId: "1:145988567998:web:474061542e89226b38efef",
  measurementId: "G-2ZNSFBKKPP"
}

document.body.style.backgroundColor = '#222221';
document.body.style.color = 'white';

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const code = document.querySelector('#code');
const names = document.querySelector('#name');
const price = document.querySelector('#price');

const btn11 = document.querySelector('#btn11');
const url = window.location.href;
const baseUrl = url.split('/').slice(0, -1).join('/');

btn11.addEventListener('click',()=>{
    if(code.value===''||names.value===''||price.value===''){
        return window.alert('enter all fields: barcode, name and price');
    }
    if (/^\d+$/.test(price.value)) {
        const priceVal = parseInt(price.value);  
        const codeVal = code.value;
        const nameVal = names.value;

        const customID = codeVal;
        const newData = {
            name: nameVal,
            price: priceVal
        };
        const docRef = doc(db,'products',customID);
        setDoc(docRef,newData, { merge: true })
        .then(() => {
            window.alert("Document successfully written or updated!");
            window.location.href = baseUrl;
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
    else{
        return window.alert('price should be a number');
    }
})