import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getFirestore,doc,getDoc,addDoc,collection} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const secretValue = process.env.MY_SECRET;
const firebaseConfig = JSON.parse(secretValue);
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const video = document.getElementById('video');
const barcodeInput = document.getElementById('barcodeResult');
const addbtn = document.getElementById('addbtn');
const submitbtn = document.getElementById('submitbtn');
const totalDiv = document.getElementById('totalDiv');
var total = 0;
var receipt = [];
totalDiv.textContent = total;

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
        facingMode: 'environment', // Use the back camera if available
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

    const newDiv = document.createElement('div');

    if (docSnap.exists()) {
        receipt.push(docSnap.data());
        total += docSnap.data().price;
        totalDiv.textContent = total;
        newDiv.textContent = `item name: ${docSnap.data().name}, price: ${docSnap.data().price}`;
    } 
    else {
        newDiv.textContent = 'no such product found';
    }

    document.body.appendChild(newDiv);

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
    var link = `./qr.html?id=${docRef.id}&merchant=true`;
    window.location.href = link;
  }
  else{
    window.alert('cannot submit with zero amount');
  }
}
submitbtn.addEventListener('click',submitHandler);
