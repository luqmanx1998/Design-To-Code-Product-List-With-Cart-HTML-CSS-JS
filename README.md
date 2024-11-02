# Product List with Cart

![DESIGN-IMG](design/desktop-design-selected.jpg)

## Overview

A beautiful, clean, and fully functional product list with a cart ! This one was definitely a real challenge and milestone for me to achieve in terms of pure Javascript ! 

## Challenges Faced

- **DOM Traversing & Event Delegation**  

  This challenge was a real milestone for me! I learned a lot by putting into practice concepts I had not been able to utilize until now, such as event delegation and DOM traversing. Because of the use of insertAdjacentHTML, most of the elements inserted were not interactable via regular means such as document.querySelector. Instead, I had to rely on event delegation and DOM traversing to search for these individual elements by utilizing the .closest method frequently and navigating up and down parent and child elements to grab specific ones. I had to do this to update the state of elements as well, making it more complex this time.

## Key Features

Adding Items to the Cart: Users can easily add products to their cart by clicking the "Add to Cart" button, which updates the cart's state dynamically.

Updating Quantities: The buttons allows users to adjust the quantity of items they wish to purchase, with real-time updates reflecting the total cost.

Removing Items from the Cart: Users can remove items from the cart, which updates the display and total cost accordingly.

Responsive Design: The layout is fully responsive, ensuring a seamless experience on various devices, from mobile phones to desktops.

## Tools & Techniques

- **HTML5 & CSS3**
- **JavaScript**: DOM Manipulation, Event Delegation, DOM Traversing & Dynamic State Management
- **Responsive Design**: Leveraging `display`, `position`, and other CSS properties to create a fluid layout beyond simple media queries.
- **Problem-Solving**: Using past project experience to tackle unexpected layout issues.


## Design Credit

Design provided by [Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d).
