// const { default: axios } = require("axios");
import axios from 'axios'

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY
const axiosClient = axios.create({
  baseURL:import.meta.env.VITE_BASE_URL+"/api/",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
})

const createNewResume = async (data) => {
  try {
    const response = await axiosClient.post('user-resumes', data);
    return response.data;
  } catch (error) {
    console.error('Error creating new resume:', error);
    throw error;
  }
};
const getResumes = (userEmail) => axiosClient.get("user-resumes?filters[userEmail][$eq]="+userEmail);
const updateResume = (id,data) => axiosClient.put("user-resumes/"+id,data)
const getResumeById= (id) => axiosClient.get("user-resumes/"+id+"?populate=*")

const deleteResumeById = (id) => axiosClient.delete("user-resumes/"+id)

export default{
  createNewResume,
  getResumes,
  updateResume,
  getResumeById,
  deleteResumeById
}