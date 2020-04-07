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
    Radio } from '@material-ui/core';

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
    clientDetails: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(1),
        width: '100%'
    },
    locationDropdown: {
        width: '100%',
        alignContent: 'right'
    },
    textPadding: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
    }));
    
interface ClientEngagementProps {
    setDetails: (d: object) => void;
    activity: string;
    subState: object;
  }


export const ClientEngagementDetails: React.FC<ClientEngagementProps> = (Props: ClientEngagementProps) => {

    const classes = useStyles()
    const [details, setDetails] = React.useState(Props.subState)


    const handleChange = (e) => {
        
        setDetails((prevState => {
            let newState = prevState
            newState[e.target.name] = e.target.value

            if (e.target.name === 'followup' && e.target.value === 'No') {
                newState['clientName'] = null
                newState['contactDetails'] = null
                newState['followupInformation'] = null
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
                    <FormLabel className={classes.textPadding}>Was there any follow-up?*</FormLabel>
                        <RadioGroup 
                            aria-label='followup'
                            name='followup'
                            value={details['followup']} 
                            onChange={handleChange}
                        >
                        <FormControlLabel value={'Yes'} control={<Radio color='primary'/>} label='Yes'/>
                        <FormControlLabel value={'No'} control={<Radio color='primary'/>} label='No'/>
                        <FormControlLabel value='Maybe' control={<Radio color='primary'/>} label='Maybe'/>
                        </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl className={classes.locationDropdown}>
                    <InputLabel id="locationLabel">
                    Location*
                    </InputLabel>
                    <Select
                        labelId="locationSelector"
                        id="locationSelector"
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

        {(details['followup'] === 'Yes' || details['followup'] === 'Maybe') && (
        <React.Fragment>
        <Grid container spacing={10}>
            <Grid item xs={5}>
                <FormControl className={classes.clientDetails}>
                    <TextField
                    required
                    id="ClientName"
                    name="clientName"
                    label="Client Name"
                    fullWidth
                    autoComplete="clientname"
                    value={details['clientName']}
                    onChange={handleChange}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={5}>
                <FormControl className={classes.clientDetails}>
                    <TextField
                    required
                    id="ContactDetails"
                    name="contactDetails"
                    label="contact Details"
                    fullWidth
                    autoComplete="contactdetails"
                    value={details['contactDetails']}
                    onChange={handleChange}
                    />
                </FormControl>
            </Grid>  
        </Grid>
        
        <FormControl className={classes.textField}>
                <FormLabel className={classes.textPadding}>
                    Follow-up information
                </FormLabel>
                <TextField
                    required
                    id='followupInformation'
                    name='followupInformation'
                    label='Enter additional follow-up information'
                    multiline
                    rows="4"
                    defaultValue={details['followupInformation']}
                    variant='outlined'
                    onChange={handleChange}
                />
        </FormControl>
        </React.Fragment>
        )}

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