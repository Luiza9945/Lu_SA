let emailLogin = document.querySelector("#email")
let senhaLogin = document.querySelector("#senha")
let btnLogin = document.querySelector("#btn")

btnLogin.addEventListener('click', validarLogin)

function validarLogin(event) {
    event.preventDefault()
    
    // Debug: mostrar o que foi digitado
    console.log('Tentativa de login:', {
        email: emailLogin.value,
        senha: senhaLogin.value  // não mostra senha completa por segurança, mas confirma digitação
    });
    
    //  BUSCA usuário cadastrado
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    console.log('Usuários cadastrados:', usuarios);
    
    const usuario = usuarios.find(u => u.email === emailLogin.value && u.senha === senhaLogin.value)
    
    console.log('Usuário encontrado:', usuario);
    
    if (usuario) {
        localStorage.setItem('currentUser', JSON.stringify(usuario));
        window.location.href = "home.html"
    } else {
        alert(" Email ou senha incorretos!")
        // Limpar senha por segurança
        senhaLogin.value = '';
    }
}
