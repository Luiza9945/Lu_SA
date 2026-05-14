// SELECIONAR ELEMENTOS com os IDs do SEU HTML
let usuario = document.querySelector("#usuario");
let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
const btnCadas = document.querySelector("#btnCadas");

// EVENT LISTENER do botão CADASTRAR
if (btnCadas) {
    btnCadas.addEventListener('click', (event) => {
        event.preventDefault();
        validar();
    });
}

// Impedir submit padrão do FORM-LOGIN
const formLogin = document.querySelector("#form-login");
if (formLogin) {
    formLogin.addEventListener('submit', (event) => {
        event.preventDefault();
    });
}

// FUNÇÃO VALIDAR (para o seu HTML)
function validar() {
    const erros = [];

    // Validações específicas
    if (!usuario?.value || usuario.value.length < 5 || !/^[a-zA-Z0-9._-]+$/.test(usuario.value)) {
        erros.push("👤 Usuário: mínimo 5 caracteres (letras, números, _, -)");
    }
    if (!email?.value || !email.value.includes('@') || !email.value.includes('.')) {
        erros.push("📧 Email inválido (ex: usuario@gmail.com)");
    }
    if (!senha?.value || senha.value.length < 8) {
        erros.push("🔒 Senha: mínimo 8 caracteres");
    }
    
    if (erros.length === 0) {
        // Criar objeto do usuário
        const novoUsuario = {
            usuario: usuario.value.trim(),
            email: email.value.trim(),
            senha: senha.value,
            dataCadastro: new Date().toISOString()
        };
        
        // Salvar no localStorage
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        // Login automático após cadastro
        localStorage.setItem('currentUser', JSON.stringify(novoUsuario));
        
        // Limpar campos
        usuario.value = '';
        email.value = '';
        senha.value = '';
        
        console.log('✅ Usuário cadastrado:', novoUsuario);
        alert("🎉 Cadastro realizado com SUCESSO!\nRedirecionando para home...");
        
        // Redirecionar
        setTimeout(() => {
            window.location.href = "home.html";
        }, 1000);
        
    } else {
        alert("❌ Corrija os erros:\n\n" + erros.join("\n"));
    }
}

// Debug - verificar se tudo foi encontrado
window.addEventListener('load', () => {
    console.log("🔍 Elementos do form-login encontrados:", {
        usuario: !!usuario,
        email: !!email,
        senha: !!senha,
        btnCadas: !!btnCadas,
        formLogin: !!formLogin
    });
});