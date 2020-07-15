import React, { useEffect } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import Animated, { Easing } from "react-native-reanimated";

import { CartButton, Row, Column } from "../components";

const screenHeight = Math.round(Dimensions.get("window").height);
const duration = 400;

export default function CameraDetail({ route, navigation }) {
  const { camera } = route.params;

  const introOpacity = new Animated.Value(0);
  const introTranslateY = new Animated.Value(70);
  const introTranslateY2 = new Animated.Value(330);
  const introScale = new Animated.Value(0.85);
  const introScale2 = new Animated.Value(0.3);

  useEffect(() => {
    const animateIntro = () => {
      Animated.timing(introOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.in(Easing.ease),
      }).start();
      Animated.timing(introScale, {
        toValue: 1,
        duration: duration,
        easing: Easing.in(Easing.ease),
      }).start();
      Animated.timing(introScale2, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
      }).start();

      Animated.timing(introTranslateY, {
        toValue: 0,
        duration: duration,
        easing: Easing.in(Easing.ease),
      }).start();
      Animated.timing(introTranslateY2, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.ease),
      }).start();
    };

    animateIntro();
  }, [
    introOpacity,
    introScale,
    introScale2,
    introTranslateY,
    introTranslateY2,
  ]);

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <PageWrapper>
        <CardWrapper>
          <HeaderWrapper>
            <TouchableOpacity onPress={() => goBack()}>
              <Feather name="chevron-left" size={36} />
            </TouchableOpacity>
            <CartButton />
          </HeaderWrapper>

          <Row
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: -16,
              padding: 0,
            }}
          >
            <Animated.View
              style={{
                opacity: introOpacity,
                transform: [{ translateY: introTranslateY, scale: introScale }],
              }}
            >
              <Column>
                <CountBlock>
                  <RentsCount>245</RentsCount>
                  <CountBlockLabel>RENTS</CountBlockLabel>
                </CountBlock>
                <CountBlock>
                  <ReviewsCount>135</ReviewsCount>
                  <CountBlockLabel>REVIEWS</CountBlockLabel>
                </CountBlock>
              </Column>
            </Animated.View>

            <Column>
              <SharedElement id={camera.id}>
                <Image source={camera.image} />
              </SharedElement>
              <Animated.View
                style={{
                  opacity: introOpacity,
                  transform: [
                    { scale: introScale, translateY: introTranslateY },
                  ],
                }}
              >
                <Row style={{ marginTop: -20, marginRight: -20 }}>
                  <StrongProgressBar />
                  <ThinProgressBar />
                </Row>
              </Animated.View>
            </Column>
          </Row>

          <Animated.View
            style={{
              opacity: introOpacity,
              transform: [{ translateY: introTranslateY, scale: introScale }],
            }}
          >
            <TitleWrapper>
              <Title>{camera.name}</Title>
            </TitleWrapper>
            <Row style={{ marginLeft: 20 }}>
              {camera.tags.map((tag, index) => (
                <TagWrapper key={index}>
                  <Tag>{tag}</Tag>
                </TagWrapper>
              ))}
            </Row>
            <DescriptionText>
              An ideal partner offering superior speed and high-resolution image
            </DescriptionText>
          </Animated.View>
        </CardWrapper>

        <Animated.View
          style={{
            opacity: introOpacity,
            transform: [{ scale: introScale2 }],
          }}
        >
          <AboutAndPriceWrapper>
            <AboutWrapper>
              <About>About</About>
            </AboutWrapper>
            <PriceWrapper>
              <Price>Price</Price>
            </PriceWrapper>
          </AboutAndPriceWrapper>
        </Animated.View>

        <Animated.View
          style={{
            opacity: introOpacity,
          }}
        >
          <TitleWrapper
            style={{
              marginTop: screenHeight > 700 ? 40 : 20,
              marginBottom: screenHeight > 700 ? 14 : 12,
            }}
          >
            <Title>Price Details</Title>
          </TitleWrapper>
        </Animated.View>
        <PriceDetailsBlock>
          {prices &&
            prices.map((price, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: introOpacity,
                  transform: [{ scale: introScale2 }],
                }}
              >
                <PriceBlock>
                  <PriceDay>{price.day}</PriceDay>
                  <Row>
                    <Dollar>$</Dollar>
                    <PriceValue>{price.price}</PriceValue>
                  </Row>
                </PriceBlock>
              </Animated.View>
            ))}
        </PriceDetailsBlock>
      </PageWrapper>
      <Animated.View
        style={{
          transform: [{ translateY: introTranslateY2 }],
        }}
      >
        <BottomButton>
          <ButtonText>CHECK AVAILABILITY</ButtonText>
        </BottomButton>
      </Animated.View>
    </>
  );
}
const BottomButton = styled.View`
  background: ${(props) => props.theme.primary};
  padding: ${screenHeight > 700 ? "32px 30px 40px" : "14px 30px 14px"};
  align-items: center;
  justify-content: center;
  border-radius: ${screenHeight > 700 ? "24px" : "0"};
  box-shadow: ${(props) => props.theme.boxShadow};
`;
const ButtonText = styled.Text`
  font-family: "montserrat-semibold";
  font-size: 20px;
  color: white;
`;
const prices = [
  {
    day: "WEEKDAY",
    price: "10.00",
  },
  { day: "WEEKEND", price: "10.00" },
];

