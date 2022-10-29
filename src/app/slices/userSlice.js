import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    login : true
  },
  reducers: {

    setDataUser: (state, action) => {
      state.user = action.payload
    },
    setLogin : (state, action) => {
      state.login = action.payload
    }

  },
});

export default userSlice.reducer;

export const {
  setDataUser,
  setLogin
} = userSlice.actions