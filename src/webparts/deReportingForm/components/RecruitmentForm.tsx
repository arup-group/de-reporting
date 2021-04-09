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
    TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme): StyleRules => ({
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
    
interface RecruitmentProps {
    setDetails: (d: object) => void;
    activity: string;
    subState: object;
    notBatch: boolean
  }


export const Recruitment: React.FC<RecruitmentProps> = (Props: RecruitmentProps) => {

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
                Describe the recruitment activity
            </FormLabel>
            <TextField
                required
                id='recruitmentDescription'
                name='recruitmentDescription'
                label='Enter description'
                multiline
                rows="4"
                defaultValue={details['recruitmentDescription']}
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