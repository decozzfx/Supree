import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStateHistoryData } from "./initialState";
import { ILoginResponseData, IUserData } from "@/types/commonTypes";

const DataPresensi = createSlice({
  name: "DataPresensi",
  initialState: initialStateHistoryData,
  reducers: {
    setHistoryData: (state, action) => {
      const newData = state.data.concat(action.payload);
      return { ...state, data: newData };
    },
  },
});

export const { name, actions, reducer } = DataPresensi;
