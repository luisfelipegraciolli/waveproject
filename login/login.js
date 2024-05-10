const formLogin = document.getElementById("form-principal")
const usuarioInput = document.getElementById("usuario-input")
const senhaInput = document.getElementById("senha-input")
const spanErro = document.querySelector(".mensagem-de-erro")
const botaoLogin = document.getElementById("botao-login")

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

formLogin.addEventListener("submit", (e) => {
  e.preventDefault() //* impede o reload da pagina
  e.target.reset() //*apaga todos os campos do form
})

botaoLogin.addEventListener("click", login)

function login(e) {
  // TODO: Arrumar uma forma de encriptar essas infos para primeiro acesso
  const usuario = dados.usuario
  const senha = dados.senha

  if (!validaInput(usuarioInput, usuario) | !validaInput(senhaInput, senha)) {
    e.preventDefault() //*nao envia o formulario se nao for valido
    const form = e.target.parentNode
    form.reset()
    spanErro.innerText = "Usuário ou senha incorretos."
    return //*esse return eh pra nao continuar a funcao se der invalido.
  }

  const primeiroLogin = JSON.parse(localStorage.getItem("primeiro-login")) || []
  if (!primeiroLogin) {
    localStorage.setItem("primeiro-login", JSON.stringify(true))
  }

  const urlAtual = location.href
  //TODO: Colocar no lugar de "" o diretorio da proxima pagina.
  const proximaPagina = urlAtual.replace("/login", "")
  location.href = proximaPagina
}

function validaInput(input, esperado) {
  const inputValue = input.value.trim()

  if (inputValue !== esperado) {
    return false
  }

  return true
}
