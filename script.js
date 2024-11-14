function converterMarkdown() {
    // Pega o conteúdo do campo de texto
    const markdown = document.getElementById('markdown').value.trim();  

    // Verifica se o usuário digitou algo
    if (!markdown) {
        mostrarErro("Por favor, insira algum conteúdo em Markdown.");
        return;
    } else {
        // Limpa a mensagem de erro, se houver
        document.getElementById('error-message').style.display = 'none';
    }

    // Cria uma instância do conversor Showdown
    const converter = new showdown.Converter();

    // Usa o Showdown para converter o Markdown em HTML
    const html = converter.makeHtml(markdown); 

    // Exibe o HTML gerado na área de resultado
    document.getElementById('html-output').innerHTML = html;

    // Mostra o botão de download
    document.getElementById('download-btn').style.display = 'block';
}

function mostrarErro(mensagem) {
    // Exibe a mensagem de erro
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = mensagem;
    errorMessageDiv.style.display = 'block';
}

function baixarHTML() {
    // Pega o conteúdo HTML gerado
    const htmlContent = document.getElementById('html-output').innerHTML;

    // Cria um link temporário para download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Defina o nome do arquivo e a URL para download
    link.href = url;
    link.download = 'conteudo_markdown.html';
    
    // Simula o clique no link para iniciar o download
    link.click();

    // Libera o URL do Blob
    URL.revokeObjectURL(url);
}

// Exibe o botão de voltar ao topo quando o usuário rola a página
window.onscroll = function() {
    var backToTopButton = document.getElementById("back-to-top");

    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
};

// Função para rolar suavemente até o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
