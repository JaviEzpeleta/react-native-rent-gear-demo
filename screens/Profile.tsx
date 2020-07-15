import React, { useEffect } from "react"
import styled, { withTheme } from "styled-components/native"
import {
  TwoDotsMenu,
  Row,
  Column,
  CartButtonWhite,
  MenuButtonWhite,
} from "../components"
import { Dimensions, Platform } from "react-native"
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons"
import Animated, { Easing } from "react-native-reanimated"

const isAndroid = Platform.OS === "android"
const screenWidth = Math.round(Dimensions.get("window").width)
const screenHeight = Math.round(Dimensions.get("window").height)
const duration = 400

function Profile(props) {
  const cardTranslateY = new Animated.Value(-250)
  const introTranslateY = new Animated.Value(80)
  const introScale = new Animated.Value(0.2)
  const introOpacity = new Animated.Value(0)

  const animateIntro = () => {
    Animated.timing(cardTranslateY, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
    }).start()
    setTimeout(() => {
      Animated.timing(introScale, {
        toValue: 1,
        duration: duration,
        easing: Easing.out(Easing.ease),
      }).start()
      Animated.timing(introOpacity, {
        toValue: 1,
        duration: duration,
        easing: Easing.out(Easing.ease),
      }).start()
      Animated.timing(introTranslateY, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
      }).start()
    }, 100)
  }
  useEffect(() => {
    animateIntro()
  }, [])

  return (
    <PageWrapper style={{ height: screenHeight }}>
      <Animated.View style={{ transform: [{ translateY: cardTranslateY }] }}>
        <CardWrapper style={{ width: screenWidth }}>
          <HeaderWrapper>
            <MenuButtonWhite />
            <CartButtonWhite />
          </HeaderWrapper>

          <Animated.View
            style={{
              transform: [{ scale: introScale }],
              opacity: introOpacity,
            }}
          >
            <Column style={{ alignItems: "center" }}>
              <ImageWrapper>
                <Image source={require("../assets/images/Sophie.png")}></Image>
                <CheckImage>
                  <Feather
                    name="check"
                    color="white"
                    size={screenHeight > 700 ? 24 : 16}
                  />
                </CheckImage>
              </ImageWrapper>
              <Name>Sophie Moreira</Name>
              <LocationWrapper>
                <MaterialIcons
                  name="pin-drop"
                  size={16}
                  style={{ marginRight: 4 }}
                  color={props.theme.profileCardText}
                />
                <Location>Ontario, Canada</Location>
              </LocationWrapper>

              <Row>
                {userRatings.map((rating, index) => (
                  <RatingWrapper key={index}>
                    <Column>
                      <Row
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {rating.name === "RATING" && (
                          <FontAwesome
                            name="star"
                            size={screenHeight > 700 ? 18 : 15}
                            color="#fdda6d"
                            style={{ marginRight: 6 }}
                          ></FontAwesome>
                        )}
                        <RatingValue>{rating.value}</RatingValue>
                      </Row>
                      <RatingName>{rating.name}</RatingName>
                    </Column>
                  </RatingWrapper>
                ))}
              </Row>
            </Column>
          </Animated.View>
        </CardWrapper>
      </Animated.View>
      <Animated.View
        style={{ transform: [{ scale: introScale }], opacity: introOpacity }}
      >
        <ScheduleAndHistoryWrapper>
          <ScheduleWrapper>
            <Schedule>Schedule</Schedule>
          </ScheduleWrapper>
          <HistoryWrapper>
            <History>History</History>
          </HistoryWrapper>
        </ScheduleAndHistoryWrapper>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateY: introTranslateY }],
          opacity: introOpacity,
        }}
      >
        <DateWrapper>
          <Date>April, 25</Date>
          <Actions>
            <Feather
              name="list"
              size={22}
              color={props.theme.blackText}
            ></Feather>
            <Feather
              name="calendar"
              size={19}
              color={props.theme.grayText}
            ></Feather>
          </Actions>
        </DateWrapper>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateY: introTranslateY }],
          opacity: introOpacity,
        }}
      >
        <ActivityWrapper>
          <ActivityHeader>
            <Title>SONY Alpha a7R III</Title>
            <TwoDotsMenu />
          </ActivityHeader>
          <Row
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <CameraImage source={require("../assets/images/a7iii.png")} />
            <Column style={{ alignItems: "center" }}>
              <RedDot></RedDot>
              <GrayLine></GrayLine>
              <GrayDot></GrayDot>
            </Column>
            <Column>
              <TimeWrapper>
                <MiniTime>11:00</MiniTime>
                <MiniDate>Apr 25</MiniDate>
              </TimeWrapper>
              <TimeWrapper>
                <MiniTime>12:35</MiniTime>
                <MiniDate>Apr 26</MiniDate>
              </TimeWrapper>
            </Column>
            <PeriodTagWrapper>
              <PeriodTag>1 Day</PeriodTag>
            </PeriodTagWrapper>
          </Row>
        </ActivityWrapper>
      </Animated.View>
    </PageWrapper>
  )
}

