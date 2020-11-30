import React, { useState } from "react";
import { connect } from "react-redux";
import { addProject } from "../redux/Actions";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import RadioInput from "./RadioInput";
import CheckboxInput from "./CheckboxInput";
import Input from "./Input";
import CustomButton from "./Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "rgb(14, 197, 255)",
    minHeight: "100vh",
  },
  headingText: {
    fontSize: 60,
    color: "#fff",
    margin: 0,
    fontWeight: "bold",
    padding: "80px 0",
  },
  closeButton: {
    position: "absolute",
    right: 40,
    top: 40,
  },
  mainView: {
    padding: "0 150px",
    flexGrow: 1,
  },
  subView: {
    width: "100%",
    flexDirection: "column",
  },
  subHeadingText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    margin: 0,
    paddingBottom: 20,
  },
  customLabel: {
    color: "#fff",
  },
  projectType: {
    paddingTop: 50,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    margin: 0,
    paddingBottom: 20,
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#fff"),
    backgroundColor: "#fff",
    borderRadius: "50%",
    minWidth: 0,
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
}))(Button);

const crossIcon = { color: "rgb(0, 187, 255)", width: 35, height: 35 };

const Main = (props) => {
  const classes = useStyles();
  const [month, setMonth] = useState("1");
  const [projectType, setProjectType] = useState({
    desktop: false,
    web: false,
    mobile: false,
    other: false,
  });
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = { ...errors };
    if (month) temp.month = month ? "" : "This field is required.";
    if (
      [
        projectType.desktop,
        projectType.mobile,
        projectType.web,
        projectType.other,
      ].filter((v) => v).length !== 1
    ) {
      temp.projectType = "This field is required.";
    } else {
      temp.projectType = "";
    }
    if (name === "") {
      temp.name = "This field is required.";
    } else {
      temp.name = "";
    }
    if (email === "") {
      temp.email = "This field is required.";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      temp.email = "Email is not valid.";
    } else {
      temp.email = "";
    }

    if (company === "") {
      temp.company = "This field is required.";
    } else {
      temp.company = "";
    }
    if (budget === "") {
      temp.budget = "This field is required.";
    } else if (!/^[0-9][A-Za-z0-9 -]*$/.test(budget)) {
      temp.budget = "Please enter the number.";
    } else {
      temp.budget = "";
    }
    if (about === "") {
      temp.about = "This field is required.";
    } else {
      temp.about = "";
    }
    setErrors({
      ...temp,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (
      errors.month === "" &&
      errors.projectType === "" &&
      errors.name === "" &&
      errors.company === "" &&
      errors.email === "" &&
      errors.budget === "" &&
      errors.about === ""
    ) {
      props.addProject({
        month,
        projectType,
        name,
        company,
        email,
        budget,
        about,
      });
    }
  };

  const handleChangeCheckbox = (event) => {
    setProjectType({
      ...projectType,
      [event.target.name]: event.target.checked,
    });
  };

  const { desktop, web, mobile, other } = projectType;

  return (
    <div className={classes.root}>
      <ColorButton className={classes.closeButton}>
        <CloseIcon style={crossIcon} />
      </ColorButton>
      <div className={classes.mainView}>
        <h1 className={classes.headingText}>Let's craft your product.</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid container item xs={12} xl={4} lg={4} md={4} spacing={3}>
              <div className={classes.subView}>
                <h5 className={classes.subHeadingText}>Timeframe</h5>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="month"
                    name="month"
                    value={month}
                    onChange={(event) => setMonth(event.target.value)}
                  >
                    <FormControlLabel
                      className={classes.customLabel}
                      value="1"
                      control={<RadioInput />}
                      label="1 month"
                    />
                    <FormControlLabel
                      className={classes.customLabel}
                      value="2"
                      control={<RadioInput />}
                      label="2-3 months"
                    />
                    <FormControlLabel
                      className={classes.customLabel}
                      value="4"
                      control={<RadioInput />}
                      label="4+ months"
                    />
                  </RadioGroup>
                </FormControl>
                {errors.month ? (
                  <span style={{ fontSize: 14, color: "red" }}>
                    {errors.month}
                  </span>
                ) : null}
                <h5 className={[classes.projectType]}>Project type</h5>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      className={classes.customLabel}
                      control={
                        <CheckboxInput
                          checked={desktop}
                          onChange={handleChangeCheckbox}
                          name="desktop"
                        />
                      }
                      label="Desktop"
                    />
                    <FormControlLabel
                      className={classes.customLabel}
                      control={
                        <CheckboxInput
                          checked={web}
                          onChange={handleChangeCheckbox}
                          name="web"
                        />
                      }
                      label="Web"
                    />
                    <FormControlLabel
                      className={classes.customLabel}
                      control={
                        <CheckboxInput
                          checked={mobile}
                          onChange={handleChangeCheckbox}
                          name="mobile"
                        />
                      }
                      label="Mobile"
                    />
                    <FormControlLabel
                      className={classes.customLabel}
                      control={
                        <CheckboxInput
                          checked={other}
                          onChange={handleChangeCheckbox}
                          name="other"
                        />
                      }
                      label="Ohter"
                    />
                  </FormGroup>
                  {errors.projectType ? (
                    <span style={{ fontSize: 14, color: "red" }}>
                      {errors.projectType}
                    </span>
                  ) : null}
                </FormControl>
              </div>
            </Grid>
            <Grid container item xs={12} xl={3} lg={3} md={3} spacing={3}>
              <div className={classes.subView}>
                <h5 className={classes.subHeadingText}>Personal details</h5>

                <Input
                  placeholder={"Name"}
                  onChange={(event) => setName(event.target.value)}
                  error={errors.name}
                />
                <Input
                  placeholder={"Company"}
                  onChange={(event) => setCompany(event.target.value)}
                  error={errors.company}
                />
                <Input
                  placeholder={"Email"}
                  onChange={(event) => setEmail(event.target.value)}
                  error={errors.email}
                />
                <Input
                  placeholder={"Budget"}
                  onChange={(event) => setBudget(event.target.value)}
                  error={errors.budget}
                />
              </div>
            </Grid>
            <Grid
              container
              item
              xs={12}
              xl={1}
              lg={1}
              md={1}
              spacing={3}
            ></Grid>
            <Grid container item xs={12} xl={4} lg={4} md={4} spacing={3}>
              <div style={{ marginTop: 40, width: "100%" }}>
                <Input
                  placeholder={"Tell us about your project..."}
                  multiple={true}
                  row={11}
                  onChange={(event) => setAbout(event.target.value)}
                  error={errors.about}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  textAlign: "right",
                }}
              >
                <CustomButton
                  title={"Send Inquiry"}
                  type={"submit"}
                ></CustomButton>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProject: (item) => dispatch(addProject(item)),
  };
};

export default connect("", mapDispatchToProps)(Main);
