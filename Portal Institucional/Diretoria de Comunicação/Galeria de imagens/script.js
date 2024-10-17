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

// Adiciona evento de clique nos links do menu para rolar suavemente até a seção
document.querySelectorAll('.menu-linha a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Previne o comportamento padrão do link
        const targetId = link.getAttribute('data-target');
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(targetId);
        targetSection.classList.add('active');
        document.getElementById('welcome').classList.add('hidden');
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

// Inicializa a galeria e seus controles
document.querySelectorAll('.gallery-section').forEach((section) => {
    const gallery = section.querySelector('.gallery');
    const images = gallery.querySelectorAll('img');
    const prevButtonDesktop = gallery.querySelector('.gallery-control#prev1-desktop, .gallery-control#prev2-desktop, .gallery-control#prev3-desktop, .gallery-control#prev4-desktop, .gallery-control#prev5-desktop, .gallery-control#prev6-desktop, .gallery-control#prev7-desktop, .gallery-control#prev8-desktop, .gallery-control#prev9-desktop');
    const nextButtonDesktop = gallery.querySelector('.gallery-control#next1-desktop, .gallery-control#next2-desktop, .gallery-control#next3-desktop, .gallery-control#next4-desktop, .gallery-control#next5-desktop, .gallery-control#next6-desktop, .gallery-control#next7-desktop, .gallery-control#next8-desktop, .gallery-control#next9-desktop');
    const prevButtonMobile = section.querySelector('.gallery-control#prev1-mobile, .gallery-control#prev2-mobile, .gallery-control#prev3-mobile, .gallery-control#prev4-mobile, .gallery-control#prev5-mobile, .gallery-control#prev6-mobile, .gallery-control#prev7-mobile, .gallery-control#prev8-mobile, .gallery-control#prev9-mobile');
    const nextButtonMobile = section.querySelector('.gallery-control#next1-mobile, .gallery-control#next2-mobile, .gallery-control#next3-mobile, .gallery-control#next4-mobile, .gallery-control#next5-mobile, .gallery-control#next6-mobile, .gallery-control#next7-mobile, .gallery-control#next8-mobile, .gallery-control#next9-mobile');
    const thumbnailContainer = section.querySelector('.thumbnail-wrapper');
    const galleryInfo = section.querySelector('.gallery-info');
    let currentIndex = 0;

    const totalVisibleDesktop = 6;
    const totalVisibleMobile = 3;
    const thumbnailWidth = 100;
    

    const updateGallery = () => {
        // Alterna a classe 'active' nas imagens para destacar a imagem atual com base no índice
        images.forEach((img, idx) => {
            img.classList.toggle('active', idx === currentIndex);
        });

        // Seleciona todas as miniaturas no container de miniaturas
        const thumbnails = thumbnailContainer.querySelectorAll('.thumbnail');
        // Alterna a classe 'active' nas miniaturas para destacar a miniatura atual com base no índice
        thumbnails.forEach((thumb, idx) => {
            thumb.classList.toggle('active', idx === currentIndex);
        });

        // Atualiza o texto informativo com a imagem atual e o total de imagens
        galleryInfo.textContent = `Imagem ${currentIndex + 1} de ${images.length}`;

        // Verifica se a largura da janela é menor ou igual a 600 pixels (para detectar dispositivos móveis)
        const isMobile = window.innerWidth <= 600;
        // Define o número total de miniaturas visíveis com base no dispositivo (móvel ou desktop)
        const totalVisible = isMobile ? totalVisibleMobile : totalVisibleDesktop;
        // Calcula quantas miniaturas devem estar visíveis em cada lado da imagem central
        const halfVisible = Math.floor(totalVisible / 3);

        // Calcula o índice inicial e final das miniaturas a serem exibidas
        let startIndex = currentIndex - halfVisible;
        let endIndex = currentIndex + halfVisible;

        // Ajusta o índice final se o índice inicial for negativo
        if (startIndex < 0) {
            endIndex = Math.min(thumbnails.length - 1, endIndex + Math.abs(startIndex));
            startIndex = 0;
        }

        // Ajusta o índice inicial se o índice final ultrapassar o número total de miniaturas
        if (endIndex >= thumbnails.length) {
            startIndex = Math.max(0, startIndex - (endIndex - thumbnails.length + 1));
            endIndex = thumbnails.length - 1;
        }

        // Calcula o deslocamento necessário para centralizar a visualização de miniaturas
        const offset = startIndex * thumbnailWidth;
        // Calcula a largura total das miniaturas
        const totalThumbnailsWidth = thumbnails.length * thumbnailWidth;
        // Obtém a largura do container de miniaturas
        const containerWidth = thumbnailContainer.clientWidth;

        // Garante que o deslocamento não ultrapasse o limite do container
        const maxOffset = Math.max(0, totalThumbnailsWidth + 20);
        const clampedOffset = Math.min(maxOffset, offset);

        // Aplica a transformação de deslocamento horizontal ao container de miniaturas
        thumbnailContainer.style.transform = `translateX(-${clampedOffset}px)`;
        // Define a transição suave para o deslocamento
        thumbnailContainer.style.transition = 'transform 0.5s ease';
    };

    prevButtonDesktop.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery();
    });

    nextButtonDesktop.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery();
    });

    prevButtonMobile.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery();
    });

    nextButtonMobile.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery();
    });

    images.forEach((img, idx) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img.src;
        thumbnail.alt = img.alt;
        thumbnail.classList.add('thumbnail');
        thumbnail.addEventListener('click', () => {
            currentIndex = idx;
            updateGallery();
        });
        thumbnailContainer.appendChild(thumbnail);
    });

    updateGallery();
    adjustGalleryAnimation(section);

    images.forEach(img => {
        img.addEventListener('click', () => {
            document.getElementById('fullscreenImage').src = img.src;
            document.getElementById('fullscreenCaption').textContent = img.getAttribute('data-caption');
            document.getElementById('fullscreen').style.display = 'flex';
            document.body.classList.add('fullscreen-active');
        });
    });
});

document.getElementById('fullscreen').addEventListener('click', (event) => {
    if (event.target === document.getElementById('fullscreen') || event.target === document.querySelector('.fullscreen-close')) {
        document.getElementById('fullscreen').style.display = 'none';
        document.body.classList.remove('fullscreen-active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('welcome').classList.remove('hidden');
});

// Atualiza a galeria no resize da tela
window.addEventListener('resize', () => {
    document.querySelectorAll('.gallery-section').forEach((section) => {
        adjustGalleryAnimation(section);
    });
});

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

// Ajustar o layout ao carregar a página
window.addEventListener('load', adjustLayout);

// Ajustar o layout ao redimensionar a janela
window.addEventListener('resize', adjustLayout);