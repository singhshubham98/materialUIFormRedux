import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    width: "100%",
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "rgb(0,179,254)",
    border: "1px solid rgb(0,179,254)",
    fontSize: 16,
    width: "100%",
    color: "#fff",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.

    "&:focus": {
      borderColor: "rgb(0,179,254)",
    },
  },
}))(InputBase);

export default function Input(props) {
  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <BootstrapInput
        placeholder={props.placeholder}
        multiline={props.multiple}
        rows={props.row}
        value={props.value}
        onChange={props.onChange}
      />
      {props.error ? (
        <span style={{ fontSize: 14, color: "red" }}>{props.error}</span>
      ) : null}
    </div>
  );
}
