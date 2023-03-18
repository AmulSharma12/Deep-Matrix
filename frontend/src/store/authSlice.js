import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  otp: {
    phone: "",
    hash: "",
  },
};

//reducers helps to change the states
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      //set the Authentication
      const { user } = action.payload;
      state.user = user;
      if (user == null) state.isAuth = false;
      else state.isAuth = true;
    },
    setOtp: (state, action) => {
      //set the OTP
      const { phone, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
  },
});

//exporting
export const { setAuth, setOtp } = authSlice.actions;

export default authSlice.reducer;
