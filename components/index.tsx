import React from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Platform } from "react-native";

export const primaryColor: string = "#3b4157";
export const red: string = "#ff5667";

export const Row = styled.View`
  flex-direction: row;
`;
export const Column = styled.View`
  flex-direction: column;
`;

export function MenuButton() {
  return (
    <Column>
      <Row>
        <Entypo
          size={24}
          style={{ margin: -5 }}
          color={primaryColor}
          name="dot-single"
        />
        <Entypo
          size={24}
          style={{ margin: -5 }}
          color={primaryColor}
          name="dot-single"
        />
      </Row>
      <Row>
        <Entypo
          size={24}
          style={{ margin: -5 }}
          color={primaryColor}
          name="dot-single"
        />
        <Entypo
          size={24}
          style={{ margin: -5 }}
          color={primaryColor}
          name="dot-single"
        />
      </Row>
    </Column>
  );
}
export function TwoDotsMenu() {
  return (
    <Column>
      <Entypo
        size={22}
        style={{ margin: -5 }}
        color={primaryColor}
        name="dot-single"
      />
      <Entypo
        size={22}
        style={{ margin: -5 }}
        color={primaryColor}
        name="dot-single"
      />
    </Column>
  );
}

export function MenuButtonWhite() {
  return (
    <Column>
      <Row>
        <Entypo
          size={20}
          style={{ margin: -2 }}
          color="white"
          name="dot-single"
        />
        <Entypo
          size={20}
          style={{ margin: -2 }}
          color="white"
          name="dot-single"
        />
      </Row>
      <Row>
        <Entypo
          size={20}
          style={{ margin: -2 }}
          color="white"
          name="dot-single"
        />
        <Entypo
          size={20}
          style={{ margin: -2 }}
          color="white"
          name="dot-single"
        />
      </Row>
    </Column>
  );
}

const CardButtonWrapper = styled.View`
  position: relative;
  /* border: 1px solid red; */
`;
export function CartButton() {
  return (
    <Column>
      <CardButtonWrapper>
        <Entypo
          size={45}
          style={{
            position: "absolute",
            // top: -19,
            zIndex: 3,
            top: Platform.OS === "ios" ? -17 : -19,
            right: -4,
          }}
          color={red}
          name="dot-single"
        />
        <Feather size={28} color={primaryColor} name="shopping-cart" />
      </CardButtonWrapper>
    </Column>
  );
}

export function CartButtonWhite() {
  return (
    <Column>
      <CardButtonWrapper>
        <Entypo
          size={45}
          style={{
            position: "absolute",
            // top: -19,
            zIndex: 3,
            top: Platform.OS === "ios" ? -17 : -19,
            right: -4,
          }}
          color={red}
          name="dot-single"
        />
        <Feather size={28} color="white" name="shopping-cart" />
      </CardButtonWrapper>
    </Column>
  );
}

export const Title = styled.Text`
  font-family: "montserrat-extra-bold";
  font-size: 36px;
  color: ${(props) => props.theme.primary};
`;

export const Subtitle = styled.Text`
  font-family: "montserrat-bold";
  font-size: 15px;
  color: ${(props) => props.theme.grayText};
  margin: 6px 0px 6px;
`;
