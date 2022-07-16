import axios from 'axios';

export const createPost = async data => {
  return await axios.post('/createPost', data);
};

export const fetchAllPost = async () => {
  return await axios.get('/fetchAllPost');
};
