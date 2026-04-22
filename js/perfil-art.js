document.addEventListener('DOMContentLoaded', function() {
    // Exibir nome e usuário do usuário logado atual
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr);
        const nomeEl = document.querySelector('.linha3 h1');
        const usuarioEl = document.querySelector('.linha3 p');
        if (nomeEl) nomeEl.textContent = currentUser.nome;
        if (usuarioEl) usuarioEl.textContent = '@' + currentUser.usuario;
        console.log('Perfil atualizado para:', currentUser.nome, currentUser.usuario);
    }

    const masonry = document.querySelector('.masonry');
    if (!masonry) return;

    // Load posts from localStorage
    let posts = JSON.parse(localStorage.getItem('userPosts') || '[]');
    console.log('Loaded posts:', posts); // Debug - check console!

    // Clear existing pins
    masonry.innerHTML = '';

    // Add dynamic posts first (newest at top since unshift)
    posts.forEach(function(post) {
        const pin = document.createElement('div');
        pin.className = 'pin';
        pin.innerHTML = `
            <img src="${post.image}" alt="${post.title}" onclick="openLightbox(this)" data-title="${post.title}">
            <div class="pin-title">${post.title}</div>
        `;
        masonry.appendChild(pin);
    });

    // NO static pins - only user's posts + existing HTML static if any, but dynamic only for new
    // To avoid repetition, JS only adds user posts ABOVE static hardcoded ones? But since we clear, only user posts
    // User complaint: "repetindo imgs que já existem" - so only show user posts, remove static recreation

    // Lightbox
    window.openLightbox = function(img) {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;
        document.getElementById('lightbox-img').src = img.src;
        document.getElementById('lightbox-title').textContent = img.dataset.title || '';
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) lightbox.style.display = 'none', document.body.style.overflow = 'auto';
    };

    // Listeners
    document.addEventListener('click', e => {
        if (e.target.id === 'lightbox' || e.target.classList.contains('close-lightbox')) closeLightbox();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });
});
