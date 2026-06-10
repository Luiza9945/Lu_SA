function proximoPasso() {

    const user_name =
        document.getElementById("user_name").value;

    const email =
        document.getElementById("email").value;

    const senha =
        document.getElementById("senha").value;

    const confirmarSenha =
        document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {

        alert(
            "As senhas não coincidem."
        );

        return;
    }

    localStorage.setItem(
        "cadastroTemp",
        JSON.stringify({
            user_name,
            email,
            senha
        })
    );

    window.location.href =
        "cadastro2.html";
}