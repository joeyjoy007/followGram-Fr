import axios from 'axios';

export const createUser = async data => {
  return await axios.post('/create', data);
};

export const loginUser = async data => {
  return await axios.post('/login', data);
};

export const fetchSingleUser = async data => {
  return await axios.post('/fetchSingleUser', data);
};

export const searchUser = async name => {
  return await axios.get(`/searchUser?search=${name}`);
};

export const followUser = async data => {
  return await axios.put('/followUser', data);
};
export const unFollowUser = async data => {
  return await axios.put('/unfollowUser', data);
};