const CardWrapper = styled.View`
  background: white;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding-bottom: 30px;
  box-shadow: ${(props) => props.theme.boxShadow};
  margin-top: -9px;
  border: 2px solid white;
`;

const StrongProgressBar = styled.View`
  width: 70px;
  height: 2px;
  background: ${(props) => props.theme.primary};
`;
const ThinProgressBar = styled.View`
  width: 220px;
  height: 2px;
  background: ${(props) => props.theme.primaryLighter2};
`;

const CountBlock = styled.View`
  margin: 12px;
  margin-left: 30px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const RentsCount = styled.Text`
  font-family: "montserrat-semibold";
  color: ${(props) => props.theme.blackText};
  font-size: 25px;
  margin-bottom: 4px;
`;

const ReviewsCount = styled.Text`
  font-family: "montserrat-semibold";
  color: ${(props) => props.theme.blackText};
  font-size: 25px;
  margin-bottom: 4px;
`;

const CountBlockLabel = styled.Text`
  font-family: "montserrat-semibold";
  color: ${(props) => props.theme.grayText};
  font-size: 14px;
`;

const PageWrapper = styled.View`
  background: ${(props) => props.theme.appBackground};
  flex: 1;
  padding-top: 9px;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin: ${screenHeight > 700 ? "24px 20px 16px" : "12px 20px 16px"};
`;

const Title = styled.Text`
  font-family: "montserrat-bold";
  color: ${(props) => props.theme.blackText};
  font-size: ${screenHeight > 700 ? "24px" : "24px"};
`;

const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: ${screenHeight > 700 ? "20px" : "0px 10px"};
  margin-top: 40px;
  align-items: center;
`;
const Image = styled.Image`
  width: ${screenHeight > 700 ? "300px" : "220px"};
  height: ${screenHeight > 700 ? "300px" : "220px"};
  margin-right: -16px;
  margin-top: -30px;
`;

const TagWrapper = styled.View`
  background: ${(props) => props.theme.tagBackground};
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  border-radius: 8px;
`;
const Tag = styled.Text`
  font-family: "montserrat-bold";
  color: ${(props) => props.theme.blackTextLighter};
  font-size: 14px;
`;

const DescriptionText = styled.Text`
  color: ${(props) => props.theme.grayText};
  font-size: ${screenHeight > 700 ? "16px" : "14px"};
  font-family: "montserrat-medium";
  padding: ${screenHeight > 700
    ? "20px 30px 20px 20px"
    : "12px 30px 12px 20px"};
`;

const AboutAndPriceWrapper = styled.View`
  background: white;
  margin: -30px 34px 0px 34px;
  padding: 4px 4px;
  border-radius: 30px;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
const PriceDetailsBlock = styled.View`
  margin: 0px 20px 0px 20px;
  padding: 4px 4px;
  border-radius: 30px;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
`;
const AboutWrapper = styled.View`
  padding: ${screenHeight > 700 ? "14px 64px" : "10px 44px"};
`;
const PriceWrapper = styled.View`
  background: ${(props) => props.theme.primary};
  padding: ${screenHeight > 700 ? "14px 64px" : "10px 44px"};
  border-radius: 30px;
`;
const About = styled.Text`
  font-size: 16px;
  font-family: "montserrat-semibold";
  color: ${(props) => props.theme.grayText};
`;
const Price = styled.Text`
  font-size: 16px;
  font-family: "montserrat-semibold";
  color: white;
`;

const PriceBlock = styled.View`
  border-radius: 14px;
  background: white;
  padding: ${screenHeight > 700 ? "14px 50px" : "14px 40px"};
  margin: 0px 20px 0px 0px;
  align-content: center;
  justify-content: center;
`;
const PriceDay = styled.Text`
  text-align: center;
  font-size: 12px;
  font-family: "montserrat-medium";
  color: ${(props) => props.theme.grayText};
`;
const PriceValue = styled.Text`
  font-size: 24px;
  font-family: "montserrat-semibold";
  color: ${(props) => props.theme.blackText};
`;
const Dollar = styled.Text`
  font-size: 14px;
  margin-right: 2px;
  margin-top: 2px;
  font-family: "montserrat-semibold";
  color: ${(props) => props.theme.blackText};
`;
