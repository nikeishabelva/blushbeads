const products = [
  {id:1,name:"Pink Candy",cat:"beads",price:49000,desc:"Pastel pink beads yang sweet banget.",color:"#ef9bb8",icon:"♡"},
  {id:2,name:"Strawberry Kiss",cat:"beads",price:55000,desc:"Beads pink dengan vibe strawberry.",color:"#e8799d",icon:"♥"},
  {id:3,name:"Pearl Bow",cat:"pearl",price:69000,desc:"Pearl putih dengan detail bow manis.",color:"#e7cbd3",icon:"♡"},
  {id:4,name:"Cherry Charm",cat:"charm",price:59000,desc:"Gelang pink dengan charm cherry.",color:"#d95f83",icon:"♥"},
  {id:5,name:"Butterfly Dream",cat:"charm",price:65000,desc:"Charm butterfly untuk look dreamy.",color:"#d8a8d0",icon:"✦"},
  {id:6,name:"Blueberry Milk",cat:"beads",price:52000,desc:"Perpaduan baby blue dan ivory.",color:"#9fc4df",icon:"✿"},
  {id:7,name:"Pink Pearlie",cat:"pearl",price:75000,desc:"Pearl pink soft yang elegant.",color:"#e9a8bb",icon:"✦"},
  {id:8,name:"Flower Garden",cat:"beads",price:57000,desc:"Beads pastel dengan flower charm.",color:"#a9c99c",icon:"✿"},
  {id:9,name:"Bestie Pink",cat:"friendship",price:85000,desc:"Duo bracelet lucu untuk kamu & bestie.",color:"#f09bb5",icon:"♡"},
  {id:10,name:"Little Daisy",cat:"charm",price:56000,desc:"Daisy charm kecil yang super cute.",color:"#f1d36c",icon:"✿"},
  {id:11,name:"Cotton Candy",cat:"beads",price:61000,desc:"Warna pink, lavender, dan putih.",color:"#c8a9dc",icon:"♡"},
  {id:12,name:"Moon Pearl",cat:"pearl",price:79000,desc:"Pearl dengan sentuhan charm bulan.",color:"#b7b7d9",icon:"☾"},
  {id:13,name:"Ribbon Love",cat:"friendship",price:88000,desc:"Friendship bracelet bernuansa ribbon.",color:"#df91b0",icon:"♡"},
  {id:14,name:"Angel Heart",cat:"charm",price:63000,desc:"Heart charm kecil dengan pastel beads.",color:"#f0b6c9",icon:"♡"},
  {id:15,name:"Lavender Cloud",cat:"beads",price:54000,desc:"Soft lavender untuk daily look.",color:"#b7a2d5",icon:"✦"},
  {id:16,name:"Daisy Pearl",cat:"pearl",price:72000,desc:"Pearl bracelet dengan daisy detail.",color:"#eadf9d",icon:"✿"},
  {id:17,name:"Rosy Heart",cat:"charm",price:60000,desc:"Heart beads pink rosy yang manis.",color:"#e783a5",icon:"♥"},
  {id:18,name:"Vanilla Pearl",cat:"pearl",price:74000,desc:"Pearl ivory dengan nuansa vanilla.",color:"#ead9bd",icon:"♡"},
  {id:19,name:"Pastel Rainbow",cat:"beads",price:58000,desc:"Beads pastel warna-warni yang ceria.",color:"#d5b5d9",icon:"★"},
  {id:20,name:"Pink Star",cat:"charm",price:62000,desc:"Star charm kecil dengan beads pink.",color:"#ee9db7",icon:"★"},
  {id:21,name:"Bestie Lavender",cat:"friendship",price:85000,desc:"Duo gelang lavender untuk bestie.",color:"#bba6d8",icon:"♡"},
  {id:22,name:"Strawberry Pearl",cat:"pearl",price:78000,desc:"Pearl pink dengan detail strawberry.",color:"#e89bb1",icon:"♥"},
  {id:23,name:"Ocean Baby",cat:"beads",price:53000,desc:"Baby blue beads dengan aksen ivory.",color:"#91bfd9",icon:"✦"},
  {id:24,name:"Pink Ribbon",cat:"friendship",price:67000,desc:"Gelang pink soft dengan charm ribbon.",color:"#e99bb7",icon:"♡"},
  {id:25,name:"Golden Daisy",cat:"charm",price:64000,desc:"Daisy kecil dengan nuansa warm pastel.",color:"#e6c766",icon:"✿"},
  {id:26,name:"Milk Tea",cat:"beads",price:55000,desc:"Beads cream dan soft brown yang cozy.",color:"#c9aa91",icon:"♡"},
  {id:27,name:"Fairy Pearl",cat:"pearl",price:81000,desc:"Pearl dreamy dengan fairy charm.",color:"#cbb8dd",icon:"✦"},
  {id:28,name:"Pink Lemonade",cat:"beads",price:59000,desc:"Pink dan butter yellow yang fresh.",color:"#edb36d",icon:"♡"},
  {id:29,name:"Cute Clover",cat:"charm",price:61000,desc:"Clover charm dengan beads pastel.",color:"#9fc59b",icon:"✿"},
  {id:30,name:"Dreamy Besties",cat:"friendship",price:90000,desc:"Set duo bracelet pastel untuk bestie.",color:"#e6a7c2",icon:"♡"}
]

