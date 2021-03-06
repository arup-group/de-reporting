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
        marginTop: theme.spacing(0),
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
    
interface ContinuousImprovementProps {
    setDetails: (d: object) => void;
    activity: string;
    subState: object;
    notBatch: boolean
  }


export const ContinuousImprovement: React.FC<ContinuousImprovementProps> = (Props: ContinuousImprovementProps) => {

    const classes = useStyles()
    const [details, setDetails] = React.useState(Props.subState)


    const handleChange = (e) => {
        setDetails((prevState => {
            let newState = prevState
            newState[e.target.name] = e.target.value

            if (newState['continuousImprovementType'] === 'Other') {
                newState['additionalLink'] = null
            } else {
                newState['otherType'] = null
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
        <Grid container spacing={5}>
            <Grid item xs={5}>
                <FormControl className={classes.locationDropdown}>
                    <InputLabel id='locationLabel'>
                    Activity type* 
                    </InputLabel>
                    <Select
                        required
                        labelId='continuousImprovementTypeSelector'
                        id='continuousImprovementTypeSelector'
                        name='continuousImprovementType'
                        value={details['continuousImprovementType']}
                        onChange={handleChange}
                    >
                    <MenuItem value={'Invest in Arup'}>Invest in Arup</MenuItem>
                    <MenuItem value={'Good Ideas'}>Good ideas</MenuItem>
                    <MenuItem value={'Lessons Learnt'}>Lessons learnt</MenuItem>
                    <MenuItem value={'Contact Skills Network'}>Contact skills network</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                    </Select>
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


        {(details['continuousImprovementType'] != 'Other' && 'continuousImprovementType' in details) && (
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
        )}
        
        {details['continuousImprovementType'] === 'Other' && (
            <Grid container spacing={5}>
                <Grid item xs={5}>
                    <FormControl className={classes.formControl}>
                        <TextField
                        required
                        id="otherType"
                        name="otherType"
                        label="Specify type"
                        fullWidth
                        autoComplete="othertype"
                        value={details['otherType']}
                        onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        )
        }
        
        </React.Fragment>
    )
}