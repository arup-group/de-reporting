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
    }
    }));
    
interface ContinuousImprovementProps {
    setDetails: (d: object) => void;
    activity: string;
    subState: object;
  }


export const ContinuousImprovement: React.FC<ContinuousImprovementProps> = (Props: ContinuousImprovementProps) => {

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
                <FormControl className={classes.locationDropdown}>
                    <InputLabel id='locationLabel'>
                    Activity type* 
                    </InputLabel>
                    <Select
                        required
                        labelId='continuousImprovementTypeSelector'
                        id='continuousImprovementTypeSelector'
                        name='continuousImprovementTypeSelector'
                        value={details['continuousImprovementTypeSelector']}
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


        {(details['continuousImprovementTypeSelector'] != 'Other' && 'continuousImprovementTypeSelector' in details) && (
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
        
        {details['continuousImprovementTypeSelector'] === 'Other' && (
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