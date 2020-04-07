import * as React from 'react';
import { ActivityTypeForm } from './ActivityTypeForm'
import { DetailsForm } from './DetailsForm'
import { Copyright } from './Copyright'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import { StyleRules } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import validator from '../../../utils/FormValidate';
import { Review } from './ReviewPage'
import submitActivity from '../../../utils/SubmitActivity'

const useStyles = makeStyles((theme: Theme): StyleRules  => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Activity Type', 'Details', 'Review'];

export const DeReportingForm: React.FC<{}> = () => {
 
  const classes = useStyles();
  const [state, setState] = React.useState({
    activeStep: 0,
    errorMessage: '',
    activityType: '',
    activityDate: new Date(),
    submitted: false,
    details: {}
  });

  const getStepContent = () => {
    switch (state.activeStep) {
      case 0:
        // activity type page
        return <ActivityTypeForm 
                  setActivityTypeDate={((a) => setState(prevState => {
                    let newState = prevState
                    
                    if (prevState.activityType != a['activityType']) {
                      newState.details = {}
                    }

                    newState.activityType = a['activityType']
                    newState.activityDate = a['activityDate']
                    return newState
                  }))} 

                  details={{activityType: state.activityType, activityDate: state.activityDate}}
              />;
      case 1:
        // details page
        return <DetailsForm 
                  setDetails={((d) => setState(prevState => ({...prevState, details: d})))} 
                  activityType={state.activityType}
                  subState={state.details}
                />;
      case 2:
        // review page
        return <Review 
                    details={{activityType: state.activityType, ...state['details']}}
                />;
      default:
        throw new Error('Unknown step');
    }
  }

  const validationError = (message: string) => {
    setState({...state, errorMessage: message})
    setTimeout(() => {
      setState(prevState => ({...prevState, errorMessage: ''}))
    }, 5000)
  }

  const validateInputs = () => {
    return validator(state)
  }

  const handleNext = async () => {

    // handle validation errors
    let message = validateInputs()

    // submit data if in review page
    if (state.activeStep === 2) {
      const data = {
        activityDate: state.activityDate,
        details: state.details
      }
      
      try {
        setState({...state, submitted: true})
        await submitActivity(state.activityType, data)
        setState({...state, submitted: false})
      } catch (e) {
        console.log(e)
        message = 'There was an error with the submission! Please contact your office digital leader.'
      }
    }

    if (message != '') {
      validationError(message)
    } else {
      setState(prevState => ({...prevState, 
        activeStep: prevState.activeStep + 1, errorMessage: ''}))
    }
  }

  const handleBack = () => {
    setState(prevState => ({...prevState, 
        activeStep: prevState.activeStep - 1}))
  }


  const handleNewSubmission = () => {

    setState(prevState => ({...prevState, 
      activeStep: 0, 
      activityType: '',
      activityDate: new Date(),
      details: {}
  }))
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Australasia DE Activity Reporting
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Submit an activity
          </Typography>
          <Stepper activeStep={state.activeStep} className={classes.stepper} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {state.activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Your activity has been submited!
                </Typography>
                <Typography variant="subtitle1">
                  {'Want to know how often digital activities are undertaken? Take a look at the statistics '}
                  <Link color="primary" href="https://arup.sharepoint.com/sites/TnRDigital_39-200/SitePages/DEReport.aspx">
                    here.
                  </Link>
                </Typography>
                <div className={classes.buttons}>
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNewSubmission}
                      className={classes.button}
                    >
                      New submission
                    </Button>
                </div>
                
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent()}
                <div className={classes.buttons}>
                  {state.activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  
                  {!state.submitted ? (<Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {state.activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>) : (
                    <Button
                    disabled
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    {'Submit'}
                  </Button>

                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
          <br/>
          {state.errorMessage != '' && (
                <Alert severity="error">{state.errorMessage}</Alert>
                )
          }
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

