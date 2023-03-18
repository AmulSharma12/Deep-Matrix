import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  avatar: "",
};

//reducers helps to change the states
export const activateSlice = createSlice({
  name: "activa",
  initialState,
  reducers: {
    setName: (state, action) => {
      // set the name
      state.name = action.payload;
    },
    setAvatar: (state, action) => {
      //set the avatar
      state.avatar = action.payload;
    },
  },
});

//exporting
export const { setName, setAvatar } = activateSlice.actions;

export default activateSlice.reducer;
