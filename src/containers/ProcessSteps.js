import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Template from './Template';
import Design from '../backup/Design';
const styles = theme => ({
  root: {
    width: '100%',
    flex: 1
  },
  backButton: {
    marginRight: theme.spacing.unit,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Select Template', 'Design Template', 'Publish Template'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <Template />;
    case 1:
      return <Design />;
    case 2:
      return 'Publish Template';
    default:
      return 'Uknown stepIndex';
  }
}

class ProcessSteps extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
              <div>
                {
                  getStepContent(activeStep)
                }
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

ProcessSteps.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ProcessSteps);