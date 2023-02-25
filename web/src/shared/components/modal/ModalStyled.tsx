import * as React from "react";

export const ModalStyled = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 250,
  bgcolor: "background.paper",
  border: "1px solid",
  borderRadius: "5%",
  boxShadow: 24,
  p: 4,
};

export const buttonStyledModal = {
  width: "100%",
  padding: "5px",
  margin: "15px 10px 0 10px",
};

export const buttonStyledModalExclude = {
  width: "100%",
  padding: "5px",
  margin: "40px 10px 0 10px",
};

export const ModalArchive = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  height: 500,
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const ModalAlert = {
  display: "flex",
  position: "absolute" as "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  color: "#069dad",
  bgcolor: "background.paper",
  border: "1px solid black",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};
