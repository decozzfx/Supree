import { Image, View } from "react-native";
import { SafeScreen } from "@/components/template";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import {
  ApplicationScreenProps,
  RootStackNavigationTypes,
  routesEnum,
} from "@/navigators/routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";
import sizes from "@/configs/sizes";

function Profile({
  navigation,
  route,
}: NativeStackScreenProps<RootStackNavigationTypes, routesEnum.Profil>) {
  const [photo, setPhoto] = useState<string>();

  useEffect(() => {
    if (route?.params?.photoPath) {
      setPhoto(route?.params?.photoPath);
    }
  }, [route?.params?.photoPath]);

  const renderImage = useMemo(() => {
    if (!photo) return <ActivityIndicator size="large" color="#0000ff" />;
    return (
      <Image
        source={{ uri: `file://${photo}` }}
        style={{ width: sizes.screen.width, height: 400 }}
      />
    );
  }, [photo]);

  return (
    <SafeScreen>
      <View style={styles.container}>{photo ? renderImage : <></>}</View>
    </SafeScreen>
  );
}

export default Profile;
