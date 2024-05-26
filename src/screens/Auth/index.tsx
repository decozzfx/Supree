import { Image, View } from "react-native";
import { useTheme } from "@/theme";

import { SafeScreen } from "@/components/template";
import { routesEnum, type ApplicationScreenProps } from "@/navigators/routes";
import {
  Text2XL,
  Text4XL,
  TextBase,
  TextM,
} from "@/components/derivatives/text";
import Gap from "@/components/generics/gap/Gap";
import { CommonActions } from "@react-navigation/native";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/AppStore";
import { actions as actionDataUser } from "@/redux/reducers/DataUserReducer";
import Logo from "@/theme/assets/images/app_icon.png";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { WEB_CLIENT_ID, CLIENT_ID } from "@/configs/config";

function Auth({ navigation }: ApplicationScreenProps) {
  const { layout } = useTheme();
  const dispatch = useDispatch();
  const dataUser = useSelector((state: RootState) => state.dataUser);

  GoogleSignin.configure({
    scopes: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    webClientId: WEB_CLIENT_ID,
    offlineAccess: false,
  });

  const navigateToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: routesEnum.Home }],
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
    if (dataUser.user?.id) {
      navigateToHome();
    }
  }, [navigation, dataUser.user?.id]);

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

          <Gap height={50} />
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={async () => {
              try {
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                if (userInfo) {
                  dispatch(actionDataUser.setUserData(userInfo));
                  navigateToHome();
                }
              } catch (error: any) {
                console.log("🚀 ~ onPress={ ~ error:", JSON.stringify(error));
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                  // user cancelled the login flow
                } else if (error.code === statusCodes.IN_PROGRESS) {
                  // operation (e.g. sign in) is in progress already
                } else if (
                  error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
                ) {
                  // play services not available or outdated
                } else {
                  // some other error happened
                }
              }
            }}
          />
          <Gap height={50} />
        </View>
      </SafeScreen>
    );
  }, [layout.itemsCenter, layout.justifyCenter, onSubmit]);

  return renderMain;
}

export default Auth;
