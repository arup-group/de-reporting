import * as React from 'react';
import { 
    Typography, 
    makeStyles,
    ListItem,
    ListItemText} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0)
    }
    }))
      
    
interface ReviewProps {
    details: object;
  }

const prettyAttributes = {
    activityType: 'Activity',
    location: 'Location',
    inputDescription: 'Describe the input',
    additionalLink: 'Additional content',
    followup: 'Was there any follow-up?',
    ClientName: 'Client name',
    ContactDetails: 'Contact details',
    followupInformation: 'Additional follow-up information',
    continuousImprovementType: 'Type',
    otherType: 'Type',
    minutesLink: 'Link to minutes',
    meetingDescription: 'Describe the meeting',
    DEActivitiesImplemented: 'Will DE activities be implemented?',
    DEActivityDescription: 'Describe the DE activities implemented',
    presentationMode: 'Presentation mode',
    presentationType: 'Presentation type',
    ProjectNumber: 'Project number',
    TaskType: 'Task type',
    ProjectDescription: 'Project description',
    ReviewInnovationDescription: 'Task description',
    recruitmentDescription: 'Describe the recruitment activity',
    trainingMode: 'Training mode'
}

export const Review: React.FC<ReviewProps> = (Props: ReviewProps) => {

    const classes = useStyles()
    const [state, setState] = React.useState(Props.details)

    return (
        <React.Fragment>
        <Typography variant='h6' gutterBottom>
        Review your submission
        </Typography>
            {Object.keys(state).map((attribute) => (
                (state[attribute] && (
                    <ListItem className={classes.listItem}>
                    <ListItemText 
                        primary={prettyAttributes[attribute]} 
                        secondary={state[attribute]}
                        secondaryTypographyProps={{style:{wordWrap:'normal'}}}
                    />
                </ListItem>
                )) 
            ))}
        </React.Fragment>
    )
}