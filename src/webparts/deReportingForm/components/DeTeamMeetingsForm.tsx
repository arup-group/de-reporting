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
    TextField} from '@material-ui/core';

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
        margin: theme.spacing(1),
        width: '100%'
    },
    textPadding: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    hours: {
        margin: theme.spacing(1),
        width: '50%'
    }
    }));
    
interface DeTeamMeetingsProps {
    setDetails: (d: object) => void;
    activity: string;
    subState: object;
    notBatch: boolean
  }


export const DeTeamMeetings: React.FC<DeTeamMeetingsProps> = (Props: DeTeamMeetingsProps) => {

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
        DE team meetings
        </Typography>
        <Grid container spacing={5}>
            <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                    <TextField
                    required
                    id="minutesLink"
                    name="minutesLink"
                    label="Link to minutes"
                    fullWidth
                    autoComplete="minutesLink"
                    value={details['minutesLink']}
                    onChange={handleChange}
                    />
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
                Describe the meeting
            </FormLabel>
            <TextField
                required
                id='meetingDescription'
                name='meetingDescription'
                label='Enter description'
                multiline
                rows="4"
                defaultValue={details['meetingDescription']}
                variant='outlined'
                onChange={handleChange}
            />
        </FormControl>
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