const adminProducts=JSON.parse(localStorage.getItem("fast_admin_products")||"[]");
function showTab(id){
 document.querySelectorAll(".tab").forEach(x=>x.classList.add("hidden"));
 document.getElementById(id).classList.remove("hidden");
 document.querySelectorAll("aside button").forEach(x=>x.classList.remove("active"));
 event.currentTarget.classList.add("active");
}
function drawProducts(){
 const box=document.getElementById("adminProducts");
 box.innerHTML=adminProducts.map((p,i)=>`<p><b>${p.name}</b> — ₹${p.price} — Qty ${p.qty} <button onclick="deleteProduct(${i})">Delete</button></p>`).join("")||"<p>No custom products added.</p>";
 document.getElementById("sProducts").textContent=8+adminProducts.length;
}
document.getElementById("productForm").addEventListener("submit",e=>{
 e.preventDefault();
 adminProducts.push({name:pName.value,price:pPrice.value,qty:pQty.value,cat:pCat.value});
 localStorage.setItem("fast_admin_products",JSON.stringify(adminProducts));
 e.target.reset();drawProducts();
});
function deleteProduct(i){adminProducts.splice(i,1);localStorage.setItem("fast_admin_products",JSON.stringify(adminProducts));drawProducts()}
drawProducts();