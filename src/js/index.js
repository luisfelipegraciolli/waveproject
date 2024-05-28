import { getAdminServices } from "./api/get-admin-services.js"
import { postAdminServices } from "./api/post-admin-services.js"
import { getFormData } from "./get-form-data.js"
import { deleteAdminService } from "./api/delete-admin-service.js"

const formNovoServico = document.getElementById("novo-servico-form")
const formFiltro = document.getElementById("form-filtro")
const botaoExcluir = document.getElementById("delete")
const tbody = document.querySelector("#tabela-principal tbody")
const semServicos = document.getElementById("sem-servicos")

let servicos = []
try {
  servicos = (await getAdminServices()) ?? []
} catch (error) {
  console.error(error)
}

exibirServicos(servicos, tbody, semServicos)

formNovoServico.addEventListener("submit", adicionarServico)
formFiltro.addEventListener("submit", filtrarServicos)
botaoExcluir.addEventListener("click", excluirServicos)

function excluirServicos() {
  if (confirm("Deseja excluir TODOS os serviços registrados?")) {
    deleteAdminService()
    servicos = []
    exibirServicos(servicos, tbody, semServicos)
  }
}

function excluirUnicoServico(id) {
  const opt = confirm("Deseja deletar o serviço?")
  if (opt) {
    deleteAdminService(id)
    servicos = servicos.filter((servico) => servico.id !== id)
    exibirServicos(servicos, tbody, semServicos)
  } else {
    alert("O serviço não foi deletado.")
  }
}

async function adicionarServico(e) {
  e.preventDefault()

  const inputs = getFormData(formNovoServico)

  tbody.parentElement.style.display = "table"
  semServicos.style.display = "none"

  formFiltro.filtro.value = ""

  try {
    const id = await postAdminServices(inputs)
    servicos = [...servicos, { ...inputs, id }]
    exibirServicos(servicos, tbody, semServicos)
    alert("Serviço adicionado com sucesso!")
  } catch (error) {
    alert("Ocorreu algum erro. Tente novamente.")
    console.error(e)
  }

  e.target.reset()
}

function criarLinhaDaTabela(info) {
  const tr = document.createElement("tr")
  tr.className = "linha"
  tr.onclick = () => excluirUnicoServico(info.id)

  tr.popovertarget = info.id
  const popover = criarPopover({
    id: info.id,
  })
  document.body.appendChild(popover)
  tr.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { x, y } = e

    const left = x
    const top = y + window.scrollY
    popover.style.left = left + "px"
    popover.style.top = top + "px"
    popover.showPopover()
  })

  const entries = Object.entries(info).filter((entry) => entry[0] != "id")
  for (let [key, value] of entries) {
    const td = document.createElement("td")
    if (key == "data_hora") {
      const dataObject = new Date(value)
      td.innerText = dataObject.toLocaleString().slice(0, -3)
    } else {
      td.innerText = value
    }
    tr.appendChild(td)
  }
  return tr
}

function criarPopover({ id }) {
  const popover = document.createElement("div")

  popover.classList.add("popover")

  popover.popover = ""
  popover.id = id

  const editar = document.createElement("div")
  editar.innerText = "Editar serviço"
  editar.classList.add("popover-option")
  const excluir = document.createElement("div")
  excluir.innerText = "Excluir serviço"
  excluir.classList.add("popover-option")

  popover.appendChild(editar)
  popover.appendChild(excluir)

  return popover
}

function exibirServicos(servicos, tbody, semServicos) {
  const antigosPopovers = document.querySelectorAll("[popover]")
  if (antigosPopovers.length) {
    antigosPopovers.forEach((popover) => popover.remove())
  }

  if (!servicos.length) {
    tbody.parentElement.style.display = "none"
    semServicos.style.display = "block"
    semServicos.innerText = "Ainda não há serviços cadastrados!"
    return
  } else {
    tbody.parentElement.style.display = "table"
    semServicos.style.display = "none"
  }

  tbody.innerHTML = ""

  const servicosPorData = servicos.sort((a, b) => {
    const data1 = new Date(a.data_hora)
    const data2 = new Date(b.data_hora)
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
      const linha = Object.values(servico).map((column) => column.toLowerCase())
      const match = linha
        .map((column) => column.includes(search))
        .some((value) => value === true)
      if (match) {
        acc.push(servico)
      }
      return acc
    }, [])
    exibirServicos(servicosFiltrados, tbody, semServicos)
    if (!servicosFiltrados.length)
      semServicos.innerText = "Não existem serviços cadastrados com essa informação!"
  }
}
