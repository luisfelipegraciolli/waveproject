import { db } from "../lib/firebase-config.js"

export async function postFuncionarioInfo(data) {
  const infoRef = db.collection("employee").doc("info")

  await infoRef.set(data)
  return data
}
