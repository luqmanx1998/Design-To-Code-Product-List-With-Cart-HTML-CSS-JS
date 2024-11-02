const productList = document.querySelector('.product-list');
const cart = document.querySelector('.cart');
const cartItemsContainer = cart.querySelector('.cart-items');
const cartHeader = cart.querySelector('.cart-header');
const cartTotalWrapper = cart.querySelector('.cart-total-wrapper');
const cartTotalPrice = cart.querySelector('.cart-total-price');
const cartEmpty = cart.querySelector('.cart-empty');
const cartDelivery = cart.querySelector('.cart-delivery');
const confirmOrderBtn = cart.querySelector('.confirm-order');
const newOrderBtn = document.querySelector('.new-order');
const overlay = document.querySelector('.overlay-div')

let cartData = [];

const renderProducts = (products) => {
    productList.innerHTML = '';

    products.forEach(product => {
        const {category, image, name, price} = product;
        const html = `
        <div class="product-item" data-name="${name}" data-price="${price}">
          <div class="product-img-container">
            <picture>
              <source media="(min-width:1200px)" srcset="${image.desktop}">
              <source media="(min-width:768px)" srcset="${image.tablet}">
              <img src="${image.mobile}" alt="${name}" class="product-img">
            </picture>
            <button class="btn add-to-cart">
              <img src="assets/images/icon-add-to-cart.svg" alt="Cart icon">
              <span>Add to Cart</span>
            </button>
            <button class="btn quantity hidden">
              <div class="decrement-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
              </div>
              <span>1</span>
              <div class="increment-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
              </div>
            </button>
          </div>
          <div class="product-description">
            <p class="product-category">${category}</p>
            <h3 class="product-name">${name}</h3>
            <span class="product-price">$${price.toFixed(2)}</span>
          </div>
        </div>
        `;
        productList.insertAdjacentHTML('beforeend', html);
    });
};

