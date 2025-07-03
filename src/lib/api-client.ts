import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - token authentication 
apiClient.interceptors.request.use(
  (config) => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrMTIzIiwicm9sZXMiOltdLCJpYXQiOjE3NTE1MzU5MjQsImV4cCI6MTc1NDEyNzkyNH0.Ag-5D4g0FYVF-mSk1Ua_gF2vKFnS5HWZGymek2ptg4g'; //localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error);
    
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          console.error('🔒 Unauthorized access');
          // localStorage.removeItem('authToken');
          // window.location.href = '/login';
          break;
        case 403:
          console.error('🚫 Forbidden access');
          break;
        case 404:
          console.error('🔍 Resource not found');
          break;
        case 500:
          console.error('💥 Server error');
          break;
        default:
          console.error(`❌ HTTP Error ${status}:`, data?.message || error.message);
      }
    } else if (error.request) {
      console.error('🌐 Network Error:', error.message);
    } else {
      console.error('⚠️ Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;