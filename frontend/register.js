import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getFirestore,doc,getDoc,addDoc,setDoc,collection} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

var db;

fetch('https://quick-checkout-api.vercel.app/firebase-config')
    .then(response =>{
        return response.json();
    })
    .then(data =>{
        var firebaseConfig = {}
        firebaseConfig = data;
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    })
    .catch(error=>{
        console.log('fetch error: ',error);
    })

    
const name = document.getElementById('name');
const email = document.getElementById('email');
const upi = document.getElementById('upi');
const pass1 = document.getElementById('pass1');
const pass2 = document.getElementById('pass2');
const register = document.getElementById('register');
const url = window.location.href;

register.addEventListener('click',(e)=>{
    e.preventDefault();
    if(  name.value==='' ||
         email.value==='' ||
         upi.value==='' ||
         pass1.value==='' ||
         pass2.value===''
    ) {
        return window.alert('fill all fields');
    } 
    if(pass1.value!==pass2.value){
        return window.alert('password mismatch');
    }

    const merchant = {name: name.value, upiId: upi.value, password: pass1.value};
    console.log(merchant);
    const docRef = doc(db,'merchants',email.value);
        setDoc(docRef,merchant, { merge: true })
        .then(() => {
            window.alert("Merchant registered successfully");
            window.location.href = url.split('/').slice(0, -1).join('/') + `/dashboard.html?mrid=${email.value}`;
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
})
