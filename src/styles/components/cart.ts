import { styled } from "..";

export const CartContainer = styled("aside", {
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  right: 0,
  height: "100vh",
  width: "100%",
  maxWidth: 480,
  backgroundColor: "$gray800",
  padding: "4.5rem 3rem 3rem",

  h1: {
    fontSize: "$lg",
    color: "$gray100",
    marginBottom: "2rem",
  },

  "> div": {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }
});

export const CloseCart = styled("button", {
  position: "absolute",
  top: 24,
  right: 24,
  backgroundColor: "transparent",
  border: 0,
  cursor: "pointer",

  "&:hover": {
    svg: {
      color: "$gray100"
    }
  },

  svg: {
    color: "$gray300",
    transition: "color 0.2s",
  }
});

export const FooterContainer = styled("footer", {
  marginTop: "auto",

  div: {
    display: "flex",
    justifyContent: "space-between",

    "& + div": {
      marginTop: "0.5rem",
      strong: {
        fontSize: "$md",
      },
      span: {
        fontSize: "$lg",
        fontWeight: "bold",
      },
    },
  },

  button: {
    marginTop: "3.5rem",
    backgroundColor: "$green500",
    width: "100%",
    border: 0,
    color: "$white",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",
    transition: "background-color 0.2s",
    
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    },
  },
});

export const ItemContainer = styled("div", {
  display: "flex",
  gap: "1.25rem",

  "div + div": {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",

    p: {
      fontSize: "$md",
      color: "$gray300",
      lineHeight: 1.6,
    },
    strong: {
      fontSize: "$md",
      color: "$gray100",
      lineHeight: 1.6,
    },
    button: {
      fontSize: "$md",
      backgroundColor: "transparent",
      marginTop: "auto",
      color: "$green500",
      transition: "color 0.2s",
      cursor: "pointer",
      border: 0,
      display: "block",

      "&:hover": {
        color: "$green300",
      },
    },
  },
});

export const ImageContainer = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  width: 102,
  height: 93,
  borderRadius: 8,
  padding: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});
