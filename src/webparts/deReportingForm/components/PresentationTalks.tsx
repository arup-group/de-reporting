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
    presentationType: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        width: '100%',
        alignContent: 'right'
    },
    locationDropdown: {
        marginTop: theme.spacing(0),
        width: '100%'
    },
    otherType: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        width: '100%',
        alignContent: 'right'
    },
    textPadding: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
    }));
    
interface PresentationTalksProps {
    setDetails: (d: object) => void;
    activity: string;
    subState: object;
  }


export const PresentationTalks: React.FC<PresentationTalksProps> = (Props: PresentationTalksProps) => {

    const classes = useStyles()
    const [details, setDetails] = React.useState(Props.subState)


    const handleChange = (e) => {
        setDetails((prevState => {
            let newState = prevState
            newState[e.target.name] = e.target.value

            if (newState['presentationType'] != 'Other') {
                newState['otherType'] = null
            } else {
                newState['additionalLink'] = null
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
        <Grid container spacing={0}>
            <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.textPadding}>Presentation mode*</FormLabel>
                    <RadioGroup 
                        aria-label='presentationMode'
                        name='presentationMode'
                        value={details['presentationMode']} 
                        onChange={handleChange}
                    >
                    <FormControlLabel value={'Presenting'} control={<Radio color='primary'/>} label='Presenting'/>
                    <FormControlLabel value={'Attending'} control={<Radio color='primary'/>} label='Attending'/>
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl className={classes.locationDropdown}>
                    <InputLabel id='locationLabel'>
                    Location*
                    </InputLabel>
                    <Select
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
        <Grid container spacing={10}>
            <Grid item xs={5}>
                <FormControl className={classes.presentationType}>
                    <InputLabel id='presentationTypeLabel'>
                    Presentation type*
                    </InputLabel>
                    <Select
                        labelId='presentationTypeSelector'
                        id='presentationTypeSelector'
                        name='presentationType'
                        value={details['presentationType']}
                        onChange={handleChange}
                    >
                    <MenuItem value={'TOG Talk'}>TOG talk</MenuItem>
                    <MenuItem value={'Conferences'}>Conferences</MenuItem>
                    <MenuItem value={'Client'}>Client</MenuItem>
                    <MenuItem value={'Organisation or Body'}>Organization or body</MenuItem>
                    <MenuItem value={'University or Education'}>University or education</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                    </Select>
                </FormControl>

            </Grid>
                {details['presentationType'] === 'Other' && (
                    <Grid item xs={5}>
                    <FormControl className={classes.otherType}>
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
                )}
        </Grid>

        {(details['presentationType'] != 'Other' && Object.keys(details).length > 0) && (
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
        
        </React.Fragment>
    )
}