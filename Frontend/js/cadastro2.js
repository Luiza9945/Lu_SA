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

            const item =
                document.createElement("button");

            item.type = "button";

            item.className =
                "list-group-item list-group-item-action";

            item.textContent = categoria;

            item.onclick = () => {

                input.value = categoria;

                sugestoes.innerHTML = "";

            };

            sugestoes.appendChild(item);

        });

    });

}


// ======================
// FINALIZAR CADASTRO
// ======================

async function finalizarCadastro() {

    const dadosConta =
        JSON.parse(
            localStorage.getItem("cadastroTemp")
        );

    if (!dadosConta) {

        alert(
            "Dados da primeira etapa não encontrados."
        );

        window.location.href =
            "cadastro.html";

        return;
    }

    const nome =
        document.getElementById("nome")
        .value
        .trim();

    const categoria =
        document.getElementById("categoria")
        .value
        .trim();

    const biografia =
        document.getElementById("biografia")
        .value
        .trim();

    // FOTO OPCIONAL

    const foto =
        document.getElementById("foto")
        ?.files[0] || null;

    // ======================
    // VALIDAÇÕES
    // ======================

    if (!nome || nome.length < 3) {

        alert(
            "O nome deve ter pelo menos 3 caracteres."
        );

        return;
    }

    if (!categoria) {

        alert(
            "Selecione uma categoria."
        );

        return;
    }

    if (!categorias.includes(categoria)) {

        alert(
            "Selecione uma categoria válida."
        );

        return;
    }

    // ======================
    // OBJETO USUÁRIO
    // ======================

    const usuario = {

        user_name:
            dadosConta.user_name,

        email:
            dadosConta.email,

        senha:
            dadosConta.senha,

        nome,

        categoria,

        biografia,

        fotoPerfil:
            foto ? foto.name : null

    };

    console.log(usuario);

    // FUTURAMENTE:
    // await fetch(...)

    alert(
        "Cadastro realizado com sucesso!"
    );

    localStorage.removeItem(
        "cadastroTemp"
    );

    window.location.href =
        "home.html";

}