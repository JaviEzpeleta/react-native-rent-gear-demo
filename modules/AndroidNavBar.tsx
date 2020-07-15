import React, { Component } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import styled, { withTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";

import { Row } from "../components";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

class AndroidNavBar extends Component {
  state = {
    currentPage: "Home",
    hidden: false,
  };
  goToProfile() {
    this.props.goToProfileScreen();
    this.setState({ currentPage: "Profile" });
  }
  goToHome() {
    this.props.goToHomeScreen();
    this.setState({ currentPage: "Home" });
  }

  componentDidUpdate() {
    const { action } = this.props;
    const { hidden } = this.state;

    if (action === "viewEquipment") {
      if (!hidden) {
        this.setState({ hidden: true });
      }
    }
    if (action === "goHome") {
      if (hidden) {
        this.setState({ hidden: false });
      }
    }
  }
  render() {
    const { currentPage, hidden } = this.state;
    if (hidden) {
      return <View />;
    }
    if (!hidden) {
      return (
        <Wrapper>
          <Row style={{ justifyContent: "space-around", alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.goToHome()}>
              <SearchButtonWrapper>
                <Item>
                  <Feather
                    size={24}
                    name="search"
                    color={
                      currentPage === "Home"
                        ? this.props.theme.primary
                        : this.props.theme.blackText
                    }
                  />
                  <Title
                    style={{
                      color:
                        currentPage === "Home"
                          ? this.props.theme.primary
                          : this.props.theme.blackText,
                    }}
                  >
                    SEARCH
                  </Title>
                </Item>
              </SearchButtonWrapper>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.goToProfile()}>
              <ProfileButtonWrapper>
                <Item>
                  <Feather
                    size={24}
                    name="user"
                    color={
                      currentPage === "Profile"
                        ? this.props.theme.primary
                        : this.props.theme.blackText
                    }
                  />

                  <Title
                    style={{
                      color:
                        currentPage === "Profile"
                          ? this.props.theme.primary
                          : this.props.theme.blackText,
                    }}
                  >
                    PROFILE
                  </Title>
                </Item>
              </ProfileButtonWrapper>
            </TouchableOpacity>

            <ChatButtonWrapper>
              <Item>
                <Feather
                  size={24}
                  name="message-circle"
                  color={this.props.theme.blackText}
                  // color={
                  //   this.props.action === "goHome"
                  //     ? this.props.theme.blackText
                  //     : "white"
                  // }
                />
                <Title>CHAT</Title>
              </Item>
            </ChatButtonWrapper>
          </Row>
        </Wrapper>
      );
    }
  }
}

const Wrapper = styled.View`
  background: white;
  /* border: 3px solid purple; */
  height: ${screenHeight > 700 ? "100px" : "80px"};
  margin-top: auto;
  /* position: absolute; */
  bottom: 0px;
  width: 100%;
  border-top-right-radius: 18px;
  border-top-left-radius: 18px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
const SearchButtonWrapper = styled.View``;
const ProfileButtonWrapper = styled.View``;
const ChatButtonWrapper = styled.View``;

const Title = styled.Text`
  color: ${(props) => props.theme.blackText};
  font-family: "montserrat-extra-bold";
  font-size: 10px;
  margin-top: 8px;
`;
const Item = styled.View`
  flex-direction: column;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const mapStateToProps = (state) => {
  return { action: state.action };
};
function mapDispatchToProps(dispatch) {
  return {
    goToProfileScreen: () =>
      dispatch({
        type: "OPEN_PROFILE",
      }),
    goToHomeScreen: () =>
      dispatch({
        type: "VIEW_HOME",
      }),
  };
}

// export default withTheme(
//   connect(mapStateToProps, mapDispatchToProps)(AndroidNavBar)
// )
export default withTheme(
  connect(mapStateToProps, mapDispatchToProps)(AndroidNavBar)
);
