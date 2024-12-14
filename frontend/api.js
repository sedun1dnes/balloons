const API_URL = 'http://localhost:3000/api'; 

async function getOSInfo() {
  try {
    const response = await fetch(`${API_URL}/os`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении информации о ОС", error);
    throw error;
  }
}

async function getFile() {
  try {
    const response = await fetch(`${API_URL}/file`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении файла", error);
    throw error;
  }
}

async function getEntities() {
  try {
    const response = await fetch(`${API_URL}/balloons`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении списка сущностей", error);
    throw error;
  }
}

async function getEntity(id) {
  try {
    const response = await fetch(`${API_URL}/entity/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении сущности", error);
    throw error;
  }
}

async function createEntity(data) {
  try {
    const response = await fetch(`${API_URL}/entity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка при создании сущности", error);
    throw error;
  }
}

async function updateEntity(id, data) {
  try {
    const response = await fetch(`${API_URL}/entity/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка при обновлении сущности", error);
    throw error;
  }
}

async function deleteEntity(id) {
  try {
    const response = await fetch(`${API_URL}/entity/${id}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка при удалении сущности", error);
    throw error;
  }
}
