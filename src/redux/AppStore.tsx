import React from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { reducer as dataUserReducer } from "./reducers/DataUserReducer";
import { reducer as HistoryReducer } from "./reducers/HistoryReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator } from "react-native";
import colors from "@/configs/colors";
import { createLogger } from "redux-logger";
import { useCallback } from "react";
import DeviceInfo from "react-native-device-info";
import { actions as actionBootReducer } from "@/redux/reducers/BootReducer";

const logger = createLogger({
  level: {
    prevState: false,
    nextState: false,
  },
  colors: {
    title: () => "inherit",
    prevState: () => "#9E9E9E",
    action: () => "#03A9F4",
    nextState: () => "#4CAF50",
    error: () => "#F20404",
  },
});

const persistConfigDatauser = {
  key: "persistConfigDataUser",
  storage: AsyncStorage,
};
const persistConfigDataHistory = {
  key: "persistConfigHistoryPresensi",
  storage: AsyncStorage,
};

const persistedDataUserReducer = persistReducer(
  persistConfigDatauser,
  dataUserReducer
);
const persistedHistoryReducer = persistReducer(
  persistConfigDataHistory,
  HistoryReducer
);

const combinedReducers = combineReducers({
  dataUser: persistedDataUserReducer,
  history: persistedHistoryReducer,
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

const loadDeviceInfo = async () => {
  const userAgent = {
    os: await DeviceInfo.getSystemName(),
    osVer: await DeviceInfo.getSystemVersion(),
    model: await DeviceInfo.getModel(),
    appName: await DeviceInfo.getApplicationName(),
    appVersion: await DeviceInfo.getVersion(),
    brand: await DeviceInfo.getBrand(),
    appBundle: await DeviceInfo.getBundleId(),
    freeStorage: await DeviceInfo.getFreeDiskStorage(),
    ram: await DeviceInfo.getTotalMemory(),
    isTablet: await DeviceInfo.isTablet(),
    deviceUniqueId: await DeviceInfo.getUniqueId(),
    versionCode: await DeviceInfo.getReadableVersion(),
    capacity: await DeviceInfo.getTotalDiskCapacity(),
  };

  return Promise.all([
    DeviceInfo.getDevice(),
    DeviceInfo.isEmulator(),
    DeviceInfo.supportedAbis(),
  ])
    .then((values) => {
      return {
        ...userAgent,
        deviceModel: values[0],
        isEmulator: values[1],
        abis: values[2],
        capacity: Number((userAgent.capacity / 1024 / 1024).toFixed()),
        freeStorage: Number((userAgent.freeStorage / 1024 / 1024).toFixed()),
        ram: Number((userAgent.ram / 1024 / 1024).toFixed()),
      };
    })
    .catch(() => {});
};

const onBeforeLift = (stores: any) => async () => {
  const ua = await loadDeviceInfo();
  stores.dispatch(actionBootReducer.setUserAgent(ua));
  if (__DEV__) {
    console.log("ua>>>", ua);
  }
};

export function withAppStore<T>(WrappedComponent: React.FC<T>) {
  const ComponentWithStore = (props: T) => {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<ActivityIndicator size="large" color={colors.base.grey} />}
          persistor={persistStore(store)}
          onBeforeLift={onBeforeLift(store)}
        >
          <WrappedComponent {...(props as T as any)} />
        </PersistGate>
      </Provider>
    );
  };

  return ComponentWithStore;
}
