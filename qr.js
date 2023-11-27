import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getFirestore,doc,getDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const url = window.location.href;
const parts = url.split('/');
const baseUrl = parts.slice(0, 4).join('/'); 

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


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const merchant = urlParams.get('merchant');

const newDiv = document.createElement('div');
if(merchant==='true'){

    async function generateQRCode() {
        try {
          const linkToEncode = `${baseUrl}/qr.html?id=${id}&merchant=false`; 
          
          const qr = qrcode(0, 'M');
          qr.addData(linkToEncode);
          qr.make();
      
          return qr.createImgTag();
        } catch (error) {
          console.error('QR Code generation error:', error);
          throw error;
        }
      }
      
      // Call the async function and display the generated QR code
      async function displayQRCode() {
        try {
          const qrImage = await generateQRCode();
          newDiv.innerHTML = qrImage;
          
          const textDiv = document.createElement('div');
          textDiv.textContent = 'Scan the above QR code for receipt';
          newDiv.appendChild(textDiv);

        } catch (error) {
          // Handle errors, if any
          console.log(error);
        }
      }
      
      displayQRCode();
      
}
else {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);   
    async function getData () {
        const receipt = await getDoc(doc(db,'receipts',id));
        receipt.data().items.forEach((item)=>{
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `item name: ${item.name}, price: ${item.price}`;
            newDiv.appendChild(itemDiv);
        })
        const totalDiv = document.createElement('div');
        totalDiv.textContent = `Total Amount = ${receipt.data().total}`;
        newDiv.appendChild(totalDiv);
    }
    getData();
}
document.body.appendChild(newDiv);

