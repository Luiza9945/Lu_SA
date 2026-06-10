document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================
    // 1. LÓGICA DE PREVIEW EM TEMPO REAL (Para o App)
    // ==========================================================
    const postImageInput = document.getElementById('postImage');
    const imagePreview = document.getElementById('imagePreview');
    const fileDefaultContent = document.getElementById('fileDefaultContent');

    if (postImageInput && imagePreview && fileDefaultContent) {
        postImageInput.addEventListener('change', function() {
            // Pega o primeiro arquivo selecionado [0]
            const file = this.files[0]; 

            if (file) {
                const previewReader = new FileReader();
                
                previewReader.onload = function(e) {
                    // Define o caminho da imagem com o Base64 gerado
                    imagePreview.src = e.target.result;
                    // Torna a tag <img> visível no container do app
                    imagePreview.style.display = 'block';
                    // Oculta o texto padrão "Escolher arquivo..."
                    fileDefaultContent.style.display = 'none';
                };
                
                previewReader.readAsDataURL(file);
            } else {
                // Caso o usuário cancele a seleção, limpa e resgata o visual original
                imagePreview.src = '';
                imagePreview.style.display = 'none';
                fileDefaultContent.style.display = 'flex';
            }
        });
    }

    // ==========================================================
    // 2. ENVIAR FORMULÁRIO (Seu código original preservado)
    // ==========================================================
    const form = document.getElementById('createPostForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const title = document.getElementById('postTitleInput').value.trim();
            const description = document.getElementById('postDescriptionTextarea').value.trim();
            const imageFile = document.getElementById('postImage').files[0]; // Mantido o [0] correto
            const isPrivate = document.getElementById('isPrivate').checked;
            const isInterestProject = document.getElementById('isInterestProject').checked;

            // Validação de campos obrigatórios
            if (!title || !description) {
                alert('Nome do post e Descrição são obrigatórios!');
                return;
            }

            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Salva no localStorage (Array de posts)
                    let posts = JSON.parse(localStorage.getItem('userPosts') || '[]');
                    const newPost = {
                        id: Date.now(),
                        title: title,
                        description: description,
                        isPrivate: isPrivate,
                        isInterestProject: isInterestProject,
                        image: e.target.result,  // String de dados Base64
                        timestamp: new Date().toISOString()
                    };
                    posts.unshift(newPost);  // Adiciona no início da lista
                    localStorage.setItem('userPosts', JSON.stringify(posts));

                    alert('Post criado com sucesso! Redirecionando para perfil...');
                    window.location.href = 'perfil-art.html';
                };
                reader.readAsDataURL(imageFile);
            } else {
                // Salva no localStorage sem imagem
                let posts = JSON.parse(localStorage.getItem('userPosts') || '[]');
                const newPost = {
                    id: Date.now(),
                    title: title,
                    description: description,
                    isPrivate: isPrivate,
                    isInterestProject: isInterestProject,
                    image: null,
                    timestamp: new Date().toISOString()
                };
                posts.unshift(newPost);  // Adiciona no início da lista
                localStorage.setItem('userPosts', JSON.stringify(posts));

                alert('Post criado com sucesso! Redirecionando para perfil...');
                window.location.href = 'perfil-art.html';
            }

        });
    }
});
