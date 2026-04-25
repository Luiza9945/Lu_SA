let nome = document.querySelector("#nome")
let usuario = document.querySelector("#usuario")
let email = document.querySelector("#email")
let senha = document.querySelector("#senha")
let fotoPerfilInput = document.querySelector("#inputFotoPerfil")
let previewFotoPerfil = document.querySelector("#previewFotoPerfil")
let fotoPerfilBase64 = null

const btnProximo = document.querySelector("#btnProximo")
const btnVoltarTopo = document.querySelector("#btnVoltarTopo")
const btnCadas = document.querySelector("#btnCadas")

const step1 = document.querySelector("#step-1")
const step2 = document.querySelector("#step-2")
const dots = document.querySelectorAll(".step-dot")

btnProximo.addEventListener('click', validarEtapa1)
btnVoltarTopo.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarEtapa(1);
})
btnCadas.addEventListener('click', (event) => {
    event.preventDefault();
    validar();
})

// Impedir submit padrão do formulário
document.querySelector('#form-login').addEventListener('submit', (event) => {
    event.preventDefault();
})

if (fotoPerfilInput) {
    fotoPerfilInput.addEventListener('change', function() {
        const file = this.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = function(e) {
                previewFotoPerfil.src = e.target.result
                fotoPerfilBase64 = e.target.result
            }
            reader.readAsDataURL(file)
        }
    })
}

function mostrarEtapa(etapa) {
    if (etapa === 1) {
        step1.classList.add('active')
        step2.classList.remove('active')
        dots.forEach((dot, index) => {
            if (index % 2 === 0) dot.classList.add('active')
            else dot.classList.remove('active')
        })
    } else {
        step1.classList.remove('active')
        step2.classList.add('active')
        dots.forEach((dot, index) => {
            if (index % 2 === 0) dot.classList.remove('active')
            else dot.classList.add('active')
        })
    }
}

function validarEtapa1() {
    const erros = []
    
    if (!email.value.includes('@')) erros.push("Email: precisa de @")
    if (senha.value.length < 8) erros.push("Senha: 8+ caracteres")
    
    if (erros.length === 0) {
        mostrarEtapa(2)
    } else {
        alert("Verifique se está tudo correto:\n" + erros.join("\n"))
    }
}

function validar() {
    const erros = []
    
    if (nome.value.length < 3) erros.push("Nome: 3+ chars")
    if (!usuario.value || usuario.value.length < 5 || !/^[a-zA-Z0-9._-]+$/.test(usuario.value)) erros.push("Usuário: 5+ chars, só letras/números/_-.")
    if (!email.value.includes('@')) erros.push("Email: precisa @")
    if (senha.value.length < 8) erros.push("Senha: 8+ chars")
    
    if (erros.length === 0) {
        // Criar objeto do novo usuário
        const novoUsuario = {
            nome: nome.value,
            usuario: usuario.value,
            email: email.value,
            senha: senha.value,
            foto: fotoPerfilBase64 || 'imgs/Usuária.jpg'
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
        
        alert("✅ Usuário salvo no localStorage! Redirecionando...");
        window.location.href = "home.html";
    } else {
        alert("Verifique se está tudo correto:\n" + erros.join("\n"))
    }
}

