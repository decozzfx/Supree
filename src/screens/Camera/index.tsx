import { Platform, TouchableOpacity, View } from "react-native";
import { SafeScreen } from "@/components/template";
import { useQuery } from "@tanstack/react-query";
import {
  Camera as CameraVision,
  useLocationPermission,
  useCameraDevice,
} from "react-native-vision-camera";
import styles from "./styles";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TextL } from "@/components/derivatives/text";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import sizes from "@/configs/sizes";
import { routesEnum } from "@/navigators/routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "@/navigators/mainTab";

function Camera({
  navigation,
}: NativeStackScreenProps<BottomTabParamList, routesEnum.Camera>) {
  // const camera = useRef<Camera>(null);
  const cameraPermission = CameraVision.getCameraPermissionStatus();
  const isGrantedPermission = cameraPermission === "granted";
  const location = useLocationPermission();
  let device = useCameraDevice("front");
  const cameraRef = useRef<CameraVision>(null);
  const [cameraGranted, setCameraGranted] = useState(false);

  const takePhoto = useCallback(async () => {
    try {
      if (cameraRef.current == null) throw new Error("Camera ref is null!");
      const photo = await cameraRef.current.takeSnapshot({
        quality: 20,
      });
      const photoPath = photo.path;
      navigation.navigate(routesEnum.Profil, { photoPath });
    } catch (e) {
      console.error("Failed to take photo!", e);
    }
  }, [cameraRef]);

  const handleCameraPermission = async () => {
    if (Platform.OS === "ios") {
      const res = await check(PERMISSIONS.IOS.CAMERA);
      if (res === RESULTS.GRANTED) {
        setCameraGranted(true);
      } else if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.IOS.CAMERA);
        res2 === RESULTS.GRANTED
          ? setCameraGranted(true)
          : setCameraGranted(false);
      }
    } else {
      const res = await check(PERMISSIONS.ANDROID.CAMERA);
      if (res === RESULTS.GRANTED) {
        setCameraGranted(true);
      } else if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.ANDROID.CAMERA);
        res2 === RESULTS.GRANTED
          ? setCameraGranted(true)
          : setCameraGranted(false);
      }
    }
  };

  useEffect(() => {
    handleCameraPermission();
  }, []);

  const renderCamera = useMemo(() => {
    if (!isGrantedPermission || !cameraGranted)
      return <TextL>Tidak ada izin akses kamera</TextL>;
    if (device == null) return <TextL>Tidak ada kamera</TextL>;

    return (
      <View>
        <CameraVision
          ref={cameraRef}
          style={{
            height: sizes.screen.height,
            width: sizes.screen.width,
            backgroundColor: "black",
          }}
          device={device}
          isActive={true}
          photo={true}
          enableLocation={location.hasPermission}
          exposure={0}
          photoQualityBalance="speed"
          orientation="portrait"
        />
        <TouchableOpacity
          style={{
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 50,
            width: 70,
            height: 70,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: 100,
            left: sizes.screen.width / 2 - 25,
          }}
          onPress={takePhoto}
        >
          <View
            style={{
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 50,
              width: 50,
              height: 50,
              backgroundColor: "white",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }, [
    device,
    cameraGranted,
    isGrantedPermission,
    location.hasPermission,
    takePhoto,
  ]);

  return (
    <SafeScreen>
      <View style={styles.container}>{renderCamera}</View>
    </SafeScreen>
  );
}

export default Camera;
