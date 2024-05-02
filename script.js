const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsConteiner = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("card-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("adress-warn")

let cart = [];

//abrir o modal do carinho
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex"
    
})

// fechar o mondal quando clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target == cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click" , function(){
    cartModal.style.display = "none"
})

//Pegando o evento de clickar no icone de carrinho
menu.addEventListener("click", function(event){
    //console.log(event.target)

    let parentButton = event.target.closest(".add-to-cart-btn")
    if(parentButton){
        //retorna o nome do produto
        const name = parentButton.getAttribute("data-name")
        //retorna o preço
        const price = parseFloat(parentButton.getAttribute("data-price"))
        
        //Adicionar no carinho.
        addToCart(name, price)
    }

})

//função para adicionar no carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        //se o item já existe, aumenta a quantidade mais + 1
        existingItem.quantity += 1;
    }else{

        cart.push({
            name, 
            price,
            quantity: 1,
        })

    }
 
    updateCartModal()
  
}

//Atualiza o carrinho
function updateCartModal(){
    cartItemsConteiner.innerHTML = "";
    let total = 0;

    //acessa cada item e passa para o próximo
    cart.forEach(item => {
        //criação de div dentro do container
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.tofixed(2)}</p>
            </div>

           
                <button>
                    Remover
                </button>
            
        </div>
        ` 

        total += item.price * item.quantity;



        cartItemsConteiner.appendChild(cartItemElement)

    })

    cartTotal.textContent = total;

}