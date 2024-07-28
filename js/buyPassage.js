let originalCost=0;





function confirmPurchase() {
    if (confirm("Deseja confirmar a compra destas passagens?")){
        alert("Compra realizada com sucesso. Voltando para a página inicial.")
        window.location.href = "../index.html";
    }
    else{
        event.preventDefault();
    }
    
}

let quantity=document.getElementById("quantity")//linkando o elemento com id quantity em uma variavel para adicionar um evento
quantity.addEventListener('change', () => {
let totalCost=document.getElementById("totalCost")
totalCost.textContent=originalCost*parseInt(quantity.value)
})

document.addEventListener("DOMContentLoaded", () => {//evento para quando carregar a página pegar o id, procurar os dados corretos e preencher os dados iniciais
let id= document.location.href.split("=")[1]
let datas=[];
for (const travelDatas of travel) {
    if(travelDatas.id==id){
        datas.push(travelDatas.destiny)
        datas.push(travelDatas.origin)
        datas.push(travelDatas.cost)
        break;
    }}//fim if e for
    let destiny=document.getElementById("destiny")//linkagem das variaveis com os elementos
    let origin=document.getElementById("origin")
    let cost=document.getElementById("cost")
    destiny.textContent=datas[0];//mudando os valores dos elementos no html pelo que foi salvo
    origin.textContent=datas[1];
    cost.textContent=datas[2];
    originalCost=parseInt(datas[2]);//salvando o custo original
})