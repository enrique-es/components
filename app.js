class Product {
    constructor(name, price, count){
        this.name = name;
        this.price = price;
        this.count = count;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card  mb-4">
                <div class="card-body">
                    <strong>Nombre</strong>: ${product.name}
                    <strong>Precio</strong>: ${product.price}
                    <strong>Cantidad</strong>: ${product.count}
                    <a href='#' class='btn btn-danger' name='delete'>Delete</a>
                </div>
            </div>
            `;
            productList.appendChild(element);
            //document.getElementById("product-list").appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }


    deleteProduct(element) {
        if(element.name === 'delete'){
            console.log(element.parentElement.parentElement.parentElement.remove());
            this.showMessage("Componente Eliminado", "info");
        }
    }   

    showMessage(message, cssClass) {
        const div = document.createElement("div")
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        //mostrando en DOM
        const container = document.querySelector(".container");
        const app = document.querySelector("#app");
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 3000)
    }
}

//DOM Eventos

document.getElementById('product-form')
    .addEventListener('submit', function(e){
        const name = document.getElementById('name').value
        const price = document.getElementById('price').value
        const count = document.getElementById('count').value

        const product = new Product(name,price,count);
        
        const ui = new UI();

        if(name==='' || price==='' || count===''){
            return ui.showMessage("Completa los campos por favor", "danger");
        }

        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Componente Agregado', 'success')

        e.preventDefault();
});


document.getElementById('product-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
})