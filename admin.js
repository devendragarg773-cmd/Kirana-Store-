let custom=JSON.parse(localStorage.getItem("fk_admin_products")||"[]");
function tab(id,btn){document.querySelectorAll(".view").forEach(x=>x.classList.add("hidden"));document.getElementById(id).classList.remove("hidden");document.querySelectorAll("aside button").forEach(x=>x.classList.remove("active"));btn.classList.add("active");if(id==="products")drawProducts()}
function openProduct(){productModal.classList.add("show")}
function closeProduct(){productModal.classList.remove("show")}
function saveProduct(){if(!pn.value)return alert("Enter product name");custom.push({name:pn.value,price:pp.value,qty:pq.value,cat:pc.value});localStorage.setItem("fk_admin_products",JSON.stringify(custom));pn.value=pp.value=pq.value="";closeProduct();drawProducts()}
function drawProducts(){adminList.innerHTML=custom.length?custom.map((p,i)=>`<div class="order-mini"><b>${p.name}</b><span>${p.cat}</span><strong>₹${p.price}</strong><button onclick="del(${i})">Delete</button></div>`).join(""):"<p style='color:#77838a;font-size:10px'>No custom products yet. Use Add Product to create one.</p>";productCount.textContent=10+custom.length}
function del(i){custom.splice(i,1);localStorage.setItem("fk_admin_products",JSON.stringify(custom));drawProducts()}
drawProducts();