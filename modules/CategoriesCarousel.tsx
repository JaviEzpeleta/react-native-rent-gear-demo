import React from "react";
import { useDispatch } from "react-redux";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const screenHeight = Math.round(Dimensions.get("window").height);

const CategoriesCarousel = () => {
  const dispatch = useDispatch();

  const goToCamera = () => {
    dispatch({ type: "VIEW_EQUIPMENT" });
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {categories &&
        categories.map((category, index) => (
          <TouchableOpacity key={index} onPress={() => goToCamera()}>
            <Category style={{ marginLeft: index === 0 ? 20 : 0 }}>
              <CategoryImageWrapper>
                <CategoryImage source={category.image} />
              </CategoryImageWrapper>
              <CategoryName>{category.name}</CategoryName>
            </Category>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const categories = [
  {
    name: "Photo",
    image: require("../assets/images/sony-a7iii.png"),
  },
  {
    name: "Video",
    image: require("../assets/images/sony-camcoder.jpg"),
  },
  {
    name: "GoPro",
    image: require("../assets/images/gopro-8.png"),
  },
  {
    name: "Lenses",
    image: require("../assets/images/sony-lens.png"),
  },
];

const Category = styled.View`
  margin-right: 16px;
`;

const CategoryImageWrapper = styled.View`
  background: white;
  border-radius: 8px;
  margin-bottom: 12px;
  width: ${screenHeight > 700 ? "150px" : "120px"};
  height: ${screenHeight > 700 ? "170px" : "120px"};
  align-items: center;
  justify-content: center;
`;
const CategoryImage = styled.Image`
  width: ${screenHeight > 700 ? "130px" : "100px"};
  height: ${screenHeight > 700 ? "130px" : "100px"};
`;

const CategoryName = styled.Text`
  font-size: 18px;
  margin-left: 2px;
  font-family: "montserrat-bold";
  color: ${(props) => props.theme.blackText};
`;

export default CategoriesCarousel;
