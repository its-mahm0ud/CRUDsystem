var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var addProductBtn = document.getElementById("addProduct");

var arrayOfProducts = [];
// Add Product
function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  arrayOfProducts.push(product);
  displayProduct();
  handleInput();
  console.log(arrayOfProducts);
}

// DISPLAY PRODUCT
function displayProduct() {
  cart = "";
  for (var i = 0; i < arrayOfProducts.length; i++) {
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

function updateProduct(){
    
}






