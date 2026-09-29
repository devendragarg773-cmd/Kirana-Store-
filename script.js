const products=[
{name:"Amul Fresh Milk",cat:"Dairy & Breakfast",price:62,old:70,emoji:"🥛",rating:"4.8",unit:"1 litre",discount:"11% OFF"},
{name:"Red Apples",cat:"Fruits & Vegetables",price:149,old:190,emoji:"🍎",rating:"4.9",unit:"1 kg",discount:"22% OFF"},
{name:"Fresh Broccoli",cat:"Fruits & Vegetables",price:55,old:70,emoji:"🥦",rating:"4.7",unit:"500 g",discount:"21% OFF"},
{name:"Tata Salt",cat:"Groceries",price:22,old:28,emoji:"🧂",rating:"4.7",unit:"1 kg",discount:"21% OFF"},
{name:"Britannia Bread",cat:"Dairy & Breakfast",price:35,old:45,emoji:"🍞",rating:"4.6",unit:"400 g",discount:"22% OFF"},
{name:"Lay's Classic",cat:"Snacks & Beverages",price:20,old:25,emoji:"🥔",rating:"4.8",unit:"50 g",discount:"20% OFF"},
{name:"Coca Cola",cat:"Snacks & Beverages",price:45,old:50,emoji:"🥤",rating:"4.7",unit:"750 ml",discount:"10% OFF"},
{name:"Dove Shampoo",cat:"Personal Care",price:175,old:220,emoji:"🧴",rating:"4.8",unit:"180 ml",discount:"20% OFF"},
{name:"Aashirvaad Atta",cat:"Groceries",price:275,old:310,emoji:"🌾",rating:"4.8",unit:"5 kg",discount:"11% OFF"},
{name:"Fresh Bananas",cat:"Fruits & Vegetables",price:49,old:65,emoji:"🍌",rating:"4.6",unit:"1 dozen",discount:"24% OFF"}
];
const cats=[["🍎","Fruits & Vegetables","Fresh picks"],["🥛","Dairy & Breakfast","Morning essentials"],["🌾","Groceries","Daily staples"],["🍿","Snacks & Beverages","Crunch & sip"],["🧴","Personal Care","Care essentials"],["🧹","Household","Home needs"],["🍼","Baby Care","Little ones"],["🐶","Pet Care","For your buddy"]];
let cart=JSON.parse(localStorage.getItem("fk_cart")||"[]"), wishlist=JSON.parse(localStorage.getItem("fk_wish")||"[]");
function init(){
document.getElementById("categoryGrid").innerHTML=cats.map(c=>`<button class="cat-card" onclick="filterProducts('${c[1]}')"><span class="emoji">${c[0]}</span><b>${c[1]}</b><small>${c[2]}</small></button>`).join("");
render(products);updateBadges();
document.getElementById("search").addEventListener("input",e=>{let q=e.target.value.toLowerCase();render(products.filter(p=>(p.name+p.cat).toLowerCase().includes(q)))});
let end=Date.now()+8*3600e3+42*60e3+17e3;setInterval(()=>{let x=Math.max(0,end-Date.now()),s=Math.floor(x/1000);let h=Math.floor(s/3600),m=Math.floor(s%3600/60),ss=s%60;document.getElementById("timer").textContent=[h,m,ss].map(v=>String(v).padStart(2,"0")).join(":")},1000);
}
function render(list){document.getElementById("productGrid").innerHTML=list.map((p,i)=>`<article class="product" style="animation-delay:${i*45}ms"><div class="product-image"><span class="discount">${p.discount}</span><button class="wish" onclick="toggleWish('${p.name}')">${wishlist.includes(p.name)?"♥":"♡"}</button>${p.emoji}</div><h3>${p.name}</h3><div class="meta">${p.unit} • ${p.cat}</div><div class="stars">★★★★★ <span>${p.rating}</span></div><div class="price">₹${p.price}<del>₹${p.old}</del></div><button class="add" onclick="add('${p.name}')">ADD TO CART</button></article>`).join("")}
function filterProducts(cat){document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));let list=cat==="All"?products:products.filter(p=>p.cat===cat);render(list);document.getElementById("products").scrollIntoView({behavior:"smooth",block:"start"})}
function showAll(){filterProducts("All");document.getElementById("products").scrollIntoView({behavior:"smooth"})}
function scrollToProducts(){document.getElementById("products").scrollIntoView({behavior:"smooth"})}
function add(name){let p=products.find(x=>x.name===name),x=cart.find(x=>x.name===name);x?x.qty++:cart.push({...p,qty:1});save();updateBadges();showToast(p.name+" added to cart 🛒")}
function save(){localStorage.setItem("fk_cart",JSON.stringify(cart));localStorage.setItem("fk_wish",JSON.stringify(wishlist))}
function updateBadges(){let count=cart.reduce((a,x)=>a+x.qty,0),total=cart.reduce((a,x)=>a+x.price*x.qty,0);cartCount.textContent=count;cartTotal.textContent=total;wishBadge.textContent=wishlist.length}
function toggleWish(name){wishlist.includes(name)?wishlist=wishlist.filter(x=>x!==name):wishlist.push(name);save();updateBadges();render(products)}
function openDrawer(type){backdrop.classList.add("show");drawer.classList.add("open");let title=type==="cart"?"Your Cart":type==="wishlist"?"Your Wishlist":"Settings";drawerTitle.textContent=title;if(type==="cart")drawCart();else if(type==="wishlist")drawWish();else drawSettings()}
function closeDrawers(){backdrop.classList.remove("show");drawer.classList.remove("open")}
function drawCart(){if(!cart.length){drawerBody.innerHTML='<div class="empty">🛒<h3>Your cart is empty</h3><small>Add something fresh to get started.</small></div>';return}drawerBody.innerHTML=cart.map(x=>`<div class="drawer-product"><div class="pic">${x.emoji}</div><div><b>${x.name}</b><small>₹${x.price} × ${x.qty}</small></div><button class="remove" onclick="removeItem('${x.name}')">×</button></div>`).join("")+`<div class="drawer-total"><b>Total</b><b>₹${cart.reduce((a,x)=>a+x.price*x.qty,0)}</b></div><button class="primary full" onclick="checkout()">Proceed to Checkout →</button>`}
function drawWish(){let a=products.filter(x=>wishlist.includes(x.name));drawerBody.innerHTML=a.length?a.map(x=>`<div class="drawer-product"><div class="pic">${x.emoji}</div><div><b>${x.name}</b><small>₹${x.price}</small></div><button class="remove" onclick="toggleWish('${x.name}');drawWish()">×</button></div>`).join(""):'<div class="empty">♡<h3>Nothing saved yet</h3><small>Tap the heart on a product.</small></div>'}
function drawSettings(){drawerBody.innerHTML=`<div class="setting-item"><div>👑<b> Owner / Admin Panel</b><small>Full store management</small></div><button class="primary" onclick="location.href='admin.html'">Open</button></div><div class="setting-item"><div>🌗<b> Appearance</b><small>Light / Dark mode</small></div><button class="ghost" onclick="toggleTheme()">Switch</button></div><div class="setting-item"><div>🎧<b> Support</b><small>24/7 customer help</small></div><span>›</span></div><div class="setting-item"><div>ℹ️<b> About</b><small>FreshKart information</small></div><span>›</span></div>`}
function removeItem(name){cart=cart.filter(x=>x.name!==name);save();updateBadges();drawCart()}
function checkout(){if(!cart.length)return showToast("Your cart is empty");showToast("Checkout flow ready — connect payment/backend here.");}
function toggleCats(){catPop.classList.toggle("show");catPopInner.innerHTML=cats.map(c=>`<button onclick="filterProducts('${c[1]}');catPop.classList.remove('show')">${c[0]} &nbsp; ${c[1]}</button>`).join("")}
function toggleTheme(){document.body.classList.toggle("light");showToast(document.body.classList.contains("light")?"Light mode on ☀️":"Dark mode on 🌙")}
function openModal(id){document.getElementById(id).classList.add("show")}
function closeModal(id){document.getElementById(id).classList.remove("show")}
function saveProfile(){localStorage.setItem("fk_profile",JSON.stringify({name:name.value,phone:phone.value,email:email.value,pin:pin.value}));closeModal("loginModal");showToast("Profile saved successfully ✓")}
function showToast(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>toast.classList.remove("show"),2200)}
window.addEventListener("load",init);