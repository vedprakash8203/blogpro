const API_URL = "https://bloghub-1cq5.onrender.com";

// Helper function for making API requests
const apiRequest = async (endpoint, method = "GET", data = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["x-api-key"] = token;
  }

  const config = {
    method,
    headers,
    redirect: "follow",
  };

  if (data && (method === "POST" || method === "PUT")) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const result = await response.json();
    
    if (response.status < 200 || response.status >= 300) {
      throw new Error(result.message || "Something went wrong");
  }
    
    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default apiRequest;
