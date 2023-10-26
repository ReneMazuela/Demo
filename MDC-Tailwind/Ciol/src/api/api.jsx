import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

// Define the endpoint
const endpoint = '/query';

// Concatenate the base URL and endpoint
const queryUrl = baseUrl + endpoint;

const performApiCall = async (inputText) => {
  try {
    const response = await axios.post(queryUrl, {
      input_text: inputText
    });
    console.log("API Request:", {
      input_text: inputText
    });

    // Correct the key to match what's returned from the backend
    const { response: responseData, sources} = response.data;
    console.log("API Response:", response.data); // Print the entire response


    return { text: responseData, sources};
  } catch (error) {
    console.error(error);
    return { text: 'API Error Check Console Log.' };
  }
};

export default performApiCall;
