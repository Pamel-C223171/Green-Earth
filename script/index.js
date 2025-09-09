const loadPlants = () => {
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
        <div class="card bg-base-100 p-5 shadow-sm h-full w-full">
                        <figure class="h-44 overflow-hidden">
                            <img src="${plant.image}" alt="Shoes" class="rounded-xl h-full object-cover w-full" />
                        </figure>
                        <div class="mt-3">
                            <h2 id="${plant.id}" class="card-title cursor-pointer">${plant.name}</h2>
                            <p>${plant.description}</p>
                            <div class="card-actions mt-3 justify-between">
                                <div class="badge p-3 rounded-3xl font-semibold bg-[#DCFCE7]">${plant.category}</div>
                                <div class="font-semibold">৳${plant.price}</div>
                            </div>
                            <button class="btn add-to-cart bg-[#15803D] mt-3 text-white btn-block rounded-3xl">Add to Cart</button>
                        </div>
                    </div>
        `

        plantsContainer.appendChild(plantsDetails)
    });
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
        categoryBtn.className = "hover:bg-[#15803D] hover:text-white p-2 w-full text-left"
        categoryBtn.innerText = category.category_name;

        categoryBtn.addEventListener('click', () => {
            fetch(`https://openapi.programming-hero.com/api/category/${category.id}`)
            .then(res => res.json())
            .then(data => displayPlants(data.plants));
        })

        categoriesContainer.appendChild(categoryBtn)

    })
}

