export interface ILoginResponse {
  metadata: Metadata;
  response: ILoginResponseData;
}

export interface ILoginResponseData {
  token: string;
}

interface Metadata {
  message: string;
  status: number;
}

export interface IGetDokterTerdekatResponse {
  metadata: Metadata;
  response: Response;
}

interface Response {
  dataResponse: IGetDokterTerdekat;
}

interface IGetDokterTerdekat {
  id: number;
  jadwal: string;
  jarak: string;
  jenis: string;
  nama: string;
  tanggal: string;
}

interface Metadata {
  message: string;
  status: number;
}

export interface IGetListSemuaDokterResponse {
  metadata: Metadata;
  response: IGetListSemuaDokter;
}

interface IGetListSemuaDokter {
  data: IDokter[];
}

interface IDokter {
  id: number;
  nama: string;
  jenis: string;
  tanggal: string;
  jadwal: string;
  jarak?: string;
}

interface Metadata {
  status: number;
  message: string;
}

export interface IUserData {
  idToken: string | null;
  scopes?: string[];
  serverAuthCode: string | null;
  user: IUser;
}

export interface IUser {
  email: string;
  familyName: string | null;
  givenName: string | null;
  id: string;
  name: string | null;
  photo: string | null;
}

export interface IInitialStateBootReducer {
  params: object;
  currentSreen: string;
  ua: {
    os: string;
    osVer: string;
    model: string;
    appName: string;
    appVersion: string;
    brand: string;
    appBundle: string;
    freeStorage: string;
    ram: string;
    isTablet: string;
    deviceUniqueId: string;
    deviceId: string;
    deviceModel: string;
    isEmulator: string;
    abis: string;
    versionCode: string;
    systemUsed: number;
    systemFree: number;
    capacity: number;
    sizeDb: number;
  };
  appState: "active";
  onBoarding: true;
  location: {
    latitude: string;
    longitude: string;
    altitude: string;
    altitudeAccuracy: string;
    accuracy: string;
    speed: string;
    timestamp: string;
    compound_code: string;
    address_detail: string;
  };
  onesignal: {
    isPushDisabled: false;
    hasNotificationPermission: false;
    userId: string;
    isSubscribed: false;
    isSMSSubscribed: false;
    pushToken: string;
    notificationPermissionStatus: 2;
    isEmailSubscribed: false;
  };
  errorDetail: {
    error: string;
    screenName: string;
  };
  ads: {
    showBanner: false;
  };
  appError: {
    message: string;
    status: number;
  };
  type: string;
  isShowErrorModal: boolean;
  errorStatus: string;
  errorMessage: string;
}
