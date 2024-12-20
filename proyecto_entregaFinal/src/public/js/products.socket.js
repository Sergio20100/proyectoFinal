const socket = io();

const productsList = document.getElementById("products-list");
const productsForm = document.getElementById("products-form");
const inputProductId = document.getElementById("input-product-id");
const btnDeleteProduct = document.getElementById("btn-delete-product");
const errorMessage = document.getElementById("error-message");

socket.on("products-list", (data) => {
    const products = data.products.docs ?? [];
    productsList.innerText = "";

    products.forEach((product) => {
        productsList.innerHTML += `
                            <tr>
                                <th scope="row">${product.id}</th>
                                <td>${product.title}</td>
                                <td>${product.description}</td>
                                <td>${product.code}</td>
                                <td>${product.price}</td>
                                <td>${product.category}</td>
                                <td>${product.status}</td>
                                <td>${product.stock}</td>  
                            </tr>
        `;
    });
});

productsForm.onsubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    errorMessage.innerText = "";

    form.reset();
    console.log(formData.get("status"))
    socket.emit("insert-product", {
        title: formData.get("title"),
        description: formData.get("description"),
        code: formData.get("code"),
        price: formData.get("price"),
        category: formData.get("category"),
        status: formData.get("status") || "off",
        stock: formData.get("stock"),
    });
};

btnDeleteProduct.onclick = () => {
    const id = inputProductId.value;
    inputProductId.value = "";
    errorMessage.innerText = "";
    // console.log("se va a eliminar: ",id);
    socket.emit("delete-product", { id });
    
};

socket.on("error-message", (data) => {
    errorMessage.innerText = data.message;
});