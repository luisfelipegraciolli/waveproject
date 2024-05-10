const logado = JSON.parse(sessionStorage.getItem("logado"))

const paginaAtual = location.href
  .split("/")
  .filter((dir) => dir)
  .at(-1)

if (!logado && paginaAtual !== "login") {
  location.href = "/login"
} else if (logado && paginaAtual === "login") {
  // TODO: Mudar 'editar-perfil' para a pagina principal, quanto pronta.
  location.href = "/editar-perfil"
}
