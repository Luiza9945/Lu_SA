// ======================
// AUTOCOMPLETE CATEGORIA
// ======================
const categorias = [
  "Tecnologia",
  "Design",
  "Design Gráfico",
  "Design UX/UI",
  "Marketing",
  "Negócios",
  "Soft Skills",
  "Idiomas"
];

// ======================
// PREVIEW FOTO PERFIL
// ======================
const inputFoto = document.getElementById("foto");
const previewFoto = document.getElementById("previewFoto");

if (inputFoto && previewFoto) {
  let previewUrl = "";

  inputFoto.addEventListener("change", () => {
    const file = inputFoto.files && inputFoto.files[0] ? inputFoto.files[0] : null;

    if (!file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = "";
      previewFoto.src = "";
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = URL.createObjectURL(file);

    previewFoto.src = previewUrl;

    const imagemPadrao = document.getElementById("imagemPadrao");
    if (imagemPadrao) imagemPadrao.src = previewUrl;
  });
}

const input = document.getElementById("categoria");
const sugestoes = document.getElementById("sugestoes");

if (input && sugestoes) {
  input.addEventListener("input", () => {
    const valor = input.value.toLowerCase();
    sugestoes.innerHTML = "";

    if (!valor) return;

    const resultados = categorias.filter(categoria =>
      categoria.toLowerCase().includes(valor)
    );

    resultados.forEach(categoria => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "list-group-item list-group-item-action";
      item.textContent = categoria;

      item.onclick = () => {
        input.value = categoria;
        sugestoes.innerHTML = "";
      };

      sugestoes.appendChild(item);
    });
  });
}

async function finalizarCadastro(event) {
  if (event && event.preventDefault) event.preventDefault();

  const dadosConta = JSON.parse(localStorage.getItem("cadastroTemp"));
  if (!dadosConta) {
    alert("Dados da primeira etapa não encontrados.");
    window.location.href = "cadastro.html";
    return;
  }

  const nome = document.getElementById("nome").value.trim();
  const categoria = document.getElementById("categoria").value.trim();
  const biografia = document.getElementById("biografia").value.trim();

  const foto = document.getElementById("foto")?.files?.[0] || null;

  if (!nome || nome.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres.");
    return;
  }
  if (nome.length > 25) {
    alert("O nome deve ter menos de 25 caracteres.");
    return;
  }
  if (!categoria || !categorias.includes(categoria)) {
    alert("Selecione uma categoria válida.");
    return;
  }

  if (!biografia) {
    alert("Informe sua biografia.");
    return;
  }

  // Seu backend (agora) cria usuário usando nome/email/senha.
  // Mantemos categoria/biografia apenas para compatibilidade com o seu script.sql.
  const payload = {
    nome,
    email: dadosConta.email,
    senha: dadosConta.senha,
    categoria,
    biografia
  };

  // (Foto) - backend atual não salva arquivo; guardamos apenas o nome.
  if (foto?.name) payload.fotoPerfil = foto.name;

  try {
    const resp = await fetch('/usuarios/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      alert(data?.message || 'Falha ao cadastrar.');
      return;
    }

    alert('Cadastro realizado com sucesso!');
    localStorage.removeItem('cadastroTemp');
    window.location.href = './home.html';
  } catch (err) {
    console.error(err);
    alert('Falha ao conectar no servidor.');
  }
}