let cart = JSON.parse(localStorage.getItem("blushieCart") || "[]");

const rupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);

function renderProducts(filter="all"){
  const grid = document.getElementById("productGrid");
  const list = filter==="all" ? products : products.filter(p=>p.cat===filter);
  grid.innerHTML = list.map(p=>`
    <article class="product">
      <div class="product-visual" style="--accent:${p.color}">
        <span class="badge">${p.cat}</span>
        <div class="bracelet">
          <span class="bead b1">${p.icon}</span><span class="bead b2">♡</span>
          <span class="bead b3">✦</span><span class="bead b4">✿</span>
        </div>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3><p>${p.desc}</p>
        <div class="product-bottom"><span class="price">${rupiah(p.price)}</span>
        <button class="add" onclick="addToCart(${p.id})" aria-label="Tambah ${p.name}">+</button></div>
      </div>
    </article>`).join("");
}

function addToCart(id){
  const item=cart.find(x=>x.id===id);
  if(item) item.qty++; else cart.push({id,qty:1});
  saveCart(); openCart();
}
function saveCart(){localStorage.setItem("blushieCart",JSON.stringify(cart)); renderCart();}
function renderCart(){
  const box=document.getElementById("cartItems"), count=cart.reduce((a,x)=>a+x.qty,0);
  document.getElementById("cartCount").textContent=count;
  if(!cart.length){box.innerHTML='<p class="empty">Keranjangmu masih kosong ♡</p>';document.getElementById("cartTotal").textContent="Rp0";return;}
  let total=0;
  box.innerHTML=cart.map(item=>{
    const p=products.find(x=>x.id===item.id); total+=p.price*item.qty;
    return `<div class="cart-row"><div class="cart-icon">${p.icon}</div><div><h4>${p.name}</h4><small>${rupiah(p.price)}</small>
      <div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${item.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div>
      <button class="remove" onclick="removeItem(${p.id})">hapus</button></div>`;
  }).join("");
  document.getElementById("cartTotal").textContent=rupiah(total);
}
function changeQty(id,n){const x=cart.find(i=>i.id===id);x.qty+=n;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);saveCart();}
function removeItem(id){cart=cart.filter(i=>i.id!==id);saveCart();}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show");}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show");}

document.getElementById("openCart").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderProducts(btn.dataset.filter);
}));

document.getElementById("checkout").onclick=()=>{
  if(!cart.length){alert("Keranjang masih kosong ♡");return;}
  const lines=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `• ${p.name} x${x.qty} — ${rupiah(p.price*x.qty)}`}).join("%0A");
  const total=cart.reduce((a,x)=>a+products.find(y=>y.id===x.id).price*x.qty,0);
  // Ganti nomor di bawah dengan nomor WhatsApp toko, format internasional tanpa +.
  const shopNumber="6281234567890";
  const text=`Halo Blushie! ♡ Saya mau order:%0A${lines}%0A%0ATotal: ${rupiah(total)}%0A%0ANama:%0AAlamat:`;
  window.open(`https://wa.me/${shopNumber}?text=${text}`,"_blank");
};

renderProducts();renderCart();
