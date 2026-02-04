var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var addProductBtn = document.getElementById("addProduct");
var searchInput = document.getElementById("searchInput");
var productNameRegExp = /^[A-Z][A-Za-z0-9]{2,30}$/;
var productPriceRegexp = /^([1-9][0-9]{1,5}|1000000)$/;
var productCategoryRegExp = /^[A-Z][A-Za-z0-9 ]{2,30}$/;
var productDescRegExp = /^[A-Z][\w\s.-]{3,300}$/;
var arrayOfProducts = [];
var indexUpdating;
// Add Product
function addProduct() {
  if (
    isDataValid(
      productNameInput.value.trim(),
      productPriceInput.value.trim(),
      productCategoryInput.value.trim(),
      productDescInput.value.trim(),
    )
  ) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value,
    };
    if (addProductBtn.innerHTML == " Update Product") {
      arrayOfProducts.splice(indexUpdating, 1, product);
      addProductBtn.innerHTML = " Add Product";
    } else {
      arrayOfProducts.push(product);
    }
    displayProduct();
    handleInput();
    console.log(arrayOfProducts);
  }
}
// DISPLAY PRODUCT
function displayProduct() {
  cart = "";
  var searchInput = document.getElementById("searchInput").value;
  if (arrayOfProducts.length === 0) {
    document.getElementById("tBody").innerHTML = "";
  }
  for (var i = 0; i < arrayOfProducts.length; i++) {
    if (
      arrayOfProducts[i].name.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      cart += `   
     <tr>
                    <td>${i + 1}</td>
                    <td>${arrayOfProducts[i].name}</td>
                    <td>${arrayOfProducts[i].price}</td>
                    <td>${arrayOfProducts[i].category}</td>
                    <td>${arrayOfProducts[i].desc}</td>
                    <td><button onclick="updateProduct(${i})"  class="btn btn-outline-warning">Update</button></td>
                    <td><button onclick="checkDelete(${i})" class="btn btn-outline-danger">Delete</button></td>
                </tr>`;
    }

    document.getElementById("tBody").innerHTML = cart;
  }
}
//Update Product

function deleteProduct(productIndex) {
  arrayOfProducts.splice(productIndex, 1);
  displayProduct();
}
// check Delete
function checkDelete(productIndex) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-3",
      cancelButton: "btn btn-danger mx-3",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productIndex);
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your product is safe :)",
          icon: "error",
        });
      }
    });
}

// handle input
function handleInput() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}
function updateProduct(productIndex) {
  indexUpdating = productIndex;
  productNameInput.value = arrayOfProducts[productIndex].name;
  productPriceInput.value = arrayOfProducts[productIndex].price;
  productCategoryInput.value = arrayOfProducts[productIndex].category;
  productDescInput.value = arrayOfProducts[productIndex].desc;
  addProductBtn.innerHTML = " Update Product";
}
// Check Validation
function isDataValid(name, price, category, desc) {
  isValid = true;
  if (!productNameRegExp.test(name)) {
    document.getElementById("productNameValid").classList.remove("d-none");
    isValid = false;
  } else {
    document.getElementById("productNameValid").classList.add("d-none");
  }
  if (!productPriceRegexp.test(price)) {
    document.getElementById("productPriceValid").classList.remove("d-none");
    isValid = false;
  } else {
    document.getElementById("productPriceValid").classList.add("d-none");
  }
  if (!productCategoryRegExp.test(category)) {
    document.getElementById("productCategoryVaild").classList.remove("d-none");
    isValid = false;
  } else {
    document.getElementById("productCategoryVaild").classList.add("d-none");
  }
  if (!productDescRegExp.test(desc)) {
    document.getElementById("productDesValid").classList.remove("d-none");
    isValid = false;
  } else {
    document.getElementById("productDesValid").classList.add("d-none");
  }
  return isValid;
}

// Validation With Typing
function validationWithTyping(regex, input) {
  return Boolean(regex.test(input));
}
productNameInput.addEventListener("keyup", function () {
  if (validationWithTyping(productNameRegExp, productNameInput.value.trim())) {
    document.getElementById("productNameValid").classList.add("d-none");
  } else {
    document.getElementById("productNameValid").classList.remove("d-none");
  }
});
productPriceInput.addEventListener("keyup", function () {
  if (
    validationWithTyping(productPriceRegexp, productPriceInput.value.trim())
  ) {
    document.getElementById("productPriceValid").classList.add("d-none");
  } else {
    document.getElementById("productPriceValid").classList.remove("d-none");
  }
});
productCategoryInput.addEventListener("keyup", function () {
  if (
    validationWithTyping(
      productCategoryRegExp,
      productCategoryInput.value.trim(),
    )
  ) {
    document.getElementById("productCategoryVaild").classList.add("d-none");
  } else {
    document.getElementById("productCategoryVaild").classList.remove("d-none");
  }
});
productDescInput.addEventListener("keyup", function () {
  if (validationWithTyping(productDescRegExp, productDescInput.value.trim())) {
    document.getElementById("productDesValid").classList.add("d-none");
  } else {
    document.getElementById("productDesValid").classList.remove("d-none");
  }
});
