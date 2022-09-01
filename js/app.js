// fetch api 
const loadAllProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
}
// set menu title 
const setAllMenu = async () => {
    // another system
    // loadAllProducts()
    //     .then(data => console.log(data))
    const data = await loadAllProducts();

    const menu = document.getElementById('all-menu');

    const uniqueArray = [];

    for (const product of data) {
        // console.log(product.category);

        if (uniqueArray.indexOf(product.category) === -1) {

            uniqueArray.push(product.category);

            const li = document.createElement('li');
            li.innerHTML = `<a>${product.category}</a>`;
            menu.appendChild(li);
        }
    }
}
setAllMenu();

// loadAllProducts();

const searchField = document.getElementById('search-field');

searchField.addEventListener('keypress', async (event) => {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');

    // console.log(event.key);
    if (event.key === "Enter") {
        // console.log(event.key);
        const searchValue = searchField.value;
        const allProducts = await loadAllProducts();
        // console.log(allProducts);
        spinner.classList.add('hidden');
        const foundProducts = allProducts.filter(product => product.category.includes(searchValue))
        // console.log(foundProducts);

        const productsContainer = document.getElementById('product-container');
        const notFound = document.getElementById('not-found');

        productsContainer.textContent = '';
        notFound.textContent = '';

        if (foundProducts.length === 0) {
            notFound.innerHTML = `<h2 class="text-2xl text-orange-500 text-center">Not found</h2>`
            return;
        }

        foundProducts.forEach(product => {
            // console.log(product);

            const { category, image, title, description } = product;

            const div = document.createElement('div');
            div.innerHTML = `<div class="card card-compact w-full bg-base-100 shadow-xl p-4">
            <figure><img src=${image} class="h-60 w-full" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${category}</h2>
              <p>${title.length > 20 ? title.slice(0, 20) + '...' : title}</p>
              <div class="card-actions justify-end">
              <label for="my-modal-3" onclick="showModal('${description}','${image}')" class="btn btn-primary modal-button">Show Details</label>
              </div>
            </div>
          </div>`
            productsContainer.appendChild(div);
        });
    }
})

const showModal = (description, image) => {
    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = '';
    modalBody.innerHTML = `<p class="py-4">${description}
</p>
<img src="${image}">`
}