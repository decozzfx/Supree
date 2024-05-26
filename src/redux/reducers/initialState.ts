import { IUserData } from "@/types/commonTypes";

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
export const initialStateHistoryData = {
  data: [],
};
