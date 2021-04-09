import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormControl, 
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
    locationDropdown: {
        margin: theme.spacing(1),
        width: '100%'
    },
    hours: {
        margin: theme.spacing(1),
        width: '50%'
    }
    }))
    
interface OtherProps {
    setDetails: (d: object) => void;
    activity: string;
    subState: object;
    notBatch: boolean
  }


export const Other: React.FC<OtherProps> = (Props: OtherProps) => {

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
            <Grid item xs={5}>
                    <FormControl className={classes.formControl}>
                        <TextField
                        required
                        id="otherType"
                        name="otherType"
                        label="Specify activity type"
                        fullWidth
                        autoComplete="othertype"
                        value={details['otherType']}
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
        </React.Fragment>
    )
}