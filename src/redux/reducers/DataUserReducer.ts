import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStateUserData } from "./initialState";
import { ILoginResponseData, IUserData } from "@/types/commonTypes";

const DataUser = createSlice({
  name: "DataUser",
  initialState: initialStateUserData,
  reducers: {
    setUserData: (state, action: PayloadAction<IUserData>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { name, actions, reducer } = DataUser;
