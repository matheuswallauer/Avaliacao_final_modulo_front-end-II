let emailCadastro = document.querySelector("#input_email") as HTMLInputElement;
let labelEmail = document.querySelector("#label_input_email") as HTMLInputElement;
let validaEmail = false;

let senhaCadastro = document.querySelector("#input_senha") as HTMLInputElement;
let labelSenha = document.querySelector("#label_input_senha") as HTMLInputElement;
let validaSenha = false;

let repetirSenhaCadastro = document.querySelector("#input_confirma_senha") as HTMLInputElement;
let labelRepetirSenha = document.querySelector("#label_input_confirma_senha") as HTMLInputElement;
let validaRepetirSenha = false;

let formularioCadastro = document.querySelector("#formulario_cadastro") as HTMLInputElement;
let btnCriarConta = document.querySelector("#botao_criar_conta") as HTMLButtonElement;

let regSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

emailCadastro.addEventListener("keyup", verificaEmail);

function verificaEmail() {
  if (emailCadastro.value.length < 10) {
    labelEmail.setAttribute("style", "color: red");
    labelEmail.innerHTML = "Insira no mínimo 10 caracteres";
    emailCadastro.setAttribute(
      "style",
      "display: block; margin-bottom: 5px; margin-top: 5px; width: 323px; border: 2px solid red;"
    );
    validaEmail = false;
  } else {
    labelEmail.innerHTML = "";
    emailCadastro.setAttribute("style", "display: block; width: 323px; border: 2px solid green;");
    validaEmail = true;
  }
}

senhaCadastro.addEventListener("keyup", verificaSenha);

function verificaSenha() {
  let senhaValida = senhaCadastro.value.match(regSenha);

  if (senhaCadastro.value.length < 6) {
    labelSenha.setAttribute("style", "color: red");
    labelSenha.innerHTML = "Insira no mínimo 6 caracteres";
    senhaCadastro.setAttribute(
      "style",
      "display: block; margin-bottom: 5px; margin-top: 5px; width: 323px; border: 2px solid red;"
    );
    emailCadastro.setAttribute("style", "display: block; width: 323px; border: 2px solid green; margin-bottom: 7px");
    validaSenha = false;
  } else if (senhaValida == null) {
    labelSenha.innerHTML = "Deve conter uma letra maíuscula, um número e um caracter especial";
    validaSenha = false;
  } else {
    labelSenha.innerHTML = "";
    senhaCadastro.setAttribute("style", "display: block; width: 323px; border: 2px solid green;");
    validaSenha = true;
  }
}

repetirSenhaCadastro.addEventListener("keyup", verificaRepetirSenha);

function verificaRepetirSenha() {
  if (senhaCadastro.value != repetirSenhaCadastro.value) {
    labelRepetirSenha.setAttribute("style", "color: red");
    labelRepetirSenha.innerHTML = "As senhas são diferentes";
    repetirSenhaCadastro.setAttribute(
      "style",
      "display: block; margin-bottom: 5px; margin-top: 5px; width: 323px; border: 2px solid red;"
    );
    senhaCadastro.setAttribute("style", "display: block; width: 323px; border: 2px solid green; margin-bottom: 7px");
    validaRepetirSenha = false;
  } else {
    labelRepetirSenha.innerHTML = "";
    repetirSenhaCadastro.setAttribute("style", "display: block; width: 323px; border: 2px solid green;");
    validaRepetirSenha = true;
  }
}

btnCriarConta.addEventListener("click", (e) => {
  e.preventDefault();
  verificaCampos();
});

function verificaCampos() {
  if (emailCadastro.value === "" || senhaCadastro.value === "" || repetirSenhaCadastro.value === "") {
    alert("Algo deu errado! Por favor, verifique se você preencheu todos os campos");
  } else if (!validaEmail || !validaSenha || !validaRepetirSenha) {
    alert("Campos incorretos! Por favor, verifique se você preencheu todos os campos corretamente");
  } else {
    alert("Conta criada com sucesso!");
    salvarNoLocalStorage(criarObjetoUsuario(emailCadastro.value, senhaCadastro.value, repetirSenhaCadastro.value));
    window.location.href = "index.html";
  }
}

function salvarNoLocalStorage(objetoUsuario: string) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  usuarios.push(objetoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function criarObjetoUsuario(email: string, senha: string) {
  const objetoUsuario = {
    email: email,
    senha: senha,
  };
  return objetoUsuario;
}

(document.querySelector("#botao-logar") as HTMLButtonElement).addEventListener("click", (e) => {
  e.preventDefault();

  entrar();
});

interface Usuario {
  email: string;
  senha: string;
}

function entrar() {
  const emailLogin = document.querySelector("#email-login") as HTMLInputElement;
  const senhaLogin = document.querySelector("#senha-login") as HTMLInputElement;

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
