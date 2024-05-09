const formLogin = document.getElementById("form-principal")
const usuarioInput = document.getElementById("usuario-input")
const senhaInput = document.getElementById("senha-input")
const botaoLogin = document.getElementById("botao-login")

formLogin.addEventListener("submit", (e) => {
  e.preventDefault() //* impede o reload da pagina
  e.target.reset() //*apaga todos os campos do form
})

botaoLogin.addEventListener("click", login)

function login() {
  // TODO: Arrumar uma forma de encriptar essas infos para primeiro acesso
  const usuario = "isa123"
  const senha = "123"

  if (!validaInput(usuarioInput, usuario) | !validaInput(senhaInput, senha)) {
    alert("Usuario ou senha incorretos, tente novamente!")
    return //*esse return eh pra nao continuar a funcao se der invalido.
  }

  alert("USUARIO LOGADO!")
}

function validaInput(input, esperado) {
  const spanErro = input.parentElement.lastElementChild
  const inputValue = input.value.trim()
  if (inputValue === "") {
    spanErro.innerText = "Digite ao menos um caractere!"
    return false
  } else {
    spanErro.innerText = ""
  }

  if (inputValue !== esperado) {
    return false
  }
}
