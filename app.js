listCarts = []
let products = [
    {
        id: 1,
        product_name: 'Tuk Tuk Tuk Sandal Lucu',
        price: 50000,
        description: 'buat yang main futsal tapi ga pake alas kaki sok cobain pake ini',
        img_url: './img/sandalpooh.jpg',
        qty: 10
    },
    {
        id: 2,
        product_name: 'Lampu Pooh',
        price: 40000,
        description: 'lampu penghantar tidur bersama winnie the pooh yang bohaaayy',
        img_url: './img/lampupooh.jpg',
        qty: 10
    },
    {
        id: 3,
        product_name: 'Charger Pooh',
        price: 300000,
        description: 'charger wireless bentuk winnie the pooh yang gabisa dipinjem ira',
        img_url: './img/chargepooh.jpg',
        qty: 10
    },
]
let cartInit = 0
const listProducts = document.getElementById('list-products')
const cartTotal = document.getElementById('cart-total')
const cartList = document.getElementById('list-cart-products')
const listCartShow = document.getElementById('list-cart-show')
const showListCart = () => {
    listProducts.classList.add("d-none")
    cartList.classList.remove("d-none")
}
const backToProduct = () => {
    listProducts.classList.remove("d-none")
    cartList.classList.add("d-none")
}

window.onload = showDetailCart() 
function showDetailCart() {
    let total= 0

    return listCartShow.innerHTML = listCarts.length === 0 ? 
    `<h2 class="text-danger text-center my-4">Barang belum tambahkan ke dalam keranjang</h2>` : 
    `<div class="table table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>List Product</th>
                    <th>Product Image</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${listCarts.map((produk, index) => {
                 total += produk.qty * produk.price
                 return`<tr>
                    <td>${p=index + 1}</td>
                    <td>${produk.product_name}</td>
                    <td>
                        <img src="${produk.img_url}" alt="image" class="img-thumbnail" width="100"/>
                    </td>
                    <td>${rupiah(produk.price)}</td>
                    <td>${produk.qty}</td>
                    <td>${rupiah(produk.qty * produk.price)}</td>
                    </tr>
                    ${index === listCarts.length -1 && `<tr>
                        <td colspan="5">TOTAL</td>
                        <td>${rupiah(total)}</td>
                    </tr>`}
                    `})}
            </tbody>
        </table>
    </div>`
    cartTotal.innerHTML = cartInit
}

const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}

const productView = (p) => {
    return p.map(product => `<div class="col-lg-4 col-12">
        <div class="card" style="width: 18rem;">
            <img src="${product.img_url}" class="card-img-top" alt="product-1">
            <div class="card-body">
                <h5 class="card-title">${product.product_name}</h5>
                <p class="card-text">Harga: <span>Rp. ${rupiah(product.price)}</span></p>
                <p class="card-text">Qty: <span>${product.qty}</span></p>
                <p class="card-text">Deskripsi: ${product.description}</p>
                <button type="button" class="btn btn-secondary" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-cart-shopping text-warning"></i>
                    Add To Cart
                </button>
            </div>
        </div>
    </div>`).join(",").replaceAll(",", " ")
}

listProducts.innerHTML = productView(products)


function addToCart(id) {

    let newStock = products
    let selectedProduct = newStock.find(produk => produk.id === id)

    if (selectedProduct.qty === 0) {
        alert("maaf ya kmau ga kebagian :( HAHAHHAHA")
        return
    }

    let pushToCart = newStock.filter(produk => produk.id === id).map(newProduk => ({
        ...newProduk,
        qty: 1
    }))

    if (listCarts.length === 0) {
        listCarts = pushToCart
        console.log(`JIKA CARTNYA O: ${JSON.stringify(listCarts)}`)
    } else if (listCarts.length > 0) {
        // CEK LIST CHART NYA
        let ada = listCarts.some(ada => ada.id === id)

        if (ada) {
            listCarts?.map(l => l.id === id ? ({
                ...l,
                qty: l.qty++
            }) : ({ ...l }))
            // console.log(`LIST CHART BARU: ${JSON.stringify(listCarts)}`)
        }

        if (!ada) {
            listCarts.push({ ...selectedProduct, qty: 1 })
            // console.log(`LIST CHART & ID BARU: ${JSON.stringify(listCarts)}`)
        }
    }

    let newQty = newStock.map(p => {
        if (p.id === id) {
            return {
                ...p,
                qty: p.qty - 1
            }
        }
        return p
    })


    products = newQty
    cartInit++
    cartTotal.innerHTML = cartInit
    listProducts.innerHTML = productView(products)
    showDetailCart(listCarts)
}