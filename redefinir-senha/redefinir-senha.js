const form = document.getElementById("pergunta-de-seguranca-form")
const pergunta = document.getElementById("pergunta-de-seguranca")
const resposta = document.getElementById("resposta")
const spanErro = document.querySelector(".mensagem-de-erro")

const dados = JSON.parse(localStorage.getItem("pergunta-de-seguranca"))

pergunta.innerText = dados.pergunta

resposta.addEventListener("focus", () => {
  spanErro.innerText = ""
})

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const inputResposta = resposta.value.trim().toLowerCase()

  if (inputResposta === "") {
    spanErro.innerText = "Insira uma resposta!"
    return
  }

  if (inputResposta !== dados.resposta) {
    spanErro.innerText = "Resposta incorreta!"
    return
  }

  sessionStorage.setItem("pergunta-respondida", true)

  location.href = "./redefine.html"
})
