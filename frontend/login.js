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

const emailbox = document.getElementById('emailbox');
const passbox = document.getElementById('passbox');
const login = document.getElementById('login');

login.addEventListener('click',(e)=>{
    e.preventDefault();
    if(emailbox.value==='' || passbox.value==='')
        return window.alert('fill all fields');
    async function userCheck () {
        const docRef = doc(db,'merchants',emailbox.value);
        try {
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                // console.log(docSnap.data());
                if(docSnap.data().password !== passbox.value){
                    return window.alert('password is incorrect');
                }
                else{
                    console.log('logged in successfully');
                    const url = window.location.href;
                    window.location.href = url.split('/').slice(0, -1).join('/') + `/dashboard.html?mrid=${emailbox.value}`;
                }
            } else {
                return window.alert('no merchant registered by this email/phone');
            }
        
        } catch(error) {
            console.log(error)
        }
    }
    userCheck();
})