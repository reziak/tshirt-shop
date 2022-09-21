import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,
  h1: {
    fontSize: "$2xl",
    color: "$gray100",
    marginTop: "3rem",
  },
  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: 1.4,
  },
  a: {
    marginTop: "5rem",
    display: "block",
    fontSize: "$lg",
    color: "$green500",
    transition: "color 0.2s",
    textDecoration: "none",
    fontWeight: "bold",
    "&:hover": {
      color: "$green300",
    },
  },
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "div + div": {
      marginLeft: -50,
    }
  }
});

export const ImageContainer = styled("div", {
  width: 140,
  height: 140,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: "50%",
  padding: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 60px 0 rgba(0, 0, 0, 0.8)",

  img: {
    objectFit: "cover",
  },
});
