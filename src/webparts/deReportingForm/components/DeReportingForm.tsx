import * as React from 'react';
import { ActivityTypeForm } from './ActivityTypeForm'
import { DetailsForm } from './DetailsForm'
import { Copyright } from './Copyright'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles, Theme } from '@material-ui/core';
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
import { submitBatchActivities } from '../../../utils/SubmitActivity'
import { ADS } from '../../../Models/ADS'

const useStyles = makeStyles((theme: Theme): StyleRules  => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 620,
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
  multipleSubmission: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1)
  }
}));

const steps = ['Activity Type', 'Details', 'Review']

export const DeReportingForm: React.FC<{}> = () => {
 
  const classes = useStyles();
  const [state, setState] = React.useState({
    activeStep: 1,
    errorMessage: '',
    activityType: 'multiple',
    activityDate: new Date(),
    submitted: false,
    details: {
      techpillarFeature: false,
      milestone: false
    },
    batchDetails: [],
    batchData: []
  });

  let ads

  React.useEffect(()=>{
    ads = new ADS() 
  }, [])

  const getStepContent = () => {
    switch (state.activeStep) {
      case 0:
        // activity type page
        return <ActivityTypeForm 
                  setActivityTypeDate={((a) => setState(prevState => {
                    let newState = prevState
                    
                    if (prevState.activityType != a['activityType']) {
                      newState.details = {
                        techpillarFeature: false,
                        milestone: false
                      }
                    }

                    newState.activityType = a['activityType']
                    newState.activityDate = a['activityDate']
                    newState.details = {...newState.details,
                      techpillarFeature: a['techpillarFeature'],
                      milestone: a['milestone']
                    }
                    
                    return newState
                  }))} 
                  checkbox={{techpillarFeature: state.details['techpillarFeature'], milestone: state.details['milestone']}}
                  details={{activityType: state.activityType, 
                    activityDate: state.activityDate, 
                    techpillarFeature: state.details.techpillarFeature,
                    milestone: state.details.milestone
                  }}
              />
      case 1:
        // details page
        return <DetailsForm 
                  setDetails={(d) => {
                    
                    setState((prevState: any) => {
                    if (prevState.activityType != 'multiple') {
                      
                      return {...prevState, details: d}
                    } 
                    return {...prevState, batchDetails: d}
                    })
                  }}
                  activityType={state.activityType}
                  subState={state.details}
                  setValidationError={validationError}
                  batchData={state.batchData}
                  setBatchDataMain={((flattened, raw) => setState(prevState => ({...prevState, batchData: raw, batchDetails: flattened})))}
                  batchDetails={state.batchDetails}
                  notBatch={state.activityType != 'multiple'} 
                />
      case 2:
        // review page
        return <Review 
                    details={formatDataToSave()}
                />
      default:
        throw new Error('Unknown step');
    }
  }

  const formatDataToSave = () => {
    if (state.activityType != 'multiple') {
  
      const formattedOut = {
        activityType: state.activityType, 
        activityDate: state.activityDate,
        techpillarFeature: state.details.techpillarFeature,
        milestone: state.details.milestone,
        hours: state.details['hours'],
        projectName: ''
      }
      let formattedDetails = {...state.details}
      delete formattedDetails.techpillarFeature
      delete formattedDetails.milestone
      delete formattedDetails['hours']

      return [{...formattedOut, details: formattedDetails}]
    }
    return state.batchDetails.map((activity) => {
      delete activity.details.projectHours
      delete activity.details.hours
      return activity
    })
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
    console.log('main state', state)
    // handle validation errors
    let message = validateInputs()


    // submit data if in review page
    if (state.activeStep === 2) {
      
      try {
        let data = formatDataToSave()
        setState({...state, submitted: true})
        await submitBatchActivities(data)
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
    let nextStep
    let activityType = state.activityType
    if (state.activeStep == 0){
      nextStep = state.activeStep + 1
      activityType = 'multiple'
    } else {
      nextStep = state.activeStep - 1
    }
    setState(prevState => ({...prevState, 
        activityType,
        activeStep: nextStep}))
  }

  const handleNewSubmission = () => {
    setState(prevState => ({...prevState, 
      activeStep: 1, 
      activityType: 'multiple',
      activityDate: new Date(),
      details: {
        techpillarFeature: false,
        milestone: false
      },
      batchData: [],
      batchDetails: []
  }))
  }
  
  const handleMultiple = () => {
    setState(prevState => ({...prevState, 
      activeStep: 0,
      activityType: ''
  }))
  }

  return (
    <React.Fragment>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
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
            Digital activity submission
          </Typography>
          {state.activityType != 'multiple' ? (
            <Stepper activeStep={state.activeStep} className={classes.stepper} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          ) : (
            <Stepper activeStep={state.activeStep-1} className={classes.stepper} alternativeLabel>
            {steps.slice(1, steps.length).map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          )
        }
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
                
                {state.activeStep == 1 && state.activityType == 'multiple' && ( 
                  <div className={classes.multipleSubmission}>
                    or <Link onClick={handleMultiple}>submit single activity.</Link>
                  </div>
                  )
                
                  }
                <div className={classes.buttons}>
                  {state.activeStep != 1 || state.activityType != 'multiple' ? (
                    <Button onClick={handleBack} className={classes.button}>
                        Back
                    </Button>
                    ) : null}
                  
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

