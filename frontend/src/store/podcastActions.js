import axios from 'axios';
// import { podcastActions } from '../store/';
 // Adjust to your Redux slice

export const deletePodcast = (podcastId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:1000/podcasts/${podcastId}`);
    dispatch(podcastActions.removePodcast(podcastId)); // Remove from state
  } catch (error) {
    console.error("Error deleting podcast:", error);
    throw error;
  }
};
