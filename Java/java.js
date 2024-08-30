document.getElementById('more-languages').addEventListener('click', function() {
    var allLanguages = document.getElementById('all-languages');
    if (allLanguages.style.display === 'none') {
      allLanguages.style.display = 'block';
      this.textContent = '-10 less';
    } else {
      allLanguages.style.display = 'none';
      this.textContent = '+10 more';
    }
  });

document.getElementById("toggleButton").addEventListener("click", function() {
    const description = document.getElementById("description");
    if (description.style.maxHeight === "none") {
        description.style.maxHeight = "100px"; 
        this.textContent = "Show more";
    } else {
        description.style.maxHeight = "none";
        this.textContent = "Show less";
    }
});

document.querySelectorAll('.module-title').forEach(title => {
  title.addEventListener('click', () => {
      const content = title.nextElementSibling;
      content.classList.toggle('active');
  });
});

window.onload=()=>{
  let addToCart = document.getElementById("cart");
addToCart.addEventListener("click", function() {
  console.log("Clicked");
  let cartItems = JSON.parse(localStorage.getItem("cartItems"))||[]
  let cartTotal = JSON.parse(localStorage.getItem("cartTotal"))||0;
  cartTotal+=800;
  let found = false;
  if(cartItems.length>0){
    for(let i=0;i<cartItems.length;i++){
      let item = cartItems[i];
      if(item.subject.toLowerCase() ){
        found = true;
        cartItems[i].quantity = item.quantity+1;
      }
    }
    if(!found){
      cartItems.push({subject:"Java",price:800,quantity:1});
    }
  }else{
    cartItems.push({subject:"Java",price:800,quantity:1});
  }
  console.log(cartItems);
  localStorage.setItem("cartTotal",cartTotal);
  localStorage.setItem("cartItems",JSON.stringify(cartItems));
});
}

