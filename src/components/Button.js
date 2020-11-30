import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "transparent",
    border: "2px solid #fff",
    textTransform: "none",
    borderRadius: 20,
  },
}))(Button);

const CustomButton = (props) => {
  return (
    <StyledButton onClick={props.handleSubmit} type={props.type}>
      {props.title}
    </StyledButton>
  );
};

export default CustomButton;
