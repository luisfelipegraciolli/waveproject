import { db } from "../lib/firebase-config.js"

export async function getAdminInfo(...keys) {
  const infoRef = await db.collection("admin").doc("info").get()
  const dados = await infoRef.data()

  let object = dados
  if (keys.length) {
    object = {}
    for (let key of keys) {
      object[key] = dados[key]
    }
    return object
  }
}
