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
    }
    }));
    
interface DeTeamMeetingsProps {
    setDetails: (d: object) => void;
    activity: string;
    subState: object;
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
        {Props.activity.charAt(0).toUpperCase() + Props.activity.slice(1).toLowerCase()}
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
            <Grid item xs={4}>
                <FormControl className={classes.locationDropdown}>
                    <InputLabel id='locationLabel'>
                    Location* 
                    </InputLabel>
                    <Select
                        required
                        labelId='locationSelector'
                        id='locationSelector'
                        name='location'
                        value={details['location']}
                        onChange={handleChange}
                    >
                    <MenuItem value={'NSW'}>NSW</MenuItem>
                    <MenuItem value={'VIC/SA'}>VIC/SA</MenuItem>
                    <MenuItem value={'QLD'}>QLD</MenuItem>
                    <MenuItem value={'WA'}>WA</MenuItem>
                    <MenuItem value={'NZ'}>NZ</MenuItem>
                    <MenuItem value={'SIN'}>SIN</MenuItem>
                    <MenuItem value={'KL'}>KL</MenuItem>
                    <MenuItem value={'PEN'}>PEN</MenuItem>
                    <MenuItem value={'Regional'}>Regional</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
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