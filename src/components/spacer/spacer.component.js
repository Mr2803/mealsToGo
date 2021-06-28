import React from "react";
import styled, { useTheme } from "styled-components/native";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
};
const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  bottom: "marginBottom",
  right: "marginRight",
};

const getVariant = (position, size, theme) => {
  // console.log(`${positionVariant[position]}:${sizeVariant[size]}`);
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];
  // console.log(value);
  return `${property}:${value}`;
};

const SpacerView = styled.View`
  ${({ variant }) => variant}
`;

export const Spacer = ({ position, size, children }) => {
  const theme = useTheme();
  //   console.log(theme);
  const variant = getVariant(position, size, theme);

  return <SpacerView variant={variant}>{children}</SpacerView>;
};

Spacer.defaultProps = {
  position: "top",
  size: "small",
};
