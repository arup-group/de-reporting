import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FormControl, 
    TextField,
    makeStyles, 
    StyleRules, 
    Theme, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio, 
    InputLabel,
    Select,
    MenuItem } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme): StyleRules => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    textField: {
        margin: theme.spacing(1),
        width: '100%',
        marginTop: theme.spacing(2)
    },
    locationDropdown: {
        margin: theme.spacing(-2),
        width: '100%',
        alignContent: 'right'
    },
    textPadding: {
        paddingBottom: theme.spacing(2)
    },
    hours: {
        marginTop: theme.spacing(-2.5),
        width: '50%'
    }
  }));
  
  interface GonogoAwardsInceptionProps {
    setDetails: (d: object) => void;
    activity: string;
    subState: object;
    notBatch: boolean
  }
  
  export const GonogoAwardsInceptionDetails: React.FC<GonogoAwardsInceptionProps> = (Props: GonogoAwardsInceptionProps) => {
  
    const classes = useStyles();
    const [details, setDetails] = React.useState(Props.subState)
    
    const handleChange = (e) => {
        
        setDetails((prevState => {
            let newState = prevState
            newState[e.target.name] = e.target.value
            if (e.target.name === 'DEActivitiesImplemented' && e.target.value === 'No') {
                newState['DEActivityDescription'] = null
            }
            return newState
        }))
        Props.setDetails(details)
    }
  
    return (
      <React.Fragment>
        <Typography variant='h6' gutterBottom>
        {Props.activity.charAt(0).toUpperCase() + Props.activity.slice(1).toLowerCase()}
        </Typography>
        <br/>
        <Grid container spacing={0}>
            <Grid item xs={7}>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.textPadding}>Will DE activities be implemented?*</FormLabel>
                        <RadioGroup 
                            aria-label='DEActivitiesImplemented'
                            name='DEActivitiesImplemented'
                            value={details['DEActivitiesImplemented']} 
                            onChange={handleChange}
                        >
                        <FormControlLabel value={'Yes'} control={<Radio color='primary'/>} label='Yes'/>
                        <FormControlLabel value={'No'} control={<Radio color='primary'/>} label='No'/>
                        <FormControlLabel value='Maybe' control={<Radio color='primary'/>} label='Maybe'/>
                        </RadioGroup>
                </FormControl>
            </Grid>
            {Props.notBatch && (<Grid item xs={4}>
                <FormControl className={classes.hours}>
                <TextField
                    required
                    id="hours"
                    name="hours"
                    label="Hours"
                    value={details['hours']}
                    onChange={handleChange}
                />
                </FormControl>
            </Grid>)}
        </Grid>

        <Grid item xs={12}>
        {
            (details['DEActivitiesImplemented'] === 'Yes' || details['DEActivitiesImplemented'] === 'Maybe') && (

            <FormControl className={classes.textField}>
                <FormLabel className={classes.textPadding}>Describe the DE activities implemented</FormLabel>
                <TextField
                    required
                    id='outlined-multiline-static'
                    name='DEActivityDescription'
                    label='Enter description'
                    multiline
                    rows="4"
                    defaultValue={details['DEActivityDescription']}
                    variant='outlined'
                    onChange={handleChange}
                />
            </FormControl>
            )
        }
        </Grid>

        <FormControl className={classes.textField}>
                <FormLabel className={classes.textPadding}>
                    Provide links to any related content
                </FormLabel>
                <TextField
                    id='outlined-multiline-static'
                    name='additionalLink'
                    label='Enter urls'
                    multiline
                    rows="4"
                    defaultValue={details['additionalLink']}
                    variant='outlined'
                    onChange={handleChange}
                />

        </FormControl>
      </React.Fragment>
    );
  }