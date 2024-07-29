function confirmPurchase() {
    if (confirm("Deseja confirmar a compra destas passagens?")){
        alert("Compra realizada com sucesso. Voltando para a página inicial.")
        window.location.href = "../index.html";
    }
    else{
        event.preventDefault();
    }
    
}