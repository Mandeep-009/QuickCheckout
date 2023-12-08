import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getFirestore,doc,getDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const url = window.location.href;
const baseUrl = url.split('/').slice(0, -1).join('/');

console.log('Base URL:', baseUrl);

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
const list = document.querySelector('.list');

const newDiv = document.createElement('div');
if(merchant==='true'){
    list.style.display = 'none';
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
          const imageDiv = document.createElement('div');
          imageDiv.innerHTML = qrImage;
          newDiv.appendChild(imageDiv);
          
          const textDiv = document.createElement('div');
          textDiv.textContent = 'Scan the above QR code for receipt';
          newDiv.appendChild(textDiv);

          newDiv.style.display = 'flex';
          newDiv.style.flexDirection = 'column';
          newDiv.style.height = '60vh';
          newDiv.style.justifyContent = 'center';
          newDiv.style.textAlign = 'center';

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
    var index = 1;
    async function getData () {
        const receipt = await getDoc(doc(db,'receipts',id));
        receipt.data().items.forEach((item)=>{
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item'
            // itemDiv.textContent = `item name: ${item.name}, price: ${item.price}`;
            const srDiv = document.createElement('div');
            srDiv.textContent = index++;
            srDiv.className = 'srdiv';
            
            const nameDiv = document.createElement('div');
            nameDiv.textContent = item.name;
            nameDiv.className = 'namediv'
    
            const priceDiv = document.createElement('div');
            priceDiv.textContent = item.price;
            priceDiv.className = 'pricediv';
    
            itemDiv.appendChild(srDiv);
            itemDiv.appendChild(nameDiv);
            itemDiv.appendChild(priceDiv);
    
            list.appendChild(itemDiv);
            // newDiv.appendChild(itemDiv);
        })
        const totalDiv = document.createElement('div');
        totalDiv.textContent = `Total Amount = ${receipt.data().total}`;
        totalDiv.style.textAlign = 'center';
        totalDiv.style.fontSize = '20px'
        totalDiv.style.fontWeight = 'bold';
        totalDiv.style.margin = '20px'
        newDiv.appendChild(totalDiv);
    }
    getData();
}
document.body.appendChild(newDiv);

