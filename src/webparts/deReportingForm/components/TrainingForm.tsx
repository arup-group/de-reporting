import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormControl, 
    FormLabel, 
    InputLabel, 
    Select, 
    Typography, 
    MenuItem, 
    makeStyles,
    Theme,
    StyleRules,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme): StyleRules => ({
    formControl: {
        margin: theme.spacing(1),
        width: '100%'
    },
    textField: {
        margin: theme.spacing(1),
        width: '100%',
        marginTop: theme.spacing(2)
    },
    locationDropdown: {
        marginLeft: theme.spacing(-3),
        width: '100%'
    },
    textPadding: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    hours: {
        marginTop: theme.spacing(-0.5),
        width: '50%'
    }
    }))
    
interface TrainingProps {
    setDetails: (d: object) => void
    activity: string
    subState: object
    notBatch: boolean
  }


export const Training: React.FC<TrainingProps> = (Props: TrainingProps) => {

    const classes = useStyles()
    const [details, setDetails] = React.useState(Props.subState)


    const handleChange = (e) => {
        setDetails((prevState => {
            let newState = prevState
            newState[e.target.name] = e.target.value
            return newState
        }))
        
        Props.setDetails(details)
    }

    return (
        <React.Fragment>
        <Typography variant='h6' gutterBottom>
        {Props.activity.charAt(0).toUpperCase() + Props.activity.slice(1).toLowerCase()}
        </Typography>
        <Grid container spacing={0}>
            <Grid item xs={8}>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.textPadding}>Training mode*</FormLabel>
                    <RadioGroup 
                        aria-label='trainingMode'
                        name='trainingMode'
                        value={details['trainingMode']} 
                        onChange={handleChange}
                    >
                    <FormControlLabel value={'Delivering training'} control={<Radio color='primary'/>} label='Delivering training'/>
                    <FormControlLabel value={'Receiving training'} control={<Radio color='primary'/>} label='Receiving training'/>
                    <FormControlLabel value={'Preparing training material/ strategy'} control={<Radio color='primary'/>} label='Preparing training material/ strategy'/>
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
        
        <FormControl className={classes.textField}>
            <FormLabel className={classes.textPadding}>
                Provide links to any related content
            </FormLabel>
            <TextField
                id='additionalLink'
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
    )
}