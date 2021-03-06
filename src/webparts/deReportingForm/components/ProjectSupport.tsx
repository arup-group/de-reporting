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
    },
    hours: {
        margin: theme.spacing(1),
        width: '50%'
    }
    }))
    
interface ProjectSupportProps {
    setDetails: (d: object) => void;
    activity: string;
    subState: object;
    notBatch: boolean
  }


export const ProjectSupportDetails: React.FC<ProjectSupportProps> = (Props: ProjectSupportProps) => {

    const classes = useStyles()
    const [details, setDetails] = React.useState(Props.subState)


    const handleChange = (e) => {
        
        setDetails((prevState => {
            let newState = prevState
            newState[e.target.name] = e.target.value
            
            if ((e.target.name === 'taskType' && e.target.value != 'Review') &&
                (e.target.name === 'taskType' && e.target.value != 'Innovation')) {
                newState['reviewInnovationDescription'] = null
            }

            if (newState['taskType'] != 'Other') {
                newState['otherType'] = null
            }

            if (newState['taskType'] === 'Other') {
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
        <Grid container spacing={10}>
            <Grid item xs={5}>
                <FormControl className={classes.formControl}>
                    <TextField
                    required
                    id="ProjectNumber"
                    name="projectNumber"
                    label="Project Number"
                    fullWidth
                    autoComplete="projnumber"
                    value={details['projectNumber']}
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
        <Grid container spacing={10}>
            <Grid item xs={5}>
            <FormControl className={classes.taskTypeDropdown}>
                <InputLabel id='taskTypeLabel'>
                Task type*
                </InputLabel>
                <Select
                    labelId='taskTypeSelector'
                    id='taskTypeSelector'
                    name='taskType'
                    value={details['taskType']}
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
            {details['taskType'] === 'Other' && (
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
                    name='projectDescription'
                    label='Enter project description'
                    multiline
                    rows="4"
                    defaultValue={details['projectDescription']}
                    variant='outlined'
                    onChange={handleChange}
                />
        </FormControl>

        {(details['taskType'] === 'Review' || details['taskType'] === 'Innovation') && (
            <FormControl className={classes.textField}>
                <FormLabel className={classes.textPadding}>Describe the {details['taskType'].toLowerCase()} {details['taskType'] === 'Innovation' ? 'task' : ''}</FormLabel>
                <TextField
                    required
                    id='ReviewInnovationDescription'
                    name='reviewInnovationDescription'
                    label='Enter task description'
                    multiline
                    rows="4"
                    defaultValue={details['reviewInnovationDescription']}
                    variant='outlined'
                    onChange={handleChange}
                />
            </FormControl>
        )}
        
        {details['taskType'] != 'Other' && (
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