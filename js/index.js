document.addEventListener("DOMContentLoaded", function() {//evento criado para carregar coisas padrões como as opções de cidades tanto de origem como de destino e os pacotes em si
    setTravels();
});
let travel;

function setTravels(){
    const ajax = new XMLHttpRequest()
    ajax.open('GET', './json/travels.json')
    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            const JSONTravels = ajax.responseText
            travel = JSON.parse(JSONTravels)
            addOptions("location","destiny")//chamando a variavel que adiciona as opções nos selects enviando o id do select e o elemento do travel que ele deve pegar
            addOptions("origin","origin");
            buildCards(travel);
        }
    }
    ajax.send()
}


function addOptions(selectId,travelElement) {
    let select = document.getElementById(selectId);//pegar o select dos destinos/origens para adicionar as opções
    let usedLocation=[];
    for (let i = 0; i < travel.length; i++) {
        let used=0;
        for (let u = 0; u < usedLocation.length; u++) {//verificação de se ja foi adicionado a localização atual
            if(usedLocation[u]==travel[i][travelElement]){
                used=1;
                break;
            }
        }
        if(used==0){//if para caso não tenha sido adicionado ainda
            opt = document.createElement('option');
            opt.value = travel[i][travelElement];
            opt.innerHTML = travel[i][travelElement];
            usedLocation.push(travel[i][travelElement]);
            select.appendChild(opt);
        }
    }
}


function buildCards(datas) {
    resetResult();
    let result= document.getElementById("result");//pegar o select que ficará os cards para inserir
        resultDiv=document.createElement('div');
        resultDiv.classList.add("resultDiv");//comando para adicionar a classe resultRow na div
        for (const data of datas) {
            let card=document.createElement('div');
            card.classList.add("card")
            let id=data.id;//variavel criada para enviar como parametro no evento do card
            card.addEventListener("click", function(){buyTicket(id)});//card montado
            let title=document.createElement("h2");
            title.classList.add("cardTitle")
            title.innerHTML=data.destiny;//titulo montado
            let origin=document.createElement("p")
            origin.innerHTML="Origem: "+data.origin;//local de origem montado
            let cust=document.createElement("p")
            cust.innerHTML="Custo: R$"+data.cost;//custo da viagem montado
            let description=document.createElement("p")
            description.innerHTML=data.description;//descrição montada
            //iniciando inserção dos dados
            card.append(title,origin,cust,description);//inserção dos dados no card
            resultDiv.append(card)//inserção do card na linha
        }
        result.append(resultDiv);//inserção da linha na parte dos resultados
    }


function resetResult() {
    let result= document.getElementById("result");
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}



function search() {//função para filtrar as viagens
    let originInput= document.getElementById("origin").value;
    let destinyInput= document.getElementById("location").value;
    let filteredTravel=[];//zerando o filtro caso tenha algo;
    for (let i = 0; i < travel.length; i++) {//for para percorrer todas as viagens
        if((originInput==0||originInput==travel[i].origin)&&(destinyInput==0||destinyInput==travel[i].destiny)){//filtrando os que se encaixarem com o filtro selecionado
            filteredTravel.push(travel[i]);
        }
    }
    if(filteredTravel.length==0){//if para caso não tenha nenhuma viagem com os filtros selecionados
        let noTravelMessage=document.createElement("h2");
        noTravelMessage.classList.add("noTravels")
        noTravelMessage.innerHTML="Nenhuma viagem com estas especificações encontrada."
        resetResult();
        let result= document.getElementById("result");//pegar o select que ficará a mensagem
        result.append(noTravelMessage)
    }
    else{buildCards(filteredTravel);}


    
}



function buyTicket(id) {
    window.location.href = "views/buyPassage.html?id="+id;
    
}




