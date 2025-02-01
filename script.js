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
    document.getElementById('view-web-btn').style.display = 'block';
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

function visualizarCodigoPagina() {
    // Pega o conteúdo HTML gerado
    const htmlContent = document.getElementById('html-output').innerHTML;

    // Cria um novo documento HTML para exibir em uma nova aba
    const newWindow = window.open('', '_blank');
    
    // Escreve o HTML da nova aba
    newWindow.document.write('<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Código HTML Gerado</title></head><body>');
    
    // Adiciona um botão para copiar o código
    newWindow.document.write('<button id="copyButton">Copiar Código</button>');
    
    // Exibe o código HTML gerado como texto dentro de um <pre> para manter a formatação
    newWindow.document.write('<pre id="htmlCode">' + escapeHtml(htmlContent) + '</pre>');

    // Adiciona a função de copiar ao botão
    newWindow.document.write(`
        <script>
            document.getElementById('copyButton').addEventListener('click', function() {
                // Seleciona o conteúdo do <pre>
                const htmlCode = document.getElementById('htmlCode');
                const range = document.createRange();
                range.selectNodeContents(htmlCode);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                
                // Copia o conteúdo para a área de transferência
                document.execCommand('copy');
                
                // Opcional: Alerta ao usuário que o conteúdo foi copiado
                alert('Código copiado para a área de transferência!');
            });
        </script>
    `);

    // Fecha o documento para renderizar
    newWindow.document.write('</body></html>');
    newWindow.document.close();
}

// Função auxiliar para escapar caracteres especiais no HTML
function escapeHtml(unsafe) {
    return unsafe.replace(/[&<>"']/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m];
    });
}


// Função para escapar caracteres especiais do HTML
function escapeHtml(html) {
    return html.replace(/[&<>"']/g, function(match) {
        const escape = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };
        return escape[match];
    });
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
