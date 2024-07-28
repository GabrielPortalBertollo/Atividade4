function confirmMessage() {
    if (confirm("Tem certeza de que deseja enviar esta mensagem?")){
        alert("Mensagem enviada com sucesso, retornando para a página inicial.")
        window.location.href = "../index.html";
    }
    else{
        event.preventDefault();
    }
    
}