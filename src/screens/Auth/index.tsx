import { Image, View } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTheme } from "@/theme";

import { UsernameSvg, PasswordSvg } from "@/theme/svgs";
import { SafeScreen } from "@/components/template";
import { routesEnum, type ApplicationScreenProps } from "@/navigators/routes";
import {
  Text2XL,
  Text4XL,
  TextBase,
  TextM,
} from "@/components/derivatives/text";
import Gap from "@/components/generics/gap/Gap";
import { ButtonFull } from "@/components/derivatives/button";
import { CommonActions } from "@react-navigation/native";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/AppStore";
import { actions as actionDataUser } from "@/redux/reducers/DataUserReducer";
import Logo from "@/theme/assets/images/app_icon.png";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";

function Auth({ navigation }: ApplicationScreenProps) {
  const { layout } = useTheme();
  const dispatch = useDispatch();
  const dataUser = useSelector((state: RootState) => state.dataUser);

  const navigateToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: routesEnum.MainDrawer }],
      })
    );
  };

  const handleLocationPermission = async () => {
    const fineLoc = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (fineLoc === RESULTS.GRANTED) {
    } else if (fineLoc === RESULTS.DENIED) {
      const fineLocReq = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );

      if (fineLocReq === RESULTS.GRANTED) {
      }
    }
  };

  useEffect(() => {
    if (dataUser.token) {
      navigateToHome();
    }
  }, [dataUser.token, navigation]);

  useEffect(() => {
    handleLocationPermission();
  }, []);

  const onSubmit = async () => {};

  const renderMain = useMemo(() => {
    return (
      <SafeScreen>
        <Gap height={100} />
        <View style={[layout.itemsCenter, layout.justifyCenter]}>
          <Text4XL color={"#8696BB"}>Selamat Datang</Text4XL>
          <Gap height={50} />
          <Image source={Logo} style={{ width: 200, height: 200 }} />
          <Text2XL color={"#8696BB"}>SUPREE</Text2XL>
          <TextM color={"#8696BB"}>(Sukolilo Presensi)</TextM>
          <Gap height={50} />
          <TextBase color={"#8696BB"} size={15}>
            Silakan login dengan akun anda
          </TextBase>

          <ButtonFull onPress={navigateToHome}>login</ButtonFull>

          <Gap height={50} />
        </View>
      </SafeScreen>
    );
  }, [layout.itemsCenter, layout.justifyCenter, onSubmit]);

  return renderMain;
}

export default Auth;
