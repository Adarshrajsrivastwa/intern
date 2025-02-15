let container=document.querySelector('.container');

let res;
const sample= async()=>{
 res= await fetch('https://dummyjson.com/products/categories');
    const response= await res.json();
    console.log(response)

    for (let i = 0; i < response.length; i++) {
        const card = document.createElement('div');
        card.classList.add('detail');
        card.innerHTML = `
            <h1 class="name">${response[i].name}</h1>
            <h3>${response[i].slug}</h3>
            <a class="details" href='${response[i].url}'>More details</a>`;
    
        card.addEventListener('click', async()=> {

           const data= await fetch(`https://dummyjson.com/products/category/${response[i].slug}`);
           const sample= await data.json();

           let category=sample.products;
           console.log(category);

           container.innerHTML = ""; 

           for (let i = 0; i < category.length; i++) {
            const products = document.createElement('div');
            products.classList.add('detail');
            products.innerHTML = `
                <h2 class="product-name">${category[i].title}</h2>
                <p class="description">${category[i].description}</p>
                <p class="price">Price: ${category[i].price}</p>`;
        
            container.appendChild(products); 
        }

        // container.innerHTML = ""; 
        


          
        });
    
        container.appendChild(card);
    }
    
    
}
sample();

