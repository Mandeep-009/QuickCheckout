import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getFirestore,doc,getDoc,addDoc,setDoc,collection} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

var firebaseConfig = {};
var app;
var db;
fetch('https://quick-checkout-api.vercel.app/firebase-config')
    .then(response =>{
        return response.json();
    })
    .then(data =>{
        firebaseConfig = data;
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    })
    .catch(error=>{
        console.log('fetch error: ',error);
    })


document.body.style.backgroundColor = '#222221';
document.body.style.color = 'white';

const code = document.querySelector('#code');
const names = document.querySelector('#name');
const price = document.querySelector('#price');

const btn11 = document.querySelector('#btn11');
const url = window.location.href;
const baseUrl = url.split('/').slice(0, -1).join('/') + "/dashboard.html";

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