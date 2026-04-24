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
    } else {
        // Se não houver usuário logado, redirecionar para cadastro
        window.location.href = 'cadastro.html';
        return;
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

    // Lightbox Bootstrap Modal
    const lightboxModalEl = document.getElementById('lightbox');
    const lightboxModal = bootstrap.Modal.getOrCreateInstance(lightboxModalEl);

    window.openLightbox = function(img) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        if (!lightboxImg || !lightboxModal) return;
        lightboxImg.src = img.src;
        lightboxTitle.textContent = img.dataset.title || '';
        lightboxModal.show();
    };

    window.closeLightbox = function() {
        if (lightboxModal) lightboxModal.hide();
    };

    /* ========== MODAIS DO PERFIL (Bootstrap) ========== */

    const modalEditar = bootstrap.Modal.getOrCreateInstance(document.getElementById('modal-editar'));
    const modalApagar = bootstrap.Modal.getOrCreateInstance(document.getElementById('modal-apagar'));

    // Função global para abrir o modal de editar perfil
    window.abrirEditarModal = function() {
        if (!modalEditar) return;
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        // Preenche os campos com os dados atuais do usuário
        document.getElementById('edit-nome').value = currentUser.nome || '';
        document.getElementById('edit-usuario').value = currentUser.usuario || '';
        document.getElementById('edit-bio').value = currentUser.bio || '';

        modalEditar.show();
    };

    // Fecha o modal de editar
    window.fecharEditarModal = function() {
        if (modalEditar) modalEditar.hide();
    };

    // Salva as alterações do perfil no localStorage
    window.salvarPerfil = function() {
        const novoNome = document.getElementById('edit-nome').value.trim();
        const novoUsuario = document.getElementById('edit-usuario').value.trim();
        const novaBio = document.getElementById('edit-bio').value.trim();

        if (!novoNome || !novoUsuario) {
            alert('Nome e usuário são obrigatórios!');
            return;
        }

        // Busca o usuário logado atual
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const emailAntigo = currentUser.email;

        // Atualiza os dados
        currentUser.nome = novoNome;
        currentUser.usuario = novoUsuario;
        currentUser.bio = novaBio;

        // Atualiza a sessão atual
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Atualiza também na lista geral de usuários
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const index = usuarios.findIndex(u => u.email === emailAntigo);
        if (index !== -1) {
            usuarios[index] = currentUser;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

        // Atualiza a tela imediatamente
        const nomeEl = document.querySelector('.linha3 h1');
        const usuarioEl = document.querySelector('.linha3 p');
        if (nomeEl) nomeEl.textContent = novoNome;
        if (usuarioEl) usuarioEl.textContent = '@' + novoUsuario;

        alert('Perfil atualizado com sucesso!');
        fecharEditarModal();
    };

    // Função global para abrir o modal de apagar perfil
    window.abrirApagarModal = function() {
        if (!modalApagar) return;
        modalApagar.show();
    };

    // Fecha o modal de apagar
    window.fecharApagarModal = function() {
        if (modalApagar) modalApagar.hide();
    };

    // Confirma e executa a exclusão do perfil
    window.confirmarApagarPerfil = function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        // Remove o usuário da lista de usuários cadastrados
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.filter(u => u.email !== currentUser.email);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Remove a sessão atual e os posts do usuário
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userPosts');

        alert('Perfil apagado com sucesso.');
        window.location.href = 'cadastro.html';
    };
});
