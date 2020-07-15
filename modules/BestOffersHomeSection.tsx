import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

import { Row, Column } from "../components";

const screenHeight = Math.round(Dimensions.get("window").height);

export default function BestOffersHomeSection() {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Best offers</Title>
        <ViewAll>View All</ViewAll>
      </TitleWrapper>
      <Content>
        <ImageWrapper>
          <Image source={require("../assets/images/canon-lens2.jpg")} />
          <DiscountLabelWrapper>
            <DiscountLabel>-30%</DiscountLabel>
          </DiscountLabelWrapper>
        </ImageWrapper>
        <InfoCard>
          <Column>
            <Row>
              {tags &&
                tags.map((tag, index) => (
                  <TagWrapper key={index}>
                    <Tag>{tag}</Tag>
                  </TagWrapper>
                ))}
            </Row>
            <OfferTitle>Canon EF 100 mm f/2.8 IS USM Macro</OfferTitle>
            <OfferTimePeriod>Apr 3 - Apr 24</OfferTimePeriod>
          </Column>
        </InfoCard>
      </Content>
    </Wrapper>
  );
}

const tags = ["Lens", "Canon"];

const TagWrapper = styled.View`
  background: ${(props) => props.theme.tagBackground};
  width: ${screenHeight > 700 ? "80px" : "70px"};
  padding: 6px 8px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  border-radius: 8px;
`;
const Tag = styled.Text`
  font-family: "montserrat-bold";
  color: ${(props) => props.theme.blackText};
`;

const OfferTitle = styled.Text`
  font-family: "montserrat-extra-bold";
  color: ${(props) => props.theme.blackText};
  font-size: ${screenHeight > 700 ? "15px" : "13px"};
  line-height: ${screenHeight > 700 ? "22px" : "18px"};
  margin-top: 14px;
`;

const OfferTimePeriod = styled.Text`
  font-family: "montserrat-semibold";
  color: ${(props) => props.theme.grayText};
  font-size: 13px;
  margin-top: 6px;
`;

const ImageWrapper = styled.View`
  background: white;
  position: relative;
  width: ${screenHeight > 700 ? "140px" : "110px"};
  padding: 20px 14px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) => props.theme.boxShadow};
  z-index: 2;
  border-bottom-right-radius: 0px;
`;

const InfoCard = styled.View`
  padding: 20px 20px;
  background: white;
  width: 230px;
  height: ${screenHeight > 700 ? "150px" : "140px"};
  box-shadow: ${(props) => props.theme.boxShadow};
  z-index: 1;
  border-radius: 8px;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
`;

const DiscountLabelWrapper = styled.View`
  background: ${(props) => props.theme.primary};
  position: absolute;
  top: 0px;
  left: 0px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 8px;
  padding: 6px 14px;
  /* overflow: hidden; */
`;
const DiscountLabel = styled.Text`
  color: white;
  font-size: 12px;
  font-family: "montserrat-bold";
`;

const Wrapper = styled.View`
  margin: 0px 20px;
`;
const Content = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin: 20px 0px;
`;

const Title = styled.Text`
  font-family: "montserrat-extra-bold";
  color: ${(props) => props.theme.blackText};
  font-size: 24px;
`;
const ViewAll = styled.Text`
  font-family: "montserrat-bold";
  font-size: 16px;
  color: ${(props) => props.theme.grayText};
  margin-bottom: 5px;
`;

const Image = styled.Image`
  width: ${screenHeight > 700 ? "80px" : "60px"};
  height: ${screenHeight > 700 ? "120px" : "110px"};
  /* box-shadow: ${(props) => props.theme.boxShadow}; */
`;
