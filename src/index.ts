const btnCriarConta = document.getElementById("botao_criar_conta") as HTMLButtonElement;
const nomeCadastro = document.getElementById("input_nome") as HTMLInputElement;
const emailCadastro = document.getElementById("input_email") as HTMLInputElement;
const senhaCadastro = document.getElementById("input_senha") as HTMLInputElement;
let validaEmail: boolean = false;
let validaSenha: boolean = false;
let validaNome: boolean = false;

btnCriarConta.addEventListener("click", (e) => {
  e.preventDefault();
  verificaCampos();
});

function verificaCampos() {
  if (nomeCadastro.value === "" || emailCadastro.value === "" || senhaCadastro.value === "") {
    alert("Algo deu errado! Por favor, verifique se você preencheu todos os campos");
  } else if (validaEmail || validaSenha || validaNome) {
    alert("Campos incorretos! Por favor, verifique se você preencheu todos os campos corretamente");
  } else {
    alert("Conta criada com sucesso!");
    salvarNoLocalStorage(criarObjetoUsuario(nomeCadastro.value, emailCadastro.value, senhaCadastro.value));
  }
}

function salvarNoLocalStorage(objetoUsuario: string) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  usuarios.push(objetoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function criarObjetoUsuario(nome: string, email: string, senha: string) {
  const objetoUsuario: any = {
    nome: nome,
    email: email,
    senha: senha,
  };
  return objetoUsuario;
}

const signInLogin = document.getElementById("botao_login") as HTMLButtonElement;

signInLogin.addEventListener("click", (e) => {
  e.preventDefault();
  entrar();
  console.log("Deu bom");
});

interface usuario {
  email: string;
  senha: string;
}

function entrar() {
  const emailLogin = document.querySelector("#input-email-login") as HTMLInputElement;
  const senhaLogin = document.querySelector("#input-senha-login") as HTMLInputElement;

  let novoUsuario = JSON.parse(localStorage.getItem("usuarios") || "[]");

  let usuario = {
    email: " ",
    senha: " ",
  };

  novoUsuario.forEach((element: any) => {
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
  } else {
    alert("E-mail ou senha incorretos!");
  }
}
