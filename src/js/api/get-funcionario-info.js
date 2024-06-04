import { db } from "../lib/firebase-config.js"

export async function getFuncionarioInfo() {
  const infoRef = await db.collection("employee").doc("info").get()
  const dados = await infoRef.data()

  return dados
}
