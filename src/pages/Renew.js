import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  Slide,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import RenewForm from "../components/forms/RenewForm";
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";

const Renew = () => {
  const getSteps = () => {
    return ["Step 1", "Step 2", "Step 3"];
  };

  const matches = useMediaQuery("(min-width:600px)");

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return "Enter license number and specify the Number of years you'd like to renew your license for!";
      case 1:
        return "Select payment method and proceed to make payment";
      case 2:
        return "This is the bit I really care about!";
      default:
        return "No step";
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleContinue = () => {
    handleNext();
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Grid container spacing={3} className={classes.container}>
        <Grid container item xs={12} sm={6} alignItems={"space-around"}>
          <Grid item xs={12}>
            <Typography variant={matches ? "h3" : "h4"}>
              Online License Renewal
            </Typography>
            <Typography variant={"subtitle1"}>
              You can now renew your expired license online in less than a
              minute!
            </Typography>
            <Typography variant={"caption"}>
              Simply Follow the application process listed below to complete
              your license renewal.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Typography>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={6}>
          <Slide direction={"up"} in={true} timeout={1000}>
            <Box
              border={1}
              borderRadius={"borderRadius"}
              borderColor={"primary.gray"}
              className={classes.box}
            >
              <RenewForm onContinue={handleContinue} />
            </Box>
          </Slide>
        </Grid>
      </Grid>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginTop: 50,
    padding: 20,
  },
  box: {
    padding: 50,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
export default Renew;
