document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('.section');
    const menuLinks = document.querySelectorAll('.custom-menu a');
    const homeLink = document.querySelector('.page-title-image');
    const initialTarget = localStorage.getItem('imageClicked'); // Verifica se o clique na imagem foi armazenado

    // Função para ativar uma seção e rolar a tela
function activateSection(targetId, shouldScroll = true) {
sections.forEach(section => {
    section.classList.remove('active');
});

const targetSection = document.getElementById(targetId);
if (targetSection) {
    targetSection.classList.add('active');
    if (shouldScroll) {
        const isDicomReitoria = targetId === "dicom-reitoria";
        const targetOffset = targetSection.offsetTop;

        if (isDicomReitoria) {
            window.scrollTo({
                top: targetOffset - document.querySelector('.page-title').offsetHeight,
                behavior: 'smooth'
            });
        } else {
            const sectionHeight = targetSection.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollPosition = targetOffset - ((windowHeight - sectionHeight) / 2);
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    }
}
}

    // Ação ao clicar na imagem "Home"
    homeLink.addEventListener('click', function (e) {
        e.preventDefault();

        // Marca que a imagem foi clicada
        localStorage.setItem('imageClicked', true);

        // Rola para o topo e depois redireciona para o link
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(function () {
            window.location.href = homeLink.getAttribute('href');
        }, 500); // Atraso de 500 ms para a rolagem terminar
    });

    // Ação ao clicar em qualquer link do menu
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('data-target');
            activateSection(targetId); // Ativa a seção com rolagem suave
        });
    });

    // Restaura a seção de boas-vindas ao voltar à página SOMENTE se a imagem foi clicada
    if (initialTarget) {
        localStorage.removeItem('imageClicked'); // Remove a indicação de clique na imagem
        activateSection('target-div', false); // Ativa a seção sem rolar
        window.scrollTo({ top: 0, behavior: 'auto' });
    }
});