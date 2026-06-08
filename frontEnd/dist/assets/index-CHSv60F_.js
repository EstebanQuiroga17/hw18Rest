(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const l="http://localhost:3013/computerstore",u=document.getElementById("customerForm"),d=document.getElementById("customerTableBody"),p=document.getElementById("totalSpent"),g=document.getElementById("name"),y=document.getElementById("age"),f=document.getElementById("moneySpent");document.addEventListener("DOMContentLoaded",()=>{c(),i()});u.addEventListener("submit",async t=>{t.preventDefault();const e={name:g.value,age:parseInt(y.value),moneySpent:parseFloat(f.value)};try{(await fetch(`${l}/customer`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok?(alert("Cliente agregado exitosamente"),u.reset(),c(),i()):alert("Error al agregar el cliente")}catch(n){console.error("Error:",n),alert("Error de conexión con el servidor")}});let a=[];async function c(){try{if(a=await(await fetch(`${l}/customers`)).json(),d.innerHTML="",a.length===0){d.innerHTML='<tr><td colspan="5" class="text-center py-3 text-muted">No hay clientes registrados</td></tr>';return}a.forEach(e=>{const n=document.createElement("tr");n.id=`row-${e.id}`,n.innerHTML=`
                <td class="px-3 align-middle">${e.id}</td>
                <td class="px-3 align-middle">${e.name}</td>
                <td class="px-3 align-middle">${e.age}</td>
                <td class="px-3 align-middle">$${e.moneySpent!=null?parseFloat(e.moneySpent).toFixed(2):"0.00"}</td>
                <td class="px-3 align-middle">
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm" onclick="editCustomer('${e.id}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${e.id}')">Eliminar</button>
                    </div>
                </td>
            `,d.appendChild(n)})}catch(t){console.error("Error cargando clientes:",t),d.innerHTML='<tr><td colspan="5" class="text-center py-3 text-danger">Error al cargar clientes</td></tr>'}}async function i(){try{const e=await(await fetch(`${l}/customers/totalSpent`)).json();p.textContent=parseFloat(e.total).toFixed(2)}catch(t){console.error("Error cargando total:",t),p.textContent="0.00"}}function b(t){const e=a.find(s=>s.id==t);if(!e)return;const n=document.getElementById(`row-${t}`);n&&(n.innerHTML=`
        <td class="px-3 align-middle">${e.id}</td>
        <td class="px-3 align-middle">
            <input type="text" id="edit-name-${t}" class="form-control form-control-sm" value="${e.name}">
        </td>
        <td class="px-3 align-middle">
            <input type="number" id="edit-age-${t}" class="form-control form-control-sm" value="${e.age}">
        </td>
        <td class="px-3 align-middle">
            <input type="number" id="edit-moneySpent-${t}" step="0.01" min="0" class="form-control form-control-sm" value="${e.moneySpent!=null?e.moneySpent:0}">
        </td>
        <td class="px-3 align-middle">
            <div class="d-flex gap-2">
                <button class="btn btn-success btn-sm" onclick="saveCustomer('${t}')">Guardar</button>
                <button class="btn btn-secondary btn-sm" onclick="cancelEdit('${t}')">Cancelar</button>
            </div>
        </td>
    `)}function E(t){const e=a.find(s=>s.id==t);if(!e)return;const n=document.getElementById(`row-${t}`);n&&(n.innerHTML=`
        <td class="px-3 align-middle">${e.id}</td>
        <td class="px-3 align-middle">${e.name}</td>
        <td class="px-3 align-middle">${e.age}</td>
        <td class="px-3 align-middle">$${e.moneySpent!=null?parseFloat(e.moneySpent).toFixed(2):"0.00"}</td>
        <td class="px-3 align-middle">
            <div class="d-flex gap-2">
                <button class="btn btn-primary btn-sm" onclick="editCustomer('${e.id}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${e.id}')">Eliminar</button>
            </div>
        </td>
    `)}async function $(t){const e=document.getElementById(`edit-name-${t}`),n=document.getElementById(`edit-age-${t}`),s=document.getElementById(`edit-moneySpent-${t}`);if(!e||!n||!s)return;const o={name:e.value,age:parseInt(n.value),moneySpent:parseFloat(s.value)};try{(await fetch(`${l}/customer/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).ok?(c(),i()):alert("Error al actualizar el cliente")}catch(r){console.error("Error guardando cliente:",r),alert("Error de conexión con el servidor")}}async function x(t){try{(await fetch(`${l}/customer/${t}`,{method:"DELETE"})).ok?(c(),i()):alert("Error al eliminar el cliente")}catch(e){console.error("Error eliminando cliente:",e),alert("Error de conexión con el servidor")}}window.editCustomer=b;window.deleteCustomer=x;window.saveCustomer=$;window.cancelEdit=E;
