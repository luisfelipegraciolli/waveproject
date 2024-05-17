const formNovoServico = document.getElementById("novo-servico-form")
const formFiltro = document.getElementById("form-filtro")
const tbody = document.querySelector("#tabela-principal tbody")
const semServicos = document.getElementById("sem-servicos")

const funcionario = formNovoServico.funcionario
const cliente = formNovoServico.cliente
const servico = formNovoServico["servico"]
const categoria = formNovoServico["categoria-servico"]
const dataHora = formNovoServico["data-hora"]

let servicos = JSON.parse(localStorage.getItem("servicos")) ?? []

exibirServicos(servicos, tbody, semServicos)

formNovoServico.addEventListener("submit", adicionarServico)
formFiltro.addEventListener("submit", filtrarServicos)

function adicionarServico(e) {
  e.preventDefault()

  const inputs = {
    [funcionario.name]: funcionario.value,
    [cliente.name]: cliente.value,
    [servico.name]: servico.value,
    [categoria.name]: categoria.value,
    [dataHora.name]: dataHora.value,
  }

  tbody.parentElement.style.display = "table"
  semServicos.style.display = "none"

  servicos = [...servicos, inputs]

  formFiltro.filtro.value = ""

  exibirServicos(servicos, tbody, semServicos)

  localStorage.setItem("servicos", JSON.stringify(servicos))

  alert("Serviço adicionado com sucesso!")

  e.target.reset()
}

function criarLinhaDaTabela(info) {
  const tr = document.createElement("tr")
  tr.className = "linha"
  for (let [key, value] of Object.entries(info)) {
    const td = document.createElement("td")
    if (key == "data-hora") {
      const dataObject = new Date(value)
      td.innerText = dataObject.toLocaleString().slice(0, -3)
      td.className = "data"
    } else {
      td.innerText = value
    }
    tr.appendChild(td)
  }
  return tr
}

function exibirServicos(servicos, tbody, semServicos) {
  if (!servicos.length) {
    tbody.parentElement.style.display = "none"
    semServicos.style.display = "block"
    semServicos.innerText = "Não existem serviços cadastrados com essa informação!"
    return
  } else {
    tbody.parentElement.style.display = "table"
    semServicos.style.display = "none"
    semServicos.innerText = "Ainda não há serviços cadastrados!"
  }

  tbody.innerHTML = ""

  const servicosPorData = servicos.sort((a, b) => {
    const data1 = new Date(a["data-hora"])
    const data2 = new Date(b["data-hora"])
    return data2 - data1
  })

  for (let info of servicosPorData) {
    const tr = criarLinhaDaTabela(info)
    tbody.appendChild(tr)
  }
}

function filtrarServicos(e) {
  e.preventDefault()
  const form = e.target
  const search = form.filtro.value.trim().toLowerCase()
  if (search === "") {
    exibirServicos(servicos, tbody, semServicos)
    return
  }

  if (servicos.length) {
    const servicosFiltrados = servicos.reduce((acc, servico) => {
      if (
        Object.values(servico)
          .map((info) => info.toLowerCase())
          .includes(search)
      ) {
        acc.push(servico)
      }
      return acc
    }, [])
    exibirServicos(servicosFiltrados, tbody, semServicos)
  }
}
