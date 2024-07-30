let originalCost=0;


let quantity=document.getElementById("quantity")//linkando o elemento com id quantity em uma variavel para adicionar um evento
quantity.addEventListener('change', () => {
let totalCost=document.getElementById("totalCost")
totalCost.textContent=originalCost*parseInt(quantity.value)
})

document.addEventListener("DOMContentLoaded", () => {//evento para quando carregar a página pegar os dados das viagens e depois o id, procurar os dados corretos e preencher os dados iniciais
setTravels();
})


let travel;

function setTravels(){
    const ajax = new XMLHttpRequest()
    ajax.open('GET', '../json/travels.json')
    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            const JSONTravels = ajax.responseText
            travel = JSON.parse(JSONTravels)
            loadDatas()
        }
    }
    ajax.send()
    
}



function loadDatas() {
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
}