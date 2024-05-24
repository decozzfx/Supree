import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RootState } from "@/redux/AppStore";
import { SafeScreen } from "@/components/template";
import styles from "./styles";
import { TextL, TextS, TextXL } from "@/components/derivatives/text";
import Gap from "@/components/generics/gap/Gap";
import colors from "@/configs/colors";
import {
  CalendarWhiteSvg,
  ClockWhiteSvg,
  HospitalSvg,
  MedicineSvg,
  ProfilAddSvg,
  SearchSvg,
} from "@/theme/svgs";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import GetLocation from "react-native-get-location";

function Home() {
  const dataUser = useSelector((state: RootState) => state.dataUser);

  const [location, setLocation] = useState<any>();

  const getOneTimeLocation = useCallback(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then((location) => {
        setLocation(location);
        console.log(location);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);

  useEffect(() => {
    getOneTimeLocation();
  }, []);

  return (
    <SafeScreen>
      <ScrollView style={styles.container}>
        {/* Header Profile */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* Left Content */}
          <View>
            <TextL>Hello,</TextL>
            <TextXL textStyle="bold">Dimas Okva</TextXL>
          </View>

          {/* Right Content */}
          <View>
            <Image
              source={require("@/theme/assets/images/PhotoProfile.png")}
              style={{
                width: 56,
                height: 56,
                resizeMode: "cover",
              }}
            />
          </View>
        </View>

        <Gap height={24} />

        {/* Doctor Profile Recommendation */}
        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: colors.base.background,
            borderRadius: 12,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* Left Contenct */}
            <View
              style={{
                flexDirection: "row",
              }}
            ></View>

            {/* Right Content */}
            <View style={{ justifyContent: "center" }}></View>
          </View>

          {/* Lines */}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "rgba(255, 255, 255, 0.15)",
              paddingVertical: 8,
            }}
          />

          {/* Footer */}
          <View
            style={{
              paddingTop: 16,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CalendarWhiteSvg />
              <Gap width={8} />
              <TextS color={colors.text.white}>Sunday, 12 June</TextS>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingRight: 20,
              }}
            >
              <ClockWhiteSvg />
              <Gap width={8} />
              <TextS color={colors.text.white}>11:00 - 12:00 AM</TextS>
            </View>
          </View>
        </TouchableOpacity>

        <Gap height={24} />

        {location ? (
          <TextL color={colors.text.black}>
            {JSON.stringify(location, null, 2)}
          </TextL>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}

        {/* Category */}
        {/* <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: colors.background.gray2,
                padding: 24,
                borderRadius: 100,
              }}
            >
              <ProfilAddSvg />
            </View>
            <TextM size={15} color={colors.text.grey}>
              Dokter
            </TextM>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: colors.background.gray2,
                padding: 24,
                borderRadius: 100,
              }}
            >
              <MedicineSvg />
            </View>
            <TextM size={15} color={colors.text.grey}>
              Obat & Resep
            </TextM>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: colors.background.gray2,
                padding: 24,
                borderRadius: 100,
              }}
            >
              <HospitalSvg />
            </View>
            <TextM size={15} color={colors.text.grey}>
              Rumah Sakit
            </TextM>
          </TouchableOpacity>
        </View> */}

        <Gap height={16} />
      </ScrollView>
    </SafeScreen>
  );
}

export default Home;
