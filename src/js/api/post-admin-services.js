import { db } from "../lib/firebase-config.js"

export async function postAdminServices(data) {
  const servicesRef = db.collection("admin").doc("info").collection("services")
  const docRef = servicesRef.doc()
  await docRef.set(data)
  return docRef.id
}
