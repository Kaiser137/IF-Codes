// Função para ajustar a animação de acordo com o número de imagens e tamanho da tela
function adjustGalleryAnimation(section) {
    const images = section.querySelectorAll('.gallery img');
    const gallery = section.querySelector('.gallery');
    const minImagesForAnimation = 6; // Número mínimo de imagens para ativar animação
    const isMobile = window.innerWidth <= 600;

    if ((isMobile && images.length <= 3) || (!isMobile && images.length <= minImagesForAnimation)) {
        gallery.classList.remove('has-animation');
    } else {
        gallery.classList.add('has-animation');
    }
}

document.querySelectorAll('.menu-linha a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        // Fecha outras seções e descarrega suas imagens
        document.querySelectorAll('.section').forEach(section => {
            if (section !== targetSection) {
                section.classList.remove('active');
                unloadImages(section);
                clearThumbnails(section);
            }
        });

        // Alterna a visibilidade da seção alvo
        targetSection.classList.toggle('active');
        if (targetSection.classList.contains('active')) {
            loadImages(targetSection);
            clearThumbnails(targetSection);
            generateThumbnails(targetSection);
            currentIndex = 0;
            updateGallery(targetSection);

            // Garante que a rolagem ocorra após a seção ser visível
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 0);
        } else {
            unloadImages(targetSection);
            clearThumbnails(targetSection);
        }

        // Oculta a seção de boas-vindas ao selecionar qualquer item do menu
        document.getElementById('welcome').classList.add('hidden');
    });
});

// Função para carregar as imagens
function loadImages(section) {
    const images = section.querySelectorAll('img[data-src]');
    images.forEach(img => {
        if (!img.hasAttribute('data-loaded')) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.setAttribute('data-loaded', 'true');
        }
    });
}

// Função para descarregar as imagens
function unloadImages(section) {
    const images = section.querySelectorAll('img[data-loaded]');
    images.forEach(img => {
        img.removeAttribute('src');
        img.removeAttribute('data-loaded');
    });
}

// Função para gerar miniaturas das imagens
function generateThumbnails(section) {
    const gallery = section.querySelector('.gallery');
    const thumbnailContainer = section.querySelector('.thumbnail-wrapper');
    const images = gallery.querySelectorAll('img[data-loaded]');

    images.forEach((img, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img.getAttribute('data-src');
        thumbnail.alt = img.alt;
        thumbnail.classList.add('thumbnail');
        thumbnail.addEventListener('click', () => {
            currentIndex = index; // Atualiza o índice ao clicar na miniatura
            updateGallery(section); // Atualiza a galeria com a nova imagem ativa
        });
        thumbnailContainer.appendChild(thumbnail);
    });
}

// Função para limpar as miniaturas
function clearThumbnails(section) {
    const thumbnailContainer = section.querySelector('.thumbnail-wrapper');
    thumbnailContainer.innerHTML = '';
}

// Função para atualizar a galeria
function updateGallery(section) {
    const gallery = section.querySelector('.gallery');
    const images = gallery.querySelectorAll('img');
    const galleryInfo = section.querySelector('.gallery-info');
    const thumbnailContainer = section.querySelector('.thumbnail-wrapper');
    const thumbnailWidth = 100;
    const totalVisibleThumbnails = 6;
    const totalVisibleMobile = 3;
    const isMobile = window.innerWidth <= 600;
    const totalVisible = isMobile ? totalVisibleMobile : totalVisibleThumbnails;
    const halfVisible = Math.floor(totalVisible / 3);

    images.forEach((img, idx) => {
        img.classList.toggle('active', idx === currentIndex);
    });

    const thumbnails = thumbnailContainer.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentIndex);
    });

    galleryInfo.textContent = `Imagem ${currentIndex + 1} de ${images.length}`;

    let startIndex = currentIndex - halfVisible;
    let endIndex = currentIndex + halfVisible;

    if (startIndex < 0) {
        endIndex = Math.min(thumbnails.length - 1, endIndex + Math.abs(startIndex));
        startIndex = 0;
    }

    if (endIndex >= thumbnails.length) {
        startIndex = Math.max(0, startIndex - (endIndex - thumbnails.length + 1));
        endIndex = thumbnails.length - 1;
    }

    const offset = startIndex * thumbnailWidth;
    thumbnailContainer.style.transform = `translateX(-${offset}px)`;
}

// Variável para armazenar o índice atual
let currentIndex = 0;

// Função para configurar os eventos de navegação para os botões de próximo e anterior
function setupNavigation(section) {
    const prevButtonDesktop = section.querySelector('.gallery-control#prev1-desktop');
    const nextButtonDesktop = section.querySelector('.gallery-control#next1-desktop');
    const prevButtonMobile = section.querySelector('.gallery-control#prev1-mobile');
    const nextButtonMobile = section.querySelector('.gallery-control#next1-mobile');

    if (nextButtonDesktop && prevButtonDesktop) {
        nextButtonDesktop.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % section.querySelectorAll('.gallery img').length;
            updateGallery(section);
        });

        prevButtonDesktop.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + section.querySelectorAll('.gallery img').length) % section.querySelectorAll('.gallery img').length;
            updateGallery(section);
        });
    }

    if (nextButtonMobile && prevButtonMobile) {
        nextButtonMobile.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % section.querySelectorAll('.gallery img').length;
            updateGallery(section);
        });

        prevButtonMobile.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + section.querySelectorAll('.gallery img').length) % section.querySelectorAll('.gallery img').length;
            updateGallery(section);
        });
    }
}


// Configurações iniciais ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
        setupNavigation(section); // Configura os eventos de navegação para cada seção
    });
    document.getElementById('welcome').classList.remove('hidden');
});

// Inicializa a galeria e seus controles
document.querySelectorAll('.gallery-section').forEach((section) => {
    adjustGalleryAnimation(section);

    const images = section.querySelectorAll('.gallery img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            document.getElementById('fullscreenImage').src = img.src;
            document.getElementById('fullscreenCaption').textContent = img.getAttribute('data-caption');
            document.getElementById('fullscreen').style.display = 'flex';
            document.body.classList.add('fullscreen-active');
        });
    });
});

// Evento para fechar o modo fullscreen
document.getElementById('fullscreen').addEventListener('click', (event) => {
    if (event.target === document.getElementById('fullscreen') || event.target === document.querySelector('.fullscreen-close')) {
        document.getElementById('fullscreen').style.display = 'none';
        document.body.classList.remove('fullscreen-active');
    }
});

// Atualiza a galeria no redimensionamento da tela
window.addEventListener('resize', () => {
    document.querySelectorAll('.gallery-section').forEach((section) => {
        adjustGalleryAnimation(section);
    });
});

// Ajuste o layout ao carregar e redimensionar a janela
function adjustLayout() {
    const desktopContent = document.getElementById('desktop-content');
    const mobileContent = document.getElementById('mobile-content');

    if (window.innerWidth < 600) {
        desktopContent.style.display = 'none';
        mobileContent.style.display = 'block';
    } else {
        desktopContent.style.display = 'block';
        mobileContent.style.display = 'none';
    }
}

window.addEventListener('load', adjustLayout);
window.addEventListener('resize', adjustLayout);