const TimeWrapper = styled.View`
  flex-direction: row;
  /* border: 1px solid red; */
  padding: 5px;
  margin-left: -8px;
`
const MiniTime = styled.Text`
  color: ${(props) => props.theme.blackTextLighter};
  font-family: "montserrat-semibold";
  font-size: 16px;
`
const MiniDate = styled.Text`
  color: ${(props) => props.theme.grayText};
  font-family: "montserrat-semibold";
  font-size: 16px;
  margin-left: 12px;
  margin-right: 12px;
  /* margin-top: 12px; */
`
const PeriodTag = styled.Text`
  color: ${(props) => props.theme.primaryLighter};
  font-family: "montserrat-extra-bold";
`
const PeriodTagWrapper = styled.View`
  background: ${(props) => props.theme.primaryLighter2};
  padding: 8px 12px;
  border-radius: 6px;
  margin-right: 10px;
`
const RedDot = styled.View`
  box-shadow: ${(props) => props.theme.boxShadowStronger};
  width: 11px;
  height: 11px;
  border-radius: 5px;
  background: ${(props) => props.theme.primary};
`
const GrayDot = styled.View`
  box-shadow: ${(props) => props.theme.boxShadow};
  width: 11px;
  height: 11px;
  border-radius: 5px;
  background: ${(props) => props.theme.grayForLines};
`
const GrayLine = styled.View`
  width: 1px;
  height: 22px;
  margin-right: ${isAndroid ? "1px" : "0px"};
  background: ${(props) => props.theme.grayForLines};
`
const userRatings = [
  { name: "RATING", value: "4.5" },
  { name: "REVIEWS", value: "17" },
  { name: "RENTS", value: "13" },
]

const PageWrapper = styled.View`
  flex: 1;
  height: ${screenHeight}px;
  padding-bottom: 40px;
  background: ${(props) => props.theme.appBackground};
  /* border: 1px solid purple; */
`
const CameraImage = styled.Image`
  width: 80px;
  height: 80px;
  box-shadow: ${(props) => props.theme.boxShadowStronger};
`

const ActivityHeader = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`
const ActivityWrapper = styled.View`
  /* border: 1px solid red; */
  margin: 6px 20px;
  flex-direction: column;
  padding: ${screenHeight > 700 ? "16px 20px" : "12px 20px"};
  box-shadow: ${(props) => props.theme.boxShadow};
  background: white;
`

const Title = styled.Text`
  font-size: 16px;
  font-family: "montserrat-bold";
  color: ${(props) => props.theme.blackText};
`
const DateWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${screenHeight > 700 ? "20px 26px" : "12px 26px 10px"};
  align-items: center;
  margin-top: ${screenHeight > 700 ? "26px" : "0px"};
`
const Date = styled.Text`
  font-size: ${screenHeight > 700 ? "24px" : "20px"};
  font-family: "montserrat-extra-bold";
  color: ${(props) => props.theme.blackText};
`

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  width: 60px;
  justify-content: space-between;
`

const ScheduleWrapper = styled.View`
  background: ${(props) => props.theme.primary};
  padding: ${screenHeight > 700 ? "14px 44px" : "12px 36px"};
  border-radius: 30px;
`
const HistoryWrapper = styled.View`
  padding: ${screenHeight > 700 ? "14px 44px" : "12px 36px"};
`
const Schedule = styled.Text`
  font-size: 16px;
  font-family: "montserrat-semibold";
  color: white;
`
const History = styled.Text`
  font-size: 16px;
  font-family: "montserrat-semibold";
  color: ${(props) => props.theme.grayText};
`

const ScheduleAndHistoryWrapper = styled.View`
  background: white;
  margin: -14px 34px 0px 34px;
  padding: 5px 5px;
  border-radius: 30px;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: ${(props) => props.theme.boxShadow};
  /* margin-bottom: 240px; */
`

const RatingWrapper = styled.View`
  padding: ${screenHeight > 700 ? "40px 20px 20px" : "14px 20px 8px"};
  align-items: center;
  justify-content: center;
`
const RatingName = styled.Text`
  color: ${(props) => props.theme.profileCardText};
  font-family: "montserrat-bold";
  font-size: ${screenHeight > 700 ? "12px" : "11px"};
  margin-top: 6px;
`
const RatingValue = styled.Text`
  color: white;
  font-family: "montserrat-semibold";
  font-size: ${screenHeight > 700 ? "22px" : "16px"};
`

const CardWrapper = styled.View`
  background: ${(props) => props.theme.profileCardBackground};
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  padding-bottom: 30px;
  box-shadow: ${(props) => props.theme.boxShadow};
  /* margin-top: -9px; */
  /* margin-bottom: 150px; */
  /* height: 500px; */
  /* border: 2px solid white; */
`
const LocationWrapper = styled.View`
  flex-direction: row;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
`
const ImageWrapper = styled.View`
  margin: ${screenHeight > 700 ? "4px 0px 30px" : "4px 0px 10px"};
`
const Image = styled.Image`
  width: ${screenHeight > 700 ? "160px" : "100px"};
  height: ${screenHeight > 700 ? "160px" : "100px"};
  border-radius: 80px;
`

const CheckImage = styled.View`
  position: absolute;
  right: 0px;
  border-radius: 20px;
  width: ${screenHeight > 700 ? "40px" : "30px"};
  height: ${screenHeight > 700 ? "40px" : "30px"};
  background: ${(props) => props.theme.primary};
  align-items: center;
  justify-content: center;
`

const Name = styled.Text`
  color: white;
  font-family: "montserrat-bold";
  font-size: ${screenHeight > 700 ? "26px" : "20px"};
`

const Location = styled.Text`
  font-size: ${screenHeight > 700 ? "17px" : "14px"};
  font-family: "montserrat-bold";
  color: ${(props) => props.theme.profileCardText};
`

const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: ${screenHeight > 700 ? "20px" : "10px 20px"};
  margin-top: 30px;
  align-items: center;
`

export default withTheme(Profile)
