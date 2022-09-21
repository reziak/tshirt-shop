import { styled } from "..";

export const HeaderContainer = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  
  variants: {
    noCart: {
      true: {
        justifyContent: "center",
        button: {
          display: "none",
        },
      },
    },

  }
});

export const CartButton = styled("button", {
  width: 48,
  height: 48,
  backgroundColor: "$gray800",
  borderRadius: 6,
  position: "relative",
  border: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  
  "&:hover": {
    svg: {
      color: "$white",
    },
  },

  svg: {
    color: "$gray300",
    transition: "color 0.2s",
  },

  span: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "$green500",
    color: "$white",
    width: 30,
    height: 30,
    position: "absolute",
    top: -10,
    right: -10,
    border: "3px solid $gray900",
  }
});
