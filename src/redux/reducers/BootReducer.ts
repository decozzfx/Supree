import { createSlice } from "@reduxjs/toolkit";
import { initialStateBootReducer } from "./initialState";

const appSlice = createSlice({
  name: "APP",
  initialState: initialStateBootReducer,
  reducers: {
    appNavigation: (state, { payload }) => ({
      ...state,
      currentSreen: payload.currentPage,
      params: payload.params,
    }),
    setUserAgent: (state, { payload }) => ({
      ...state,
      ua: payload,
    }),
    setAppstate: (state, { payload }) => {
      state.appState = payload;
    },
    setActivity: (state, { payload }) => {
      state.currentSreen = payload;
    },
    setOnboarding: (state, { payload }) => {
      state.onBoarding = payload;
    },
    setBootDeviceId: (state, { payload }) => {
      state.onesignal = payload;
    },
    setBootLocation: (state, { payload }) => {
      state.location = payload;
    },
    setBootLocationCompoundCode: (
      state,
      { payload: { CompoundCode, AddressDetail } }
    ) => {
      state.location.compound_code = CompoundCode;
      state.location.address_detail = AddressDetail;
    },
    setErrorReporter: (state, { payload: { errorDetail } }) => {
      state.errorDetail.error = errorDetail;
      state.errorDetail.screenName = state.currentSreen;
    },
    setShowBanner: (state, { payload }) => {
      state.ads.showBanner = payload;
    },
    setErrorResponse: (state, payload) => ({
      ...state,
      appError: {
        message: payload.payload.message,
        status: payload.payload.status,
      },
    }),
    setIsErrorModal: (state, { payload }) => ({
      ...state,
      isShowErrorModal: payload.isShowErrorModal,
      errorStatus: payload.errorStatus,
      errorMessage: payload.errorMessage,
    }),
    resetIsErrorModal: (state) => ({
      ...state,
      isShowErrorModal: false,
    }),
  },
});

export const { name, actions, reducer } = appSlice;
