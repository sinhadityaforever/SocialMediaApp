import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import axios from "axios";
import { IUser } from "../type";

export interface UserState {
  user?: IUser & { _id: string };
  isFetching?: boolean;
  error?: boolean;
}

const initialState: UserState = {
  isFetching: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.user = undefined;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    loginFailed: (state) => {
      state.isFetching = false;
      state.user = undefined;
      state.error = true;
    },
    follow: (state, action: PayloadAction<any>) => {
      state.user!.followings = [state.user!.followings?.push(action.payload)];
    },
    unfollow: (state, action: PayloadAction<any>) => {
      state.user!.followings = state.user!.followings?.filter(
        (following) => following !== action.payload
      );
    },
  },
});

export const {
  //put things under reducer here
  loginStart,
  loginSuccess,
  loginFailed,
  follow,
  unfollow,
} = userSlice.actions;
// export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
