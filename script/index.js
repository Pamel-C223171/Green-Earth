// console.log("connected")

//--------------------------------------------

// const categoriesBtn = document.getElementById("categories-btn").addEventListener('click', function () {
//     const loadCategoriesItems = () => {
//     fetch('https://openapi.programming-hero.com/api/category/1')
//     .then(res => res.json())
//     .then(data => console.log(data))
// } 
// loadCategoriesItems()

// })


//---------------------------------------------------------------

const loadPlants = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayPlants(data.plants))
}

// "id": 1,
//       "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//       "name": "Mango Tree",
//       "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//       "category": "Fruit Tree",
//       "price": 500

const displayPlants = (plants) => {
    const plantsContainer = document.getElementById('plants-container')

    plants.forEach(plant => {
        const plantsDetails = document.createElement('div')
        plantsDetails.innerHTML = `
        <div class="card bg-base-100 p-5 shadow-sm h-full w-full">
                        <figure class="h-44 overflow-hidden">
                            <img src="${plant.image}" alt="Shoes" class="rounded-xl h-full object-cover w-full" />
                        </figure>
                        <div class="mt-3">
                            <h2 class="card-title">${plant.name}</h2>
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

loadPlants()

//---------------------------------------------------------------

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories-container')

    categories.forEach(category => {
        const categoryName = document.createElement('p')
        categoryName.innerHTML = `<p id="categories-btn" class="hover:bg-[#15803D] hover:text-white p-2">${category.category_name}</p>`

        categoryName.addEventListener('click', function () {
                fetch(`https://openapi.programming-hero.com/api/category/${category.id}`)
                    .then(res => res.json())
                    .then(data => displayCategoriesItems(data.plants))
        })

        const displayCategoriesItems = (items) => {

            //=================================================

             const plantsContainer = document.getElementById('plants-container')
             plantsContainer.innerHTML = ""

    items.forEach(item => {
        const plantsDetails = document.createElement('div')
        plantsDetails.innerHTML = `
        <div class="card bg-base-100 p-5 shadow-sm h-full w-full">
                        <figure class="h-44 overflow-hidden">
                            <img src="${item.image}" alt="Shoes" class="rounded-xl h-full object-cover w-full" />
                        </figure>
                        <div class="mt-3">
                            <h2 class="card-title">${item.name}</h2>
                            <p>${item.description}</p>
                            <div class="card-actions mt-3 justify-between">
                                <div class="badge p-3 rounded-3xl font-semibold bg-[#DCFCE7]">${item.category}</div>
                                <div class="font-semibold">৳${item.price}</div>
                            </div>
                            <button class="btn add-to-cart bg-[#15803D] mt-3 text-white btn-block rounded-3xl">Add to Cart</button>
                        </div>
                    </div>
        `

        plantsContainer.appendChild(plantsDetails)

    });

            //=================================================
            
            
            
        }


        categoriesContainer.appendChild(categoryName)

    });
}

loadCategories();






// <div class="card bg-base-100 p-5 shadow-sm">
//                         <figure >
//                             <img src="./assets/about.png" alt="Shoes" class="rounded-xl" />
//                         </figure>
//                         <div class="mt-3">
//                             <h2 class="card-title">Mango Tree</h2>
//                             <p>A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its
//                                 dense green</p>
//                             <div class="card-actions mt-3 justify-between">
//                                 <div class="badge p-3 rounded-3xl font-semibold bg-[#DCFCE7]">Fruit Tree</div>
//                                 <div class="font-semibold">৳500</div>
//                             </div>
//                             <button class="btn bg-[#15803D] mt-3 text-white btn-block rounded-3xl">Add to Cart</button>
//                         </div>
//                     </div>