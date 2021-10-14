// storing product name of carted product
var selectedProductName = "";

//for the filter buttons
(function () {
    const filterButtons = document.querySelectorAll('.btn');
    const storeItems = document.querySelectorAll('.card');

    filterButtons[0].style.backgroundColor = "#fff";

    filterButtons.forEach(
        function (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                for (let i = 0; i < filterButtons.length; i++) {
                    filterButtons[i].style.backgroundColor = "";
                }

                const filter = e.target.dataset.filter;

                e.target.style.backgroundColor = "#fff";

                storeItems.forEach(
                    function (item) {
                        if (filter === "all") {
                            item.style.display = 'block';
                        } else {
                            if (item.lastElementChild.textContent.substr(0, filter.length) === filter) {
                                item.style.display = 'block';
                            } else {
                                item.style.display = 'none';
                            }
                        }
                    }
                );
            });
        }
    );
}());

//wiring up the search control field
(function () {
    const searchInput = document.querySelector('#search-item');
    const storeItems = document.querySelectorAll('.card');

    searchInput.addEventListener('keyup', (e) => {
        const filterItems = e.target.value.toLowerCase().trim();

        storeItems.forEach(
            function (item) {
                if (item.textContent.includes(filterItems)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        );
    });
}());

//wiring up the menu button
(function () {
    const nav = document.querySelector('nav');
    const burger = document.querySelector('.burger');

    burger.addEventListener('click', () => {
        burger.classList.toggle("cross");
        nav.classList.toggle("show");
    });
}());

//wiring the modal popup
(function () {
    const closeBtn = document.querySelector('.closeBtn');
    const navBtn = document.querySelectorAll('.modal');
    const modalPopUp = document.querySelector('#modal-popup');
    const cardImages = document.querySelectorAll('.card-image');
    const captionPrice = document.querySelector(".caption-price");
    const itemPrices = document.querySelectorAll(".item-price")
    const modalImageEL = document.getElementById("modalImage");

    let imageSources = [
        { src: "img/sweet-1.jpg", price: itemPrices[0].textContent },
        { src: "img/cake-1.jpg", price: itemPrices[1].textContent },
        { src: "img/cupcake-1.jpg", price: itemPrices[2].textContent },
        { src: "img/sweet-2.jpg", price: itemPrices[3].textContent },
        { src: "img/cupcake-2.jpg", price: itemPrices[4].textContent },
        { src: "img/doughnut-1.jpg", price: itemPrices[5].textContent },
        { src: "img/sweet-3.jpg", price: itemPrices[6].textContent },
        { src: "img/cake-2.jpg", price: itemPrices[7].textContent },
        { src: "img/cupcake-3.jpg", price: itemPrices[8].textContent },
        { src: "img/doughnut-2.jpeg", price: itemPrices[9].textContent },
        { src: "img/sweet-4.jpg", price: itemPrices[10].textContent },
        { src: "img/cake-3.jpg", price: itemPrices[11].textContent },
        { src: "img/cupcake-4.jpg", price: itemPrices[12].textContent },
        { src: "img/doughnut-3.jpg", price: itemPrices[13].textContent },
        { src: "img/cake-4.jpg", price: itemPrices[14].textContent },
        { src: "img/doughnut-4.jpg", price: itemPrices[15].textContent }
    ];
    let index = 0;

    cardImages.forEach((cardImageEl, cardIndex) => {
        cardImageEl.addEventListener('click', (e) => {
            const cardImageSrc = e.target.src.substr(57);
            let productDescription = e.target.nextElementSibling.textContent;
            let locationOfSign = productDescription.indexOf("$");
            productDescription = productDescription.substr(0, locationOfSign - 1);

            selectedProductName = productDescription;

            for (let i = 0; i < imageSources.length; i++) {
                if (imageSources[i].src === cardImageSrc) {
                    index = i;
                }
            }

            modalImageEL.src = cardImageSrc;
            captionPrice.textContent = "$" + imageSources[cardIndex].price;
            modalPopUp.style.display = 'block';
        });
    });

    navBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('nextBtn')) {
                index++;
                if (index === cardImages.length) {
                    index = 0;
                }
                modalImageEL.src = cardImages[index].src;
                captionPrice.textContent = "$" + imageSources[index].price;
            }
            if (e.target.classList.contains('prevBtn')) {
                index--;
                if (index === -1) {
                    index = 15;
                }
                modalImageEL.src = cardImages[index].src;
                captionPrice.textContent = "$" + imageSources[index].price;
            }
        });
    });

    closeBtn.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.style.display = "none";
    });
}());

// cart system
(function () {
    const cartBtn = document.querySelector(".cart-btn");
    const cartMenu = document.querySelector(".cart-menu");
    const cartMenuHeader = document.querySelector(".cart-menu-header");
    const cartSection = document.querySelector(".cart-menu section");
    const closeMenuBtn = document.querySelector(".close-menu-btn");

    closeMenuBtn.addEventListener("click", () => {
        cartMenu.classList.remove("open");
    }, false);

    cartBtn.addEventListener("click", () => {
        cartMenu.classList.add("open");
        cartSection.classList.remove("fadeIn");
        cartMenuHeader.classList.remove("fadeIn");
        cartMenuHeader.classList.add("fadeIn");
        cartSection.classList.add("fadeIn");
    }, false);

    // **********************************************************

    const addToCartBtn = document.querySelector(".add-to-cart-btn");
    const selectedProductsContainer = document.querySelector(".selected-products");
    const noOfSelectedProducts = document.querySelector(".indicator");
    const noOfItems = document.querySelector(".no-of-items");
    const totalPriceEls = document.querySelectorAll(".totPrice");
    const modal = document.querySelector('#modal-popup');
    const captionPrice = document.querySelector(".caption-price");
    const modalImageEL = document.getElementById("modalImage");
    let addedProductImages = [];
    // let counter = 1;
    let noOfAddedProduct = 1;

    addToCartBtn.addEventListener("click", () => {
        let selectedItemImage = modalImageEL.src.substr(57);
        let priceOfProduct = captionPrice.textContent;

        if (addedProductImages.includes(selectedItemImage)) {
            const addedItem = selectedProductsContainer.querySelector(`.product${addedProductImages.indexOf(selectedItemImage) + 1}`);
            const currentItemCountEl = addedItem.firstElementChild.nextElementSibling;
            currentItemCountEl.textContent = parseInt(currentItemCountEl.textContent) + 1;
        } else {
            selectedProductsContainer.insertAdjacentHTML("beforeend",
                `<li class="cart-item product${noOfAddedProduct}">
            <img src="${selectedItemImage}" alt="item name">
            <span class="number">1</span>
            <div class="product">
                <h4 class="product-name">${selectedProductName}</h4>
                <span class="product-price">${priceOfProduct}</span>
            </div>
            <div class="delete-icon">
                <i>Delete</i>
            </div>
      </li>`
            );
            addedProductImages.push(selectedItemImage);
            noOfAddedProduct++;
        }
        updateCart();
    }, false);

    function updateCart() {
        const quantityPerProduct = document.querySelectorAll(".number");
        const pricePerProduct = document.querySelectorAll(".product-price");
        const quantities = [];
        const totalPrice = [];
        let total;

        noOfSelectedProducts.textContent = noOfAddedProduct;
        modal.style.display = "none";
        noOfItems.textContent = noOfAddedProduct;

        quantityPerProduct.forEach(quantity => {
            quantities.push(parseInt(quantity.textContent));
        });

        pricePerProduct.forEach((price ,index) => {
            let productPrice = parseInt(price.textContent.slice(1))
            totalPrice.push(productPrice * quantities[index]);
        })

        total = totalPrice.reduceRight((firstPrice, secondPrice) => {
            return firstPrice + secondPrice;
        });

        totalPriceEls.forEach(totalPriceEl => {
            totalPriceEl.textContent = `$${total}`;
        });
    }
}());

(function(){
}())
