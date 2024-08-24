const wpApiUrl = `${process.env.REACT_APP_WP_API_URL}/wp-json/wc/v3/`;
const wpConsumerKey = process.env.REACT_APP_WP_CONSUMER_KEY;
const wpConsumerSecret = process.env.REACT_APP_WP_CONSUMER_SECRET;

export const fetchProducts = async params => {
  const queryParams = new URLSearchParams({
    ...params,
    consumer_key: wpConsumerKey,
    consumer_secret: wpConsumerSecret,
  });
  const url = `${wpApiUrl}products?${queryParams}`;
  console.log('Fetching products from:', url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error body:', errorBody);
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
    consumer_key: wpConsumerKey,
    consumer_secret: wpConsumerSecret,
  });
  const url = `${wpApiUrl}products/${id}?${queryParams}`;
  console.log('Updating product:', id, 'with data:', data);
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
