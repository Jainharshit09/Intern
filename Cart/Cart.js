let el = document.getElementById("cart-body");
let items = JSON.parse(localStorage.getItem("cartItems"))||[];

const delRow=(i,el)=>{
    var row = el.parentElement.parentElement;
    row.parentElement.removeChild(row);
    let total = JSON.parse(localStorage.getItem("cartTotal"))
    localStorage.setItem("cartTotal",total-(items[i].price*items[i].quantity))
    items.splice(i,1);
    console.log(items);
    localStorage.setItem("cartItems",JSON.stringify(items)); 
    renderElements(items);
}

const renderElements = (items) => {
    items.forEach((element, i) => {
        let courseName;
        switch (element.subject.toLowerCase()) {
            case "ai":
                courseName = "Introduction to AI";
                break;
            case "ml":
                courseName = "Machine Learning";
                break;
            case "angular":
                courseName = "Angular JS";
                break;
            case "java":
                courseName = "Java Programming";
                break;
            case "c++":
                courseName = "C++ Programming";
                break;
            default:
                courseName = "Unknown Course";
        }

        el.innerHTML += `<tr>
              <td>${courseName}</td>
            <td class="price">${(element.price * 2.1).toString().split(".")[0]}</td>
            <td class="discount">${(element.price * 0.5238 / element.price * 100).toFixed(0)}</td>
            <td class="subtotal">${element.price * element.quantity}</td>
            <td><button onclick="delRow(${i}, this)">Remove</button></td>
            </tr>`;
    });
    updateTotals();
};

function redirectToThankYou() {
    var cartBody = document.getElementById('cart-body').innerHTML.trim();
    
    if (cartBody !== "") {
      window.location.href = "thankyou.html";
    } else {
      alert("Your cart is empty.");
    }
  }

  function removeRow(button) {
    var row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
    updateTotals();
  }

  function updateTotals() {
    var rows = document.querySelectorAll('#cart-body tr');
    var totalPrice = 0;
    var subtotal = 0;
    var totalDiscount = 0;
    var count = 0;

    rows.forEach(function(row) {
      var price = parseFloat(row.querySelector('.price').textContent);
      var subtotalValue = parseFloat(row.querySelector('.subtotal').textContent);
      var discountPercentage = ((price - subtotalValue) / price) * 100;

      row.querySelector('.discount').textContent = discountPercentage.toFixed(2); // Update discount percentage

      totalPrice += price;
      subtotal += subtotalValue;
      totalDiscount += discountPercentage;
      count++;
    });

    var averageDiscount = count > 0 ? totalDiscount / count : 0;
    var totalAfterDiscount = subtotal;

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('average-discount').textContent = averageDiscount.toFixed(2);
    document.getElementById('total').textContent = totalAfterDiscount.toFixed(2); // Total after discount
  }

  // Initial update on page load
  document.addEventListener('DOMContentLoaded', updateTotals);

window.onload = () => {
    renderElements(items);
    updateTotals();
};
