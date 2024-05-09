const formLogin = document.getElementById("form-principal")
const usuarioInput = document.getElementById("usuario-input")
const senhaInput = document.getElementById("senha-input")
const botaoLogin = document.getElementById("botao-login")

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

  return true
}
