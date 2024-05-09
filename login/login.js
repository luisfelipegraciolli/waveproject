function login() {
  // TODO: Arrumar uma forma de encriptar essas infos para primeiro acesso
  const usuario = "isa123"
  const senha = "123"

  const usuarioInput = document.getElementById("usuario-input").value
  const senhaInput = document.getElementById("senha-input").value

  if (usuarioInput.trim() === "" || senhaInput.trim() === "") {
      // TODO: adicionar mensagem de erro abaixo do botao de submit
  } else {
    if (usuario == usuarioInput && senha == senhaInput) {
      window.location.assign("../index.html")
    } else {
      // TODO: adicionar mensagem de erro abaixo do botao de submit
    }
  }
}