const plantsContainer = document.getElementById('plants-container');
plantsContainer.addEventListener('click', function (e) {
    if(e.target.classList.contains('add-to-cart'))
    {
        const card = e.target.closest(".card");
        // let price = Number(card.querySelector(".font-semibold").innerText);
        let priceText = card.querySelector(".font-semibold:last-child").innerText;
let price = Number(priceText.replace("৳", "").trim());


        let totalPrice =document.getElementById('total-price').innerText.replace("৳", "").trim();
        totalPrice = Number(totalPrice);

        document.getElementById('total-price').innerText = "৳" + (price + totalPrice);
    }

plantsContainer.addEventListener('click', function (e) {
    if(e.target.classList.contains('card-title'))
    {
        const plantId = e.target.getAttribute("id");

        fetch(`https://openapi.programming-hero.com/api/plant/${plantId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.plants)
            showModal(data.plants)});
    }
})

function showModal(plant)
{
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
     <h3 class="text-lg font-bold">${plant.name}</h3>
                    <figure class="h-44 overflow-hidden">
                             <img src="${plant.image}" alt="Shoes" class="rounded-xl h-full object-cover w-full" />
                         </figure>
                    <p><span class="font-bold">Category: </span><span>${plant.category}</span></p>
                    <p><span class="font-bold">Price: </span>৳${plant.price}</p>
                    <p class=""><span class="font-bold">Dscription: </span>${plant.description}</p>
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
    if(e.target.classList.contains('add-to-cart'))
    {
        const card = e.target.closest(".card");
        let name = card.querySelector(".card-title").innerText;
        
        // const price = Number(card.querySelector(".font-semibold").innerText);
        const priceText = card.querySelector(".font-semibold:last-child").innerText; // last-child ব্যবহার করে price পাওয়া
const price = Number(priceText.replace("৳", "").trim());


        alert(`${name} added the cart`)

        if(cart[name]){
            cart[name].quantity += 1;
        }
        else{
            cart[name] = {price: price, quantity: 1}
        }

        updateCart()

    }
})

function updateCart()
{
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














































//me // console.log("connected")

// //--------------------------------------------



// //---------------------------------------------------------------

// const loadPlants = () => {
//     fetch('https://openapi.programming-hero.com/api/plants')
//         .then(res => res.json())
//         .then(data => displayPlants(data.plants))
// }

// // "id": 1,
// //       "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// //       "name": "Mango Tree",
// //       "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// //       "category": "Fruit Tree",
// //       "price": 500

// const displayPlants = (plants) => {
//     const plantsContainer = document.getElementById('plants-container')
//     plantsContainer.addEventListener('click', function(e) {
//         // console.log(e.target)

//         if(e.target.className.includes('add-to-cart'))
//         {
//             cartBtn = e.target
//             const plantPrice = cartBtn.parentNode.children[2].children[1].children[0].innerText;
//             console.log(plantPrice)

//             const totalPrice = document.getElementById('total-price').innerText;
//             const currentPrice = Number(plantPrice) + Number(totalPrice)
//             document.getElementById('total-price').innerText = currentPrice
//         }
//     })

//     plants.forEach(plant => {
//         const plantsDetails = document.createElement('div')
//         plantsDetails.innerHTML = `
//         <div class="card bg-base-100 p-5 shadow-sm h-full w-full">
//                         <figure class="h-44 overflow-hidden">
//                             <img src="${plant.image}" alt="Shoes" class="rounded-xl h-full object-cover w-full" />
//                         </figure>
//                         <div class="mt-3">
//                             <h2 class="card-title">${plant.name}</h2>
//                             <p>${plant.description}</p>
//                             <div class="card-actions mt-3 justify-between">
//                                 <div class="badge p-3 rounded-3xl font-semibold bg-[#DCFCE7]">${plant.category}</div>
//                                 <div class="font-semibold">৳<span>${plant.price}</span></div>
//                             </div>
//                             <button class="btn add-to-cart bg-[#15803D] mt-3 text-white btn-block rounded-3xl">Add to Cart</button>
//                         </div>
//                     </div>
//         `

//         plantsContainer.appendChild(plantsDetails)

//     });
// }

// loadPlants()

// //---------------------------------------------------------------

// const loadCategories = () => {
//     fetch('https://openapi.programming-hero.com/api/categories')
//         .then(res => res.json())
//         .then(data => displayCategories(data.categories))
// }

// const displayCategories = (categories) => {
//     const categoriesContainer = document.getElementById('categories-container')

    

//     categories.forEach(category => {
//         const categoryName = document.createElement('p')
//         categoryName.innerHTML = `<p id="categories-btn" class="hover:bg-[#15803D] hover:text-white p-2">${category.category_name}</p>`

//         categoryName.addEventListener('click', function () {
//                 fetch(`https://openapi.programming-hero.com/api/category/${category.id}`)
//                     .then(res => res.json())
//                     .then(data => displayCategoriesItems(data.plants))
//         })

//         const displayCategoriesItems = (items) => {

//             //=================================================

//              const plantsContainer = document.getElementById('plants-container')
//              plantsContainer.innerHTML = ""

//     items.forEach(item => {
//         const plantsDetails = document.createElement('div')
//         plantsDetails.innerHTML = `
//         <div class="card bg-base-100 p-5 shadow-sm h-full w-full">
//                         <figure class="h-44 overflow-hidden">
//                             <img src="${item.image}" alt="Shoes" class="rounded-xl h-full object-cover w-full" />
//                         </figure>
//                         <div class="mt-3">
//                             <h2 class="card-title">${item.name}</h2>
//                             <p>${item.description}</p>
//                             <div class="card-actions mt-3 justify-between">
//                                 <div class="badge p-3 rounded-3xl font-semibold bg-[#DCFCE7]">${item.category}</div>
//                                 <div class="font-semibold">৳${item.price}</div>
//                             </div>
//                             <button id="cart-btn" class="btn add-to-cart bg-[#15803D] mt-3 text-white btn-block rounded-3xl">Add to Cart</button>
//                         </div>
//                     </div>
//         `

//         plantsContainer.appendChild(plantsDetails)

//     });

//             //=================================================
            
            
            
//         }


//         categoriesContainer.appendChild(categoryName)

//     });
// }

// loadCategories()





















