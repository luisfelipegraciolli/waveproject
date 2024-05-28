import { db } from "../lib/firebase-config.js"

export async function putAdminServices(data, id) {
  const docRef = db.collection("admin").doc("info").collection("services").doc(id)
  await docRef.update(data)
  return data
}
