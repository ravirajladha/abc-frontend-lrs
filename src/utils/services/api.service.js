import axios from './axios.service';

const apiService = {
  async fetchData(endpoint, params = {}) {
    return this.makeRequest(axios.get(endpoint, { params }));
  },

  async postData(endpoint, data, headers = {}) {
    return this.makeRequest(axios.post(endpoint, data, { headers }));
  },

  async putData(endpoint, data, headers = {}) {
    return this.makeRequest(axios.put(endpoint, data, { headers }));
  },

  async deleteData(endpoint) {
    return this.makeRequest(axios.delete(endpoint));
  },

  async makeRequest(requestPromise) {
    try {
      const response = await requestPromise;
      return this.handleSuccessResponse(response);
    } catch (error) {
      return this.handleRequestError(error);
    }
  },

  handleSuccessResponse(response) {
    return response.data;
  },

  handleRequestError(error) {
    if (error.response) {
      const { status, data: responseData } = error.response;
      if (status === 400 && responseData.message === 'Validation Error') {
        const validationErrors = responseData.data || {};
        throw {
          error: 'Validation Error',
          message: 'Please check your provided information.',
          validationErrors,
        };
      }
      throw { error: 'HTTP Error', message: responseData.message || 'Failed to process your request' };
    } else if (error.request) {
      throw {
        error: 'No Response',
        message:
          'We are currently unable to reach the server. Please check your internet connection or try again later.',
      };
    } else {
      throw {
        error: 'Request Setup Error',
        message:
          'We encountered an issue setting up your request. Please try again later.',
      };
    }
  },
};

export default apiService;
