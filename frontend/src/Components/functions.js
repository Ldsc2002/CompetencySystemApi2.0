const SERVER_URL =  "http://localhost:3004"

/*////////////////////////////// Knowledge Elements ////////////////////////// */

export const getKnowledgeElements = async function _getKnowledgeElements() {
  const res = await fetch(SERVER_URL+"/knowledgeElements")
  const kes = await res.json()
  return kes
}

export const createKnowledgeElements = async function _createKnowledgeElements(newKe) {
  const newKnowledgeElements = newKe
  await fetch(SERVER_URL+"/knowledgeElements",{
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(newKnowledgeElements),
  })
}

export const getKnowledgeElement = async function _getKnowledgeElement(id) {
  const res = await fetch(SERVER_URL+"/knowledgeElements/"+id)
  const kes = await res.json()
  return kes
}
  
/*////////////////////////////// Dispositions ////////////////////////// */

export const getDispositions = async function _getDispositions() {
  const res = await fetch(SERVER_URL+"/dispositions")
  const dis = await res.json()
  return dis
}

export const createDispositions = async function _createDispositions(dispo) {
  await fetch(SERVER_URL+"/dispositions",{
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(dispo),
  })
}

export const getDisposition = async function _getDisposition(id) {
  const res = await fetch(SERVER_URL+"/dispositions/"+id)
  const dis = await res.json()
  return dis
}

/*////////////////////////////// Competencys ////////////////////////// */

export const getCompetencys = async function _getCompetencys() {
  const res = await fetch(SERVER_URL+"/competencys")
  const dis = await res.json()
  return dis
}

export const createCompetencys = async function _createCompetencys(dispo) {
  const res =  await fetch(SERVER_URL+"/competencys",{
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(dispo),
  })
  return res
}

export const getCompetency = async function _getCompetency(id) {
  const res = await fetch(SERVER_URL+"/competencys/"+id)
  const dis = await res.json()
  return dis
}

/*////////////////////////////// skillLevels ////////////////////////// */

export const getSkillLevels = async function _getSkillLevels() {
  const res = await fetch(SERVER_URL+"/skillLevels")
  const dis = await res.json()
  return dis
}

export const createSkillLevels = async function _createSkillLevels(dispo) {
  const res =  await fetch(SERVER_URL+"/skillLevels",{
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(dispo),
  })
  return res
}

export const getSkillLevel = async function _getSkillLevel(id) {
  const res = await fetch(SERVER_URL+"/skillLevels/"+id)
  const dis = await res.json()
  return dis
}

export const patchSkillLevel = async function _getSkillLevel(id, skill) {
  const res = await fetch(SERVER_URL+"/skillLevels/"+id,{
    method:'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(skill),
  })
  return res
}