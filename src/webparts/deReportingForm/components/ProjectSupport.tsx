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
    taskTypeDropdown: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(-2),
        width: '100%'
    },
    locationDropdown: {
        margin: theme.spacing(1),
        width: '100%',
        alignContent: 'right'
    },
    textPadding: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
    }));
    
interface ProjectSupportProps {
    setDetails: (d: object) => void;
    activity: string;
    subState: object;
  }


export const ProjectSupportDetails: React.FC<ProjectSupportProps> = (Props: ProjectSupportProps) => {

    const classes = useStyles()
    const [details, setDetails] = React.useState(Props.subState)


    const handleChange = (e) => {
        
        setDetails((prevState => {
            let newState = prevState
            newState[e.target.name] = e.target.value
            
            if ((e.target.name === 'TaskType' && e.target.value != 'Review') &&
                (e.target.name === 'TaskType' && e.target.value != 'Innovation')) {
                newState['ReviewInnovationDescription'] = null
            }

            if (newState['TaskType'] != 'Other') {
                newState['otherType'] = null
            }

            if (newState['TaskType'] === 'Other') {
                newState['additionalLink'] = null
            }

            console.log(newState)
            return newState
        }))

        Props.setDetails(details)
    }

    return (
        <React.Fragment>
        <Typography variant='h6' gutterBottom>
        {Props.activity.charAt(0).toUpperCase() + Props.activity.slice(1).toLowerCase()}
        </Typography>
        <Grid container spacing={10}>
            <Grid item xs={5}>
                <FormControl className={classes.formControl}>
                    <TextField
                    required
                    id="ProjectNumber"
                    name="ProjectNumber"
                    label="Project Number"
                    fullWidth
                    autoComplete="projnumber"
                    value={details['ProjectNumber']}
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
            <FormControl className={classes.taskTypeDropdown}>
                <InputLabel id='taskTypeLabel'>
                Task type*
                </InputLabel>
                <Select
                    labelId='taskTypeSelector'
                    id='taskTypeSelector'
                    name='TaskType'
                    value={details['TaskType']}
                    onChange={handleChange}
                >
                <MenuItem value={'Authoring DE Specifications/ Execution Plan'}>Authoring DE specifications/execution plan</MenuItem>
                <MenuItem value={'Resource Planning'}>Resource planning</MenuItem>
                <MenuItem value={'Training (Project specific training)'}>Training (project specific)</MenuItem>
                <MenuItem value={'Coordination review/ meeting'}>Coordination review/meeting</MenuItem>
                <MenuItem value={'Reporting (team, performance, quality)'}>Report (team, performance, quality)</MenuItem>
                <MenuItem value={'Review'}>Review</MenuItem>
                <MenuItem value={'Innovation'}>Innovation</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            {details['TaskType'] === 'Other' && (
                <Grid item xs={5}>
                    <FormControl className={classes.taskTypeDropdown}>
                        <TextField
                        required
                        id="otherType"
                        name="otherType"
                        label="Specify task type"
                        fullWidth
                        autoComplete="othertype"
                        value={details['otherType']}
                        onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
            )}
        </Grid>

        <FormControl className={classes.textField}>
                <FormLabel className={classes.textPadding}>Project description</FormLabel>
                <TextField
                    required
                    id='ProjectDescription'
                    name='ProjectDescription'
                    label='Enter project description'
                    multiline
                    rows="4"
                    defaultValue={details['ProjectDescription']}
                    variant='outlined'
                    onChange={handleChange}
                />
        </FormControl>

        {(details['TaskType'] === 'Review' || details['TaskType'] === 'Innovation') && (
            <FormControl className={classes.textField}>
                <FormLabel className={classes.textPadding}>Describe the {details['TaskType'].toLowerCase()} {details['TaskType'] === 'Innovation' ? 'task' : ''}</FormLabel>
                <TextField
                    required
                    id='ReviewInnovationDescription'
                    name='ReviewInnovationDescription'
                    label='Enter task description'
                    multiline
                    rows="4"
                    defaultValue={details['ReviewInnovationDescription']}
                    variant='outlined'
                    onChange={handleChange}
                />
            </FormControl>
        )}
        
        {details['TaskType'] != 'Other' && (
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