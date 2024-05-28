import {
  IUserData,
  IInitialStateBootReducer,
  IHistory,
} from "@/types/commonTypes";

export const initialStateUserData: IUserData = {
  user: {
    email: "",
    name: "",
    photo: "",
    familyName: "",
    givenName: "",
    id: "",
  },
  idToken: null,
  serverAuthCode: null,
  scopes: [],
};

export const initialStateHistoryData: Record<"data", IHistory[]> = {
  data: [],
};

export const initialStateBootReducer: IInitialStateBootReducer = {
  params: {},
  currentSreen: "Login",
  ua: {
    os: "",
    osVer: "",
    model: "",
    appName: "",
    appVersion: "",
    brand: "",
    appBundle: "",
    freeStorage: "",
    ram: "",
    isTablet: "",
    deviceUniqueId: "",
    deviceId: "",
    deviceModel: "",
    isEmulator: "",
    abis: "",
    versionCode: "",
    capacity: 0,
    sizeDb: 0,
    systemFree: 0,
    systemUsed: 0,
  },
  appState: "active",
  onBoarding: true,
  location: {
    latitude: "",
    longitude: "",
    altitude: "",
    altitudeAccuracy: "",
    accuracy: "",
    speed: "",
    timestamp: "",
    compound_code: "",
    address_detail: "",
  },
  onesignal: {
    isPushDisabled: false,
    hasNotificationPermission: false,
    userId: "",
    isSubscribed: false,
    isSMSSubscribed: false,
    pushToken: "",
    notificationPermissionStatus: 2,
    isEmailSubscribed: false,
  },
  errorDetail: {
    error: "",
    screenName: "",
  },
  ads: {
    showBanner: false,
  },
  appError: {
    message: "",
    status: 200,
  },
  type: "",
  isShowErrorModal: false,
  errorStatus: "",
  errorMessage: "",
};
