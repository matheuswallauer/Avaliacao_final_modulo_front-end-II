"use strict";
const btnCriarConta = document.getElementById("botao_criar_conta");
const nomeCadastro = document.getElementById("input_nome");
const emailCadastro = document.getElementById("input_email");
const senhaCadastro = document.getElementById("input_senha");
let validaEmail = false;
let validaSenha = false;
let validaNome = false;
btnCriarConta.addEventListener("click", (e) => {
    e.preventDefault();
    verificaCampos();
});
function verificaCampos() {
    if (nomeCadastro.value === "" || emailCadastro.value === "" || senhaCadastro.value === "") {
        alert("Algo deu errado! Por favor, verifique se você preencheu todos os campos");
    }
    else if (validaEmail || validaSenha || validaNome) {
        alert("Campos incorretos! Por favor, verifique se você preencheu todos os campos corretamente");
    }
    else {
        alert("Conta criada com sucesso!");
        salvarNoLocalStorage(criarObjetoUsuario(nomeCadastro.value, emailCadastro.value, senhaCadastro.value));
    }
}
function salvarNoLocalStorage(objetoUsuario) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuarios.push(objetoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
function criarObjetoUsuario(nome, email, senha) {
    const objetoUsuario = {
        nome: nome,
        email: email,
        senha: senha,
    };
    return objetoUsuario;
}
const signInLogin = document.getElementById("botao_login");
signInLogin.addEventListener("click", (e) => {
    e.preventDefault();
    entrar();
    console.log("Deu bom");
});
function entrar() {
    const emailLogin = document.querySelector("#input-email-login");
    const senhaLogin = document.querySelector("#input-senha-login");
    let novoUsuario = JSON.parse(localStorage.getItem("usuarios") || "[]");
    let usuario = {
        email: " ",
        senha: " ",
    };
    novoUsuario.forEach((element) => {
        if (element.email === emailLogin.value && element.senha === senhaLogin.value) {
            usuario = {
                email: element.email,
                senha: element.senha,
            };
        }
    });
    if (usuario.email === emailLogin.value && usuario.senha === senhaLogin.value) {
        alert(`Seja bem vindo '${emailLogin.value}'!`);
        sessionStorage.setItem("logado", usuario.email);
        window.location.href = "home.html";
    }
    else {
        alert("E-mail ou senha incorretos!");
    }
}