const loadProducts = async function() {
    try {
        const response = await fetch('data.json');
        if(!response.ok) {
            throw new Error('Network response not ok,' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        renderProducts(data);
    } catch(err) {
        console.error("Error: ", err);
    }
};

loadProducts();

const updateCart = (name, price, quantity, image) => {
  if (quantity <= 0) {
    // Remove item from cartData if quantity is 0
    cartData = cartData.filter(item => item.name !== name);
  } else {
    const existingItem = cartData.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      cartData.push({ name, price, quantity, image });
    }
  }
  renderCart(); 
};


const renderModalCart = () => {
  const modalCartItemsContainer = document.querySelector('.modal-cart-items');
  const modalCartTotalPrice = document.querySelector('.modal-cart-total-wrapper .cart-total-price');
  const modal = document.querySelector('.modal');

  modalCartItemsContainer.innerHTML = '';

  let modalTotal = 0;

  cartData.forEach(item => {
    const itemTotalPrice = item.price * item.quantity;
    modalTotal += itemTotalPrice;

    const modalItemHtml = `
      <div class="cart-item modal-cart-item">
        <div class="cart-item-desc">
          <div class="cart-item-desc-img">
            <img src="${item.image}" alt="${item.name} thumbnail">
          </div>
          <div class="modal-item-desc">
            <div class="cart-item-name">
              <p>${item.name}</p>
            </div>
            <div class="cart-item-total">
              <span class="item-quantity">${item.quantity}x</span>
              <span class="unit-price">@ $${item.price.toFixed(2)}</span>
            </div>       
          </div>
        </div>
        <div class="total-price-wrapper">
          <span class="item-total-price modal-item-total-price">
            $${itemTotalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    `;
    
    modalCartItemsContainer.insertAdjacentHTML('beforeend', modalItemHtml);
  });

  modalCartTotalPrice.textContent = `$${modalTotal.toFixed(2)}`;
  modal.classList.remove('hidden');
};

const renderCart = () => {
  cartItemsContainer.innerHTML = '';

  let total = 0;

  cartData.forEach(item => {
    const itemTotalPrice = item.price * item.quantity;
    total += itemTotalPrice;

    const itemHtml = `
    <div class="cart-item">
      <div class="cart-item-desc">
        <div class="cart-item-name">
          <p>${item.name}</p>
        </div>
        <div class="cart-item-total">
          <span class="item-quantity">${item.quantity}x</span>
          <span class="unit-price">@ $${item.price.toFixed(2)}</span>
          <span class="item-total-price">$${itemTotalPrice.toFixed(2)}</span>
        </div>       
      </div>
      <div class="remove-item-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
      </div>
    </div>
    `;
    cartItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
  });

  cartTotalPrice.textContent = `$${total.toFixed(2)}`;

  const hasItems = cartData.length > 0;
  cartEmpty.classList.toggle('hidden', hasItems);
  cartTotalWrapper.classList.toggle('hidden', !hasItems);
  cartDelivery.classList.toggle('hidden', !hasItems);
  confirmOrderBtn.classList.toggle('hidden', !hasItems);
  cartHeader.textContent = `Your Cart(${cartData.length})`;
};

const toggleAddToCartQuantity = (btnAddToCart, btnQuantity, showQuantity) => {
  if (showQuantity) {
    btnAddToCart.classList.add('hidden');
    btnQuantity.classList.remove('hidden');
  } else {
    btnAddToCart.classList.remove('hidden');
    btnQuantity.classList.add('hidden');
  }
};


productList.addEventListener('click', function(e) {
  const productItem = e.target.closest('.product-item');
  if (!productItem) return;

  const name = productItem.dataset.name;
  const price = parseFloat(productItem.dataset.price);
  const image = productItem.querySelector('img').src;
  const btnAddToCart = productItem.querySelector('.add-to-cart');
  const btnQuantity = productItem.querySelector('.quantity');
  const quantityCount = btnQuantity.querySelector('span');

  if (e.target.closest('.add-to-cart')) {
    toggleAddToCartQuantity(btnAddToCart, btnQuantity, true);
    updateCart(name, price, parseInt(quantityCount.textContent), image);
    const imgHighlight = productItem.querySelector('.product-img-container .product-img');
    imgHighlight.classList.add('highlight');
}

  if (e.target.closest('.increment-icon')) {
    let count = parseInt(quantityCount.textContent);
    quantityCount.textContent = ++count;
    updateCart(name, price, count, image);
  }

  if (e.target.closest('.decrement-icon')) {
    let count = parseInt(quantityCount.textContent);

    if (count > 1) {
      quantityCount.textContent = --count;
      updateCart(name, price, count, image);
    } else {

      toggleAddToCartQuantity(btnAddToCart, btnQuantity, false);
      const imgHighlight = productItem.querySelector('.product-img-container .product-img');
      imgHighlight.classList.remove('highlight');
      updateCart(name, price, 0, image); 
      renderCart(); 
    }
  }
});

cartItemsContainer.addEventListener('click', function (e) {
  const removeItemIcon = e.target.closest('.remove-item-icon');
  if (!removeItemIcon) return;

  const cartItem = removeItemIcon.closest('.cart-item');
  const name = cartItem.querySelector('.cart-item-name p').textContent;

  const index = cartData.findIndex(item => item.name === name);

  if (index !== -1) cartData.splice(index, 1);

  renderCart();

  const productItem = [...productList.children].find(
    product => product.dataset.name === name
  );

  if (productItem) {
    const btnAddToCart = productItem.querySelector('.add-to-cart');
    const btnQuantity = productItem.querySelector('.quantity');
    toggleAddToCartQuantity(btnAddToCart, btnQuantity, false);
    btnQuantity.querySelector('span').textContent = '1';
    const imgHighlight = productItem.querySelector('.product-img-container .product-img');
    imgHighlight.classList.remove('highlight');
  }
});

confirmOrderBtn.addEventListener('click', function() {
  renderModalCart();
  overlay.classList.add('overlay');
});

newOrderBtn.addEventListener('click', function() {
  const modal = document.querySelector('.modal');

  // Hide the modal
  modal.classList.add('hidden');

  // Reset cart data
  cartData = [];

  // Render the cart (this will handle the empty state)
  renderCart();

  // Reset all product items to show add-to-cart buttons and hide quantities
  productList.querySelectorAll('.product-item').forEach(product => {
    const btnAddToCart = product.querySelector('.add-to-cart');
    const btnQuantity = product.querySelector('.quantity');
    const imgHighlight = product.querySelector('.product-img-container .product-img');
    imgHighlight.classList.remove('highlight');
    toggleAddToCartQuantity(btnAddToCart, btnQuantity, false);
    btnQuantity.querySelector('span').textContent = '1'; // Reset quantity display
  });

  // Show the empty cart message
  cartEmpty.classList.remove('hidden');
  overlay.classList.remove('overlay');
});