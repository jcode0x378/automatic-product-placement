const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const CONSUMER_KEY = process.env.REACT_APP_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.REACT_APP_CONSUMER_SECRET;

export const fetchProducts = async (searchTerm, perPage = 100, page = 1) => {
  if (typeof searchTerm !== 'string') {
    throw new Error('searchTerm must be a string');
  }
  const url = `${API_BASE_URL}/wp-json/wc/v3/products?search=${searchTerm}&per_page=${perPage}&page=${page}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  const queryParams = new URLSearchParams({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
  });
  const url = `${API_BASE_URL}products/${id}?${queryParams}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error body:', errorBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};
