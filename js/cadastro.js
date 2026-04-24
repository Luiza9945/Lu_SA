let nome = document.querySelector("#nome")
let usuario = document.querySelector("#usuario")
let email = document.querySelector("#email")
let senha = document.querySelector("#senha")
let confirmarSenha = document.querySelector("#confirmarSenha")
const btnCadas = document.querySelector("#btnCadas")

btnCadas.addEventListener('click', checandoTudo)

function checandoTudo(event) {
    event.preventDefault();
    validar();
}

function validar() {
    const erros = []
    
    if (nome.value.length < 3) erros.push("Nome: 3+ chars")
    if (!usuario.value || usuario.value.length < 5 || !/^[a-zA-Z0-9._-]+$/.test(usuario.value)) erros.push("Usuário: 5+ chars, só letras/números/_-.")
    if (!email.value.includes('@')) erros.push("Email: precisa @")
    if (senha.value.length < 8) erros.push("Senha: 8+ chars")
    if (senha.value !== confirmarSenha.value) erros.push("Senhas diferentes")
    
    if (erros.length === 0) {
        // Criar objeto do novo usuário
        const novoUsuario = {
            nome: nome.value,
            usuario: usuario.value,
            email: email.value,
            senha: senha.value
        };
        
        // Pegar usuários existentes ou criar array vazio
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Adicionar novo usuário
        usuarios.push(novoUsuario);
        
        // Salvar de volta no localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        // Log para ver no console (pressione F12 > Console)
        console.log('✅ Usuário salvo:', novoUsuario);
        console.log('Total de usuários:', usuarios.length);
        console.log('Todos usuários:', usuarios);
        
        // Criar sessão do usuário automaticamente após cadastro
        localStorage.setItem('currentUser', JSON.stringify(novoUsuario));
        
        // Limpar campos
        nome.value = '';
        usuario.value = '';
        email.value = '';
        senha.value = '';
        confirmarSenha.value = '';
        
        alert("✅ Usuário salvo no localStorage! Redirecionando...");
        window.location.href = "home.html";
    } else {
        alert("Verifique se está tudo correto:\n" + erros.join("\n"))
    }
}
