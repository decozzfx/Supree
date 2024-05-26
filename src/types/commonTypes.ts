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
