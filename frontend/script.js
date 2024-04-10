const btn009 = document.querySelector('#btn009');
var dark = true;

btn009.addEventListener('click',()=>{
  if(dark===false){
    document.body.style.backgroundColor = '#222221';
    document.body.style.color = 'white';
    dark = true;
  }
  else{
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    dark=false;
  }
})