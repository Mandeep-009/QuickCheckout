import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getFirestore,doc,getDoc,addDoc,collection} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const secretValue = process.env.MY_SECRET;
const firebaseConfig = JSON.parse(secretValue);


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const merchant = urlParams.get('merchant');

const newDiv = document.createElement('div');
if(merchant==='true'){
    async function generateQRCode() {
        try {
          const linkToEncode = `http://127.0.0.1:5500/QuickCheckout/qr.html?id=${id}&merchant=false`; 
      
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