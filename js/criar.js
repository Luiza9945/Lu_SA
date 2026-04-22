document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createPostForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const title = document.getElementById('postTitleInput').value.trim();
            const description = document.getElementById('postDescriptionTextarea').value.trim();
            const imageFile = document.getElementById('postImage').files[0];
            const isPrivate = document.getElementById('isPrivate').checked;
            const isInterestProject = document.getElementById('isInterestProject').checked;

            if (!title || !description) {
                alert('Nome do post e Descrição são obrigatórios!');
                return;
            }

            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Demo: Save to localStorage (array of posts)
                    let posts = JSON.parse(localStorage.getItem('userPosts') || '[]');
                    const newPost = {
                        id: Date.now(),
                        title: title,
                        description: description,
                        isPrivate: isPrivate,
                        isInterestProject: isInterestProject,
                        image: e.target.result,  // Base64 data URL
                        timestamp: new Date().toISOString()
                    };
                    posts.unshift(newPost);  // Add to beginning
                    localStorage.setItem('userPosts', JSON.stringify(posts));

                    alert('Post criado com sucesso! Redirecionando para perfil...');
                    window.location.href = 'perfil-art.html';
                };
                reader.readAsDataURL(imageFile);
            } else {
                // Demo: Save to localStorage (array of posts)
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
                posts.unshift(newPost);  // Add to beginning
                localStorage.setItem('userPosts', JSON.stringify(posts));

                alert('Post criado com sucesso! Redirecionando para perfil...');
                window.location.href = 'perfil-art.html';
            }

        });
    }
});
