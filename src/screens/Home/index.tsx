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
import { TextL, TextM, TextS, TextXL } from "@/components/derivatives/text";
import Gap from "@/components/generics/gap/Gap";
import colors from "@/configs/colors";
import { CalendarWhiteSvg, ClockWhiteSvg, CLockOrangeSvg } from "@/theme/svgs";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import GetLocation, { Location } from "react-native-get-location";
import ModalCenter from "@/components/generics/modal/center";
import Icon from "react-native-vector-icons/Ionicons";
import dayjs from "dayjs";
import { actions as actionHistory } from "@/redux/reducers/HistoryReducer";
import { ApplicationScreenProps } from "@/navigators/routes";
require("dayjs/locale/id");

function Home({ navigation }: ApplicationScreenProps) {
  const dispatch = useDispatch();
  const dataUser = useSelector((state: RootState) => state.dataUser);
  const history = useSelector((state: RootState) => state.history);

  const [location, setLocation] = useState<Location>();

  const [isInvalidLocaltionModal, setIsInvalidLocaltionModal] =
    useState<boolean>(false);
  console.log("🚀 ~ Home ~ isInvalidLocaltionModal:", isInvalidLocaltionModal);
  const [isGpsActiveModal, setIsGpsActiveModal] = useState<boolean>(false);
  const [IsLoginTime, setIsLoginTime] = useState<boolean>(true);
  const [IsLogoutTime, setIsLogoutTime] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const areaLongitude = useMemo(() => {
    if (location?.longitude && location?.latitude) {
      const isLong =
        location?.longitude?.toString()?.substring(0, 8) == "111.4820";
      const isLat = location?.latitude?.toString()?.substring(0, 5) == "-7.62";
      return isLong && isLat;
    }
  }, [location]);

  const getOneTimeLocation = useCallback(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000,
    })
      .then((location) => {
        setLocation(location);
        setIsGpsActiveModal(false);
      })
      .catch((error) => {
        const { code, message } = error;
        setIsGpsActiveModal(true);
        setErrorMessage(code + " " + message);
        console.warn(code, message);
      });
  }, []);

  const isLoggetInToday = useMemo(() => {
    return (
      history.data?.find(
        (data) =>
          data.date === dayjs().locale("id").format("dddd, DD MMM") &&
          data.type === "Masuk"
      ) ?? false
    );
  }, [history]);

  const isLoggetOutToday = useMemo(() => {
    return (
      history.data?.find(
        (data) =>
          data.date === dayjs().locale("id").format("dddd, DD MMM") &&
          data.type === "Pulang"
      ) ?? false
    );
  }, [history]);

  const Presensi = useCallback((type: "MASUK" | "PULANG") => {
    if (type === "MASUK") {
      dispatch(
        actionHistory.setHistoryData({
          name: dataUser.user.name as string,
          type: "Masuk",
          time: dayjs().format("HH:mm"),
          date: dayjs().locale("id").format("dddd, DD MMM"),
        })
      );
    } else {
      dispatch(
        actionHistory.setHistoryData({
          name: dataUser.user.name as string,
          type: "Pulang",
          time: dayjs().format("HH:mm"),
          date: dayjs().locale("id").format("dddd, DD MMM"),
        })
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getOneTimeLocation();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (areaLongitude === false && location)
      return setIsInvalidLocaltionModal(true);
  }, [location, areaLongitude]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoginTime(dayjs().hour() >= 6 && dayjs().hour() <= 9);
      setIsLogoutTime(dayjs().hour() >= 13 && dayjs().hour() < 18);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const invalidLocationModal = useMemo(() => {
    if (!isInvalidLocaltionModal) return null;

    return (
      <ModalCenter
        style={{ borderRadius: 16 }}
        backPress={() => {}}
        isActive={isInvalidLocaltionModal}
      >
        <View style={{ paddingVertical: 50, paddingHorizontal: 16 }}>
          <Icon
            name="warning"
            style={{ alignSelf: "center", marginBottom: 16 }}
            size={50}
            color={colors.text.red}
          />
          <TextXL align="center" color={colors.text.warning} textAlign="right">
            Posisi Anda Tidak di Kantor!
          </TextXL>
          <Gap height={16} />
          <TextL align="center" color={colors.text.black50} textAlign="right">
            Anda harus berada di kantor untuk bisa melakukan presensi
          </TextL>
        </View>
      </ModalCenter>
    );
  }, [isInvalidLocaltionModal]);

  const gpsActiveModal = useMemo(() => {
    return (
      <ModalCenter
        style={{ borderRadius: 16 }}
        backPress={() => setIsInvalidLocaltionModal(false)}
        isActive={isGpsActiveModal}
      >
        <View style={{ padding: 16 }}>
          <Icon
            name="warning"
            style={{ alignSelf: "center", marginBottom: 16 }}
            size={50}
            color={colors.text.red}
          />
          <TextL align="center" color={colors.text.warning} textAlign="right">
            {errorMessage}
          </TextL>
          <Gap height={16} />
          <TextL align="center" color={colors.text.black50} textAlign="right">
            Tolong Aktifkan GPS Anda!
          </TextL>
        </View>
      </ModalCenter>
    );
  }, [errorMessage, isGpsActiveModal]);

  const renderMain = useMemo(() => {
    return (
      <SafeScreen>
        <View style={styles.container}>
          {/* Header Profile */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* Left Content */}
            <View>
              <TextL>Hello,</TextL>
              <TextXL textStyle="bold">{dataUser.user.name}</TextXL>
            </View>

            {/* Right Content */}
            <View>
              <Image
                source={{ uri: dataUser.user.photo || "" }}
                style={{
                  width: 56,
                  height: 56,
                  resizeMode: "cover",
                  borderRadius: 50,
                }}
              />
            </View>
          </View>

          <Gap height={24} />

          {/* Jadwal Presensi */}
          <View
            style={{
              padding: 20,
              backgroundColor: colors.base.background,
              borderRadius: 12,
            }}
          >
            {/* Header */}
            <TextL color="white" textStyle="bold">
              Jadwal Jam Presensi
            </TextL>
            <Gap height={8} />
            <View>
              {/* Left Contenct */}
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <CLockOrangeSvg />
                <Gap width={8} />
                <TextM color={colors.text.white}>Jam Presensi Masuk :</TextM>
                <Gap width={6} />
                <TextM color={colors.text.white}>06:00 - 09:00</TextM>
              </View>

              <Gap height={8} />
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <CLockOrangeSvg />
                <Gap width={8} />
                <TextM color={colors.text.white}>Jam Presensi Pulang :</TextM>
                <Gap width={6} />
                <TextM color={colors.text.white}>13:00 - 17:30</TextM>
              </View>

              {/* Right Content */}
              <View style={{ justifyContent: "center" }}></View>
            </View>

            {/* Lines */}
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "rgba(255, 255, 255, 0.15)",
                paddingVertical: 8,
                marginBottom: 8,
              }}
            />

            {/* Footer */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <CalendarWhiteSvg />
                <Gap width={8} />
                <TextS color={colors.text.white}>
                  {dayjs().locale("id").format("dddd, DD MMM")}
                </TextS>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  paddingRight: 20,
                }}
              >
                <ClockWhiteSvg />
                <Gap width={8} />
                <TextS color={colors.text.white}>
                  {dayjs().locale("id").format("HH:mm")}
                </TextS>
              </View>
            </View>
          </View>

          <Gap height={24} />

          {/* Category */}
          {!location ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={() => Presensi("MASUK")}
                style={{ alignItems: "center" }}
                disabled={!IsLoginTime || Boolean(isLoggetInToday)}
              >
                <View
                  style={{
                    backgroundColor: colors.background.gray2,
                    padding: 14,
                    borderRadius: 100,
                    elevation: 2,
                  }}
                >
                  <Icon
                    name="log-in"
                    size={40}
                    color={colors.base.background}
                  />
                </View>
                <Gap height={8} />
                <TextM size={15} color={colors.text.grey}>
                  Presensi Masuk
                </TextM>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Presensi("PULANG")}
                style={{ alignItems: "center" }}
                disabled={!IsLogoutTime || Boolean(isLoggetOutToday)}
              >
                <View
                  style={{
                    backgroundColor: colors.background.gray2,
                    padding: 14,
                    borderRadius: 100,
                    elevation: 2,
                  }}
                >
                  <Icon
                    name="log-out"
                    size={40}
                    color={colors.base.background}
                  />
                </View>
                <Gap height={8} />

                <TextM size={15} color={colors.text.grey}>
                  Presensi Pulang
                </TextM>
              </TouchableOpacity>
            </View>
          )}

          <Gap height={24} />
          <View>
            <TextL textStyle="bold">Riwayat</TextL>
            <Gap height={8} />
            <ScrollView>
              {history?.data?.length === 0 && (
                <TextS align="center">Belum ada riwayat</TextS>
              )}
              {history?.data
                ?.slice(0)
                ?.reverse()
                ?.map((data: any, index) => (
                  <View key={index} style={styles.cardRiwayat}>
                    <View style={{ justifyContent: "space-between" }}>
                      <TextM textStyle="semiBold">{data?.name}</TextM>
                      <TextS>{data?.type}</TextS>
                    </View>
                    <View style={{ justifyContent: "space-between" }}>
                      <TextS>{data?.date}</TextS>
                      <TextM align="right">{data?.time}</TextM>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
        {/* {invalidLocationModal} */}
        {gpsActiveModal}
      </SafeScreen>
    );
  }, [
    location,
    dataUser,
    invalidLocationModal,
    gpsActiveModal,
    errorMessage,
    isGpsActiveModal,
    isInvalidLocaltionModal,
    history,
    areaLongitude,
    IsLoginTime,
    IsLogoutTime,
  ]);

  return renderMain;
}

export default Home;
