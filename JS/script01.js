// Função para carregar os manuais automaticamente do GitHub
async function carregarManuais() {
    const usuario = "lugmartins";
    const repositorio = "workbookchip";
    const pasta = "PDF CARGAS";

    const apiUrl = `https://api.github.com/repos/${usuario}/${repositorio}/contents/${encodeURIComponent(pasta)}`;

    try {
        const resposta = await fetch(apiUrl);
        const arquivos = await resposta.json();

        const container = document.getElementById("lista-manuais");
        container.innerHTML = "";

        arquivos
            .filter(item => item.name.toLowerCase().endsWith(".pdf"))
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(item => {
                const nomeArquivo = item.name.replace(".pdf", "");
                const link = document.createElement("a");
                link.href = `${pasta}/${item.name}`;
                link.target = "_blank";
                link.textContent = nomeArquivo;
                container.appendChild(link);
                container.appendChild(document.createElement("br"));
            });
    } catch (erro) {
        document.getElementById("lista-manuais").textContent = "Erro ao carregar manuais.";
        console.error(erro);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.sidebar a');
    const sections = document.querySelectorAll('.content > div');
    const tabelaLinks = document.querySelectorAll('.tabela-menu a');

    carregarManuais();
    
    // Função para ativar a classe active nos links
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove a classe active de todos os links
            links.forEach(link => link.classList.remove('active'));
            
            // Adiciona a classe active ao link clicado
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = section.id === targetId ? 'block' : 'none';
            });

            // Remove a classe active de todos os links do menu de montadoras
            tabelaLinks.forEach(link => link.classList.remove('active'));

            // Adiciona a classe active ao primeiro link do menu de montadoras se "Tabela" for clicado
            if (this.getAttribute('href') === '#tabela') {
                tabelaLinks[0].classList.add('active');
            }
        });
    });

    // Mostrar a primeira seção por padrão
    sections.forEach((section, index) => {
        section.style.display = index === 2 ? 'block' : 'none';
    });

    // Adicionar a classe active ao link "Manuais" ao carregar a página
    document.querySelector('.sidebar a[href="#manuais"]').classList.add('active');

    // Scroll horizontal na tabela-container
    const tabelaContainer = document.querySelector('.tabela-container');
    tabelaContainer.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            tabelaContainer.scrollLeft += e.deltaY;
        }
    });

    // Adiciona a funcionalidade de clicar nos links do menu de montadoras
    tabelaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove a classe active de todos os links do menu de montadoras
            tabelaLinks.forEach(link => link.classList.remove('active'));

            // Adiciona a classe active ao link clicado
            this.classList.add('active');
        });
    });
});
