const logado = JSON.parse(sessionStorage.getItem("logado"))
const paginaAtual = location.href
  .split("/")
  .filter((dir) => dir)
  .at(-1)

if (!logado && paginaAtual !== "login") {
  location.href = "/login"
} else if (logado && paginaAtual === "login") {
  location.href = "/"
}
