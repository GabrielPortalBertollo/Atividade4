function validateDatas() {//página buyPassage
    let date= document.getElementById("inputDate").value;
    let quantity= document.getElementById("quantity").value;
    let destiny=document.getElementById("destiny").textContent
    let origin=document.getElementById("origin").textContent
    
    if(originalCost<=0){
        alert("Erro no preço do produto")
        return false
    }
    if(date==undefined || date==""){
        alert("Data inválida")
        console.log("teste data")
        return false
    }
    if(quantity==undefined || quantity=="" || quantity==0){
        alert("Quantidade de passagens inválida")
        console.log("teste quantidade")
        return false
    }
    if(destiny==undefined || destiny==""){
        alert("Erro identificado no destino")
        return false
    }
    if(origin==undefined || origin==""){
        alert("Erro identificado no local de embarque")
        return false
    }
    return true
}


function confirmAddCart() {//página buyPassage
    if (validateDatas()) {
        let id= getNextId();
        let datas={
            id: id,
            originalCost: originalCost,
            date: document.getElementById("inputDate").value,
            quantity: document.getElementById("quantity").value,
            destiny: document.getElementById("destiny").textContent,
            origin: document.getElementById("origin").textContent
        }
        
        localStorage.setItem('id', id)
        localStorage.setItem(id, JSON.stringify(datas))
        window.location.href= "cart.html"
    }
}




function getNextId() {
    const nextId = localStorage.getItem('id')
    if(nextId){
        return parseInt(nextId) + 1;
    }
    else{return 0}
    
}

function loadPage() {
    clearPage();
    let itens= [];
    for (let i = 0; i <= localStorage.getItem("id"); i++) {
        if(localStorage.getItem(i) === null){
            continue
        }
        itens.push(JSON.parse(localStorage.getItem(i)))
    }
    if(itens.length>0){
        loadItens(itens)
    }
    else{
        loadNoItens()
    }
}

function loadItens(itens) {
    let cart= document.getElementById("cart")
    let payment= document.getElementById("formBuyPassages")
    let totalTotal=0;
    //criação dos itens do carrinho
    for (let i = 0; i < itens.length; i++) {
        //criação da div container do inteiro
        let divItem= document.createElement("div")
        divItem.classList.add("passagesContainer")
        //criação da div da esquerda do container geral
        let divInformation = document.createElement("div");
        divInformation.classList.add("informationsContainer");
        //criação do h2 da origem
        let origin= document.createElement("h2")
        origin.innerText="Origem: "+itens[i].origin;
        //criação do h2 do destino
        let destiny= document.createElement("h2")
        destiny.innerText="Destino: "+itens[i].destiny;
        //criação do h2 do total
        let total= document.createElement("h2")
        total.innerText= "Total: R$"+(itens[i].quantity*itens[i].originalCost)
        //criação do h2 do custo unitário
        let unitaryCost= document.createElement("h2")
        unitaryCost.innerText="Preço Unitário: "+itens[i].originalCost;
        let date=document.createElement("h2")
        date.innerText="Data: "+(formateDate(itens[i].date))
        //Fim da div do lado esquerdo
        //criação da div do lado direito do container geral
        let divCRUD= document.createElement("div")
        divCRUD.classList.add("passagesCRUD")
        //criação do botão de reduzir passagens
        let remove= document.createElement("button")
        remove.classList.add("normalButton")
        remove.innerText="-"
        remove.addEventListener("click", ()=>{removePassage(itens[i].id)})
        //criação do h2 de quantidade de passagens
        let quantity= document.createElement("h2")
        quantity.innerHTML=itens[i].quantity
        //criação do botão de aumentar passagens
        let add= document.createElement("button")
        add.classList.add("normalButton")
        add.innerText="+"
        add.addEventListener("click", ()=>{addPassage(itens[i].id)});
        //criação do botão que apaga o item especifico
        let removeItem= document.createElement("button")
        removeItem.classList.add("removeButton")
        removeItem.innerText="Remover"
        removeItem.addEventListener("click", ()=>{deleteItem(itens[i].id)})
        //Fim da div do lado direito
        //inserção dos elementos do item no carrinho
        divCRUD.append(remove,quantity,add,removeItem)
        divInformation.append(origin,destiny,total,unitaryCost,date)
        divItem.append(divInformation,divCRUD)
        cart.append(divItem)
        totalTotal+=(itens[i].quantity*itens[i].originalCost)
    }

    //criação da parte do pagamento
    //Criação do h2 com o total a pagar
    let h2Total=document.createElement("h2")
    h2Total.id="total";
    h2Total.innerText=`Total: R$${totalTotal}`;
    //criação do input de número do cartão
    let cardNumber= document.createElement("input")
    cardNumber.type="number"
    cardNumber.classList.add("inputPayment")
    cardNumber.placeholder="Número do cartão"
    //criação do input da senha do cartão
    let password= document.createElement("input")
    password.type="password"
    password.classList.add("inputPayment")
    password.placeholder="Senha do cartão"
    //criação da div que fica os botões
    let divButtons= document.createElement("div")
    divButtons.id= "paymentDestination"
    //criação do botão de confirmar compra
    let confirmPurchase= document.createElement("button")
    confirmPurchase.id="confirmBuy"
    confirmPurchase.innerText="Confirmar pagamento"
    confirmPurchase.addEventListener("click",()=>{confirmPurchase()})
    //criação do botão de deletar tudo
    let deleteAllItens= document.createElement("button")
    deleteAllItens.id="cancelBuy"
    deleteAllItens.innerText="Esvaziar carrinho"
    deleteAllItens.addEventListener("click", ()=>{localStorage.clear();loadPage();})
    //inserção dos elementos
    divButtons.append(confirmPurchase,deleteAllItens)
    payment.append(h2Total,cardNumber,password,divButtons)


}

function loadNoItens() {
    let section= document.getElementById("secNoItens")
    let title= document.createElement("h1");
    title.id= "noItens";
    title.textContent="Nenhum item adicionado ao carrinho até o momento";
    section.append(title);
}

function removePassage(id) {
    const item = JSON.parse(localStorage.getItem(id));
    if(item.quantity==0){}
    else{

    item.quantity=parseInt(item.quantity)-1
    localStorage.setItem(id, JSON.stringify(item));
    loadPage()
    }
    
}

function addPassage(id) {
    const item = JSON.parse(localStorage.getItem(id));
    item.quantity=parseInt(item.quantity)+1
    localStorage.setItem(id, JSON.stringify(item));
    loadPage()
}


function deleteItem(id) {
    localStorage.removeItem(id)
    loadPage()
}

function deleteAllItens() {
    
}

function clearPage() {
    let sec1= document.getElementById("secNoItens")
    let sec2=document.getElementById("cart")
    let sec3=document.getElementById("formBuyPassages")
    sec1.innerText="";
    sec2.innerText="";
    sec3.innerText="";
    
}

function formateDate(date) {
    const parts = date.split("-");
    const day = parts[2];
    const mouth = parts[1];
    const year = parts[0];
    return `${day}/${mouth}/${year}`;
}




