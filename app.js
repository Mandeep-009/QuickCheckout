import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getFirestore,doc,getDoc,addDoc,collection} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  //  firebase configuraion details
  apiKey: "AIzaSyAW9jWu21SHpjunQMTNvzc7OcLn19dZY_Q",
  authDomain: "receipt-system-12689.firebaseapp.com",
  databaseURL: "https://receipt-system-12689-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "receipt-system-12689",
  storageBucket: "receipt-system-12689.appspot.com",
  messagingSenderId: "145988567998",
  appId: "1:145988567998:web:474061542e89226b38efef",
  measurementId: "G-2ZNSFBKKPP"
}
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const video = document.getElementById('video');
const barcodeInput = document.getElementById('barcodeResult');
const addbtn = document.getElementById('addbtn');
const submitbtn = document.getElementById('submitbtn');
const totalDiv = document.getElementById('totalDiv');
const list = document.querySelector('.list');
const btn01 = document.querySelector('#btn01');
var total = 0;
var index = 1;
var receipt = [];
totalDiv.textContent = total;

const currentURL = window.location.href;
console.log(currentURL)

// Function to add new item to database button click event
btn01.addEventListener('click',()=>{
  window.location.href = 'newItem.html';
})

// Function to start the camera and barcode detection
function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
      initBarcodeScanner();
    })
    .catch(function (err) {
      console.error('Error accessing the camera:', err);
    });
}

// Initialize QuaggaJS for barcode scanning
function initBarcodeScanner() {
  Quagga.init({
    inputStream: {
      name: 'Live',
      type: 'LiveStream',
      target: video,
      constraints: {
        width: { min: 640 },
        height: { min: 480 },
        aspectRatio: { min: 1, max: 100 },
        facingMode: 'environment'
      },
    },
    decoder: {
      readers: ['ean_reader', 'upc_reader', 'code_128_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'i2of5_reader', '2of5_reader', 'code_93_reader'],
    },
  }, function (err) {
    if (err) {
      console.error('Error initializing Quagga:', err);
      return;
    }
    Quagga.start();
    Quagga.onDetected(handleBarcodeDetection);
  });
}

function handleBarcodeDetection(result) {
  const code = result.codeResult.code;
  barcodeInput.value = code; // Put the detected barcode in the input field
}

window.onload = function () {
  startCamera();
};

const db = getFirestore();

const addHandler = async()=>{
  const productId = barcodeInput.value;
  try {
    const docRef = doc(db,'products',productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        receipt.push(docSnap.data());
        total += docSnap.data().price;
        totalDiv.textContent = total;
        const newDiv = document.createElement('div');
        newDiv.className = 'item';
        const srDiv = document.createElement('div');
        srDiv.textContent = index++;
        srDiv.className = 'srdiv';
        
        const nameDiv = document.createElement('div');
        nameDiv.textContent = docSnap.data().name;
        nameDiv.className = 'namediv'

        const priceDiv = document.createElement('div');
        priceDiv.textContent = docSnap.data().price;
        priceDiv.className = 'pricediv';

        newDiv.appendChild(srDiv);
        newDiv.appendChild(nameDiv);
        newDiv.appendChild(priceDiv);

        list.appendChild(newDiv);
    } 
    else {
        window.alert('No such product found');
    }

  } catch(err){
    console.log('error fetching document: ',err);
  }
};
addbtn.addEventListener('click',addHandler);

async function submitHandler () {
  const docRef = await addDoc(collection(db, "receipts"), {
    items: receipt,
    total: total
  });
  if(total>0){
    var link = `${currentURL}qr.html?id=${docRef.id}&merchant=true`;

    window.location.href = link;
  }
  else{
    window.alert('cannot submit with zero amount');
  }
}
submitbtn.addEventListener('click',submitHandler);
export default currentURL;