const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('card-section').classList.add('hidden')
    }
    else {
        document.getElementById('card-section').classList.remove('hidden')
        document.getElementById('spinner').classList.add('hidden')
    }
}

const loadPlants = () => {
    manageSpinner(true)
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayPlants(data.plants));
};

//-----------display plants----------------

const displayPlants = (plants) => {
    const plantsContainer = document.getElementById('plants-container');
    plantsContainer.innerHTML = "";

    plants.forEach(plant => {
        const plantsDetails = document.createElement('div');
        plantsDetails.innerHTML = `
        <div class="card bg-base-100 p-5 shadow-sm w-full flex flex-col">
                        <figure class="h-44 overflow-hidden">
                            <img src="${plant.image}" alt="Shoes" class="rounded-xl h-full object-cover w-full" />
                        </figure>
                        <div class="mt-3 flex flex-col flex-1">
                            <h2 id="${plant.id}" class="card-title cursor-pointer">${plant.name}</h2>
                            <p>${plant.description.length > 80 ? plant.description.slice(0, 80) + "..." : plant.description}</p>
                            <div class="card-actions my-3 justify-between">
                                <div class="badge p-3 rounded-3xl font-semibold bg-[#DCFCE7]">${plant.category}</div>
                                <div class="font-semibold">৳${plant.price}</div>
                            </div>
                            <button class="btn add-to-cart bg-[#15803D] hover:bg-[#000000] text-white btn-block rounded-3xl">Add to Cart</button>
                        </div>
                    </div>
        `

        plantsContainer.appendChild(plantsDetails)
    });

    manageSpinner(false)
}



// ----------load categories-------------

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories));
};

//---------display categories-------------

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = ""

    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = "hover:bg-[#15803D] hover:text-white px-1 gap-2 lg:p-2 font-semibold rounded-xl"
        categoryBtn.innerText = category.category_name;

        categoryBtn.addEventListener('click', () => {
            const allBtn = categoriesContainer.querySelectorAll('button');
            allBtn.forEach(btn => btn.classList.remove("bg-[#15803D]", "text-white"))

            categoryBtn.classList.add("bg-[#15803D]", "text-white");

            manageSpinner(true)

            fetch(`https://openapi.programming-hero.com/api/category/${category.id}`)
                .then(res => res.json())
                .then(data => displayPlants(data.plants));
        })

        categoriesContainer.appendChild(categoryBtn)

    });

    manageSpinner(false)
}


const plantsContainer = document.getElementById('plants-container');
plantsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
        const card = e.target.closest(".card");

        let priceText = card.querySelector(".font-semibold:last-child").innerText;

        let price = Number(priceText.replace("৳", "").trim());


        let totalPrice = document.getElementById('total-price').innerText.replace("৳", "").trim();

        totalPrice = Number(totalPrice);


        document.getElementById('total-price').innerText = "৳" + (price + totalPrice);
    }

    plantsContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('card-title')) {
            const plantId = e.target.getAttribute("id");

            fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.plants)
                    showModal(data.plants)
                });
        }
    })

    function showModal(plant) {
        const modalContent = document.getElementById('modal-content');

        modalContent.innerHTML = `
     <h3 class="text-lg font-bold">${plant.name}</h3>
                    <figure class="w-full max-h-64 flex justify-center">
                             <img src="${plant.image}" alt="Shoes" class="rounded-xl  w-full object-cover" />
                         </figure>
                    <p><span class="font-bold">Category: </span><span>${plant.category}</span></p>
                    <p><span class="font-bold">Price: </span>৳${plant.price}</p>
                    <p class=""><span class="font-bold">Description: </span>${plant.description}</p>
                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn">Close</button>
                        </form>
                    </div>
    `

        document.getElementById("my_modal_5").showModal()
    }

})

loadPlants()
loadCategories()

let cart = {};

const cartContainer = document.getElementById("cart-container");

const plantsContainers = document.getElementById(('plants-container'));
plantsContainers.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
        const card = e.target.closest(".card");
        let name = card.querySelector(".card-title").innerText;

        // const price = Number(card.querySelector(".font-semibold").innerText);

        const priceText = card.querySelector(".font-semibold:last-child").innerText;

        const price = Number(priceText.replace("৳", "").trim());


        alert(`${name} added the cart`)

        if (cart[name]) {
            cart[name].quantity += 1;
        }
        else {
            cart[name] = { price: price, quantity: 1 }
        }

        updateCart()

    }
})

function updateCart() {
    const cartItemsContainer = cartContainer.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";

    let total = 0;

    Object.keys(cart).forEach(productName => {
        const item = cart[productName];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement("div");
        div.className = "flex justify-between items-center my-3 rounded-xl p-3 bg-[#F0FDF4]";
        div.innerHTML = `
        <div class="">
                <h3 class="font-semibold">${productName}</h3>
                <p>${item.price} * ${item.quantity}</p>
            </div>
            <i class="fa-solid fa-xmark cursor-pointer text-red-500"></i>
        `;

        div.querySelector("i").addEventListener('click', () => {
            total -= itemTotal;
            delete cart[productName];
            updateCart();
        });

        cartItemsContainer.appendChild(div);

    });
    document.getElementById("total-price").innerText = total;
}



