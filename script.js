const products=[
{name:"Amul Fresh Milk",cat:"Dairy & Breakfast",price:62,old:70,emoji:"🥛",rating:"4.5",qty:12},
{name:"Tata Salt",cat:"Groceries",price:22,old:26,emoji:"🧂",rating:"4.4",qty:20},
{name:"Red Apples",cat:"Fruits & Vegetables",price:149,old:180,emoji:"🍎",rating:"4.6",qty:15},
{name:"Britannia Bread",cat:"Dairy & Breakfast",price:32,old:46,emoji:"🍞",rating:"4.5",qty:18},
{name:"Lay's Classic",cat:"Snacks & Beverages",price:20,old:25,emoji:"🥔",rating:"4.4",qty:25},
{name:"Dove Shampoo",cat:"Personal Care",price:175,old:220,emoji:"🧴",rating:"4.5",qty:10},
{name:"Maggi Noodles",cat:"Snacks & Beverages",price:12,old:18,emoji:"🍜",rating:"4.3",qty:30},
{name:"Dettol Handwash",cat:"Personal Care",price:99,old:130,emoji:"🧼",rating:"4.6",qty:14}
];
const categories=[["🛒","All Categories"],["🍿","Groceries"],["🍎","Fruits & Vegetables"],["🥛","Dairy & Breakfast"],["🍟","Snacks & Beverages"],["🧴","Personal Care"],["🧹","Household"],["🍼","Baby Care"],["🐶","Pet Care"]];
let cart=JSON.parse(localStorage.getItem("fast_cart")||"[]");
let wishlist=JSON.parse(localStorage.getItem("fast_wishlist")||"[]");

function init(){
  document.getElementById("categoryStrip").innerHTML=categories.map((c,i)=>`<button class="cat ${i===0?"active":""}" onclick="filterCategory('${c[1]}')"><span>${c[0]}</span><b>${c[1]}</b></button>`).join("");
  renderProducts(products);
  updateCart();
  document.getElementById("searchInput").addEventListener("input",e=>{
    const q=e.target.value.toLowerCase();
    renderProducts(products.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q)));
  });
  if(localStorage.getItem("fast_theme")==="light") document.body.classList.add("light");
}
function renderProducts(list){
 document.getElementById("productGrid").innerHTML=list.map((p,i)=>`<article class="product" style="animation-delay:${i*50}ms">
   <button class="heart" onclick="toggleWish('${p.name}')">${wishlist.includes(p.name)?"♥":"♡"}</button>
   <div class="product-img">${p.emoji}</div><h3>${p.name}</h3><small>${p.cat}</small>
   <div class="price">₹${p.price}<span class="old">₹${p.old}</span></div><div class="rating">★ ${p.rating}</div>
   <button class="add" onclick="addToCart('${p.name}')">🛒 Add to Cart</button>
 </article>`).join("")||"<p>No products found.</p>";
}
function filterCategory(cat){
 document.querySelectorAll(".cat").forEach(x=>x.classList.remove("active"));
 const list=cat==="All Categories"?products:products.filter(p=>p.cat===cat);
 renderProducts(list);
 document.getElementById("products").scrollIntoView({behavior:"smooth"});
}
function addToCart(name){
 const p=products.find(x=>x.name===name); const found=cart.find(x=>x.name===name);
 if(found) found.count++; else cart.push({...p,count:1});
 saveCart(); updateCart();
}
function removeCart(name){cart=cart.filter(x=>x.name!==name);saveCart();updateCart();renderCart();}
function saveCart(){localStorage.setItem("fast_cart",JSON.stringify(cart))}
function updateCart(){
 document.getElementById("cartCount").textContent=cart.reduce((a,b)=>a+b.count,0);
 document.getElementById("cartTotal").textContent=cart.reduce((a,b)=>a+b.price*b.count,0);
}
function openCart(){renderCart();document.getElementById("cartModal").classList.add("show")}
function renderCart(){
 const box=document.getElementById("cartItems");
 box.innerHTML=cart.length?cart.map(x=>`<div class="cart-line"><span>${x.emoji} ${x.name} × ${x.count}</span><b>₹${x.price*x.count} <button onclick="removeCart('${x.name}')">×</button></b></div>`).join(""):"<p>Your cart is empty.</p>";
 document.getElementById("modalTotal").textContent=cart.reduce((a,b)=>a+b.price*b.count,0);
}
function toggleWishlist(){alert(wishlist.length?`Wishlist: ${wishlist.join(", ")}`:"Your wishlist is empty.")}
function toggleWish(name){if(wishlist.includes(name))wishlist=wishlist.filter(x=>x!==name);else wishlist.push(name);localStorage.setItem("fast_wishlist",JSON.stringify(wishlist));renderProducts(products)}
function toggleSettings(){document.getElementById("settingsPanel").classList.toggle("show")}
function toggleTheme(){document.body.classList.toggle("light");localStorage.setItem("fast_theme",document.body.classList.contains("light")?"light":"dark")}
function openLogin(){document.getElementById("loginModal").classList.add("show")}
function closeModal(id){document.getElementById(id).classList.remove("show")}
function saveProfile(){
 const profile={name:loginName.value,phone:loginPhone.value,email:loginEmail.value,pin:loginPin.value};
 localStorage.setItem("fast_profile",JSON.stringify(profile));closeModal("loginModal");alert("Profile saved successfully!");
}
function checkout(){
 if(!cart.length)return alert("Your cart is empty.");
 alert("Checkout page ready. Connect your payment/backend API here.");
}
init();