const formLogin = document.getElementById("form-principal")
const usuarioInput = document.getElementById("usuario-input")
const senhaInput = document.getElementById("senha-input")
const spanErro = document.querySelector(".mensagem-de-erro")

usuarioInput.addEventListener("focus", () => {
  spanErro.innerText = ""
})

senhaInput.addEventListener("focus", () => {
  spanErro.innerText = ""
})

//*cria uma primeira senha e usuario se ja nao existir no local storage
let dados = JSON.parse(localStorage.getItem("dados"))

if (!dados) {
  dados = { usuario: "admin", senha: "admin" }
  localStorage.setItem("dados", JSON.stringify(dados))
}

formLogin.addEventListener("submit", login)

function login(e) {
  e.preventDefault()
  // TODO: Arrumar uma forma de encriptar essas infos para primeiro acesso
  const usuario = dados.usuario
  const senha = dados.senha

  if (!validaInput(usuarioInput, usuario) | !validaInput(senhaInput, senha)) {
    spanErro.innerText = "Usuário ou senha incorretos."
    e.target.reset()
    return //*esse return eh pra nao continuar a funcao se der invalido.
  }

  const primeiroLogin = JSON.parse(localStorage.getItem("primeiro-login"))
  if (!primeiroLogin) {
    localStorage.setItem("primeiro-login", true)
  }

  sessionStorage.setItem("logado", true)

  //TODO: Colocar no lugar de "editar-perfil" o diretorio da proxima pagina.
  location.href = "../editar-perfil"
}

function validaInput(input, esperado) {
  const inputValue = input.value.trim()

  if (inputValue !== esperado) {
    return false
  }

  return true
}
