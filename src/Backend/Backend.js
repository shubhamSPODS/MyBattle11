import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = "https://app.mybattle11.com/"
// export const BASE_URL = "http://192.168.1.18:4013/"




// Helper to get token
const getToken = async () => {
  const token = await AsyncStorage.getItem('authToken');
  return token;
};

// === GET (no token) ===
export const GET = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (err) {
    console.error('GET error:', err);
    throw err;
  }
};

// === POST (no token) ===
export const POST = async (endpoint, body) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (err) {
    console.error('POST error:', err);
    throw err;
  }
};

// === GET_WITH_TOKEN ===
export const GET_WITH_TOKEN = async (endpoint) => {
  try {
    const token = await getToken();
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error('GET_WITH_TOKEN error:', err);
    throw err;
  }
};

// === POST_WITH_TOKEN ===
export const POST_WITH_TOKEN = async (endpoint, body) => {
  try {
    const token = await getToken();
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (err) {
    console.error('POST_WITH_TOKEN error:', err);
    throw err;
  }
};

// === POST_FORMDATA ===
export const POST_FORMDATA = async (endpoint, formData) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        // Don't set Content-Type manually; let fetch handle it
      },
      body: formData,
    });
    return await res.json();
  } catch (err) {
    console.error('POST_FORMDATA error:', err);
    throw err;
  }
};

// === POST_WITH_TOKEN_FORMDATA ===
export const POST_WITH_TOKEN_FORMDATA = async (endpoint, formData) => {
  try {
    const token = await getToken();
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        // Do not manually set 'Content-Type' for FormData
      },
      body: formData,
    });
    return await res.json();
  } catch (err) {
    console.error('POST_WITH_TOKEN_FORMDATA error:', err);
    throw err;
  }
};

export const validateMobile = (number) => {
    const expression = /^[0-9]*$/;
    return expression.test(number);
  };
