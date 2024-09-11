const SERVER_URL = "http://localhost:3004";

/*////////////////////////////// Knowledge Elements ////////////////////////// */

export const getKnowledgeElements = async () => {
  const res = await fetch(`${SERVER_URL}/knowledgeElements`);
  return res.json();
};

export const createKnowledgeElements = async (newKe) => {
  await fetch(`${SERVER_URL}/knowledgeElements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newKe),
  });
};

export const getKnowledgeElement = async (id) => {
  const res = await fetch(`${SERVER_URL}/knowledgeElements/${id}`);
  return res.json();
};

/*////////////////////////////// Dispositions ////////////////////////// */

export const getDispositions = async () => {
  const res = await fetch(`${SERVER_URL}/dispositions`);
  return res.json();
};

export const createDispositions = async (dispo) => {
  await fetch(`${SERVER_URL}/dispositions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dispo),
  });
};

export const getDisposition = async (id) => {
  const res = await fetch(`${SERVER_URL}/dispositions/${id}`);
  return res.json();
};

/*////////////////////////////// Competencies ////////////////////////// */

export const getCompetencys = async () => {
  const res = await fetch(`${SERVER_URL}/competencys`);
  return res.json();
};

export const createCompetencys = async (dispo) => {
  const res = await fetch(`${SERVER_URL}/competencys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dispo),
  });
  return res;
};

export const getCompetency = async (id) => {
  const res = await fetch(`${SERVER_URL}/competencys/${id}`);
  return res.json();
};

/*////////////////////////////// Skill Levels ////////////////////////// */

export const getSkillLevels = async () => {
  const res = await fetch(`${SERVER_URL}/skillLevels`);
  return res.json();
};

export const createSkillLevels = async (dispo) => {
  const res = await fetch(`${SERVER_URL}/skillLevels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dispo),
  });
  return res;
};

export const getSkillLevel = async (id) => {
  const res = await fetch(`${SERVER_URL}/skillLevels/${id}`);
  return res.json();
};

export const patchSkillLevel = async (id, skill) => {
  const res = await fetch(`${SERVER_URL}/skillLevels/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill),
  });
  return res;
};