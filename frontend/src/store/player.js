import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to delete a podcast
export const deletePodcast = (id, onDelete) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/podcast/${id}`, {withCredentials: true});
    dispatch(playerActions.removePodcast(id));
    if (onDelete) onDelete(id); // Call the callback after successful deletion
  } catch (error) {
    console.error("Failed to delete podcast:", error);
  }
};


const playerSlice = createSlice({
  name: "player",
  initialState: { isPlayerDiv: false, songPath: "", img: "", podcasts: [] },
  reducers: {
    setDiv(state) {
      state.isPlayerDiv = true;
    },
    closeDiv(state) {
      state.isPlayerDiv = false;
    },
    changeSong(state, action) {
      state.songPath = action.payload;
    },
    changeImage(state, action) {
      state.img = action.payload;
    },
    removePodcast(state, action) {
      // Remove the deleted podcast from the state
      const podcastId = action.payload;
      state.podcasts = state.podcasts.filter((podcast) => podcast._id !== podcastId);
    },
  },
});

export const playerActions = playerSlice.actions;
export default playerSlice.reducer;
