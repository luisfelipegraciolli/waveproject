import { db } from "../lib/firebase-config.js"

export async function postAdminInfo(data) {
  const infoRef = db.collection("admin").doc("info")

  await infoRef.set(data)
  return data
}
