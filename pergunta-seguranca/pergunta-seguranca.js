const form = document.getElementById("pergunta-seguranca-form")
const selectPergunta = document.getElementById("pergunta")
const selectOptions = document.querySelectorAll("#pergunta option")
const inputResposta = document.getElementById("resposta")
const spanErro = document.querySelector(".mensagem-de-erro")

inputResposta.addEventListener("focus", () => {
  spanErro.innerText = ""
})

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const indiceSelecionado = selectPergunta.value
  const pergunta = selectOptions[indiceSelecionado].innerText.trim()

  const resposta = inputResposta.value.trim().toLowerCase()
  if (resposta === "") {
    spanErro.innerText = "Insira uma resposta!"
    return
  }

  localStorage.setItem("pergunta-de-seguranca", JSON.stringify({ pergunta, resposta }))
  sessionStorage.setItem("logado", true)
  localStorage.setItem("primeiro-login", false)

  location.href = "/"
})
