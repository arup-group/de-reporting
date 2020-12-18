import * as React from 'react';
import { 
    Typography, 
    makeStyles,
    ListItem,
    ListItemText} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    listText: {
        fontSize:'0.9em'
    }
    }))
      
interface ReviewProps {
    details: object;
  }

const prettyAttributes = {
    techpillarFeature: 'Featured in Newsletter',
    milestone: 'Milestone',
    activityType: 'Activity',
    location: 'Location',
    inputDescription: 'Describe the input',
    additionalLink: 'Additional content',
    followup: 'Was there any follow-up?',
    clientName: 'Client name',
    contactDetails: 'Contact details',
    followupInformation: 'Additional follow-up information',
    continuousImprovementType: 'Type',
    otherType: 'Specify type',
    minutesLink: 'Link to minutes',
    meetingDescription: 'Describe the meeting',
    DEActivitiesImplemented: 'Will DE activities be implemented?',
    DEActivityDescription: 'Describe the DE activities implemented',
    presentationMode: 'Presentation mode',
    presentationType: 'Presentation type',
    projectNumber: 'Project number',
    taskType: 'Task type',
    projectDescription: 'Project description',
    reviewInnovationDescription: 'Task description',
    recruitmentDescription: 'Describe the recruitment activity',
    trainingMode: 'Training mode',
    hours: 'Hours'
}

export const Review: React.FC<ReviewProps> = (Props: ReviewProps) => {

    const classes = useStyles()
    const [state, setState] = React.useState(Props.details)
    
    const formatDetail = (attribute, text) => {
        if (attribute === 'techpillarFeature' || attribute === 'milestone') {
            return text ? 'Yes' : 'No'
        }
        return text
    }
    
    return (
        <React.Fragment>
        <Typography variant='h6' gutterBottom>
        Review your submission
        </Typography>
        <br/>
        <hr/>
            {
                Object.keys(state).map((i) => {
                    
                    let details = Object.keys(state[i].details).map((attribute, j) => (
                        (state[i].details[attribute] && (
                            <ListItem className={classes.listItem} key={i.toString() + j.toString()}>
                            <ListItemText 
                                key={'text' + i.toString() + j.toString()}
                                classes={{primary:classes.listText}}
                                primary={prettyAttributes[attribute]} 
                                secondary={state[i].details[attribute]}
                                secondaryTypographyProps={{style:{wordWrap:'normal'}}}
                            />
                        </ListItem>
                        ))))

                    return (
                        <React.Fragment key={'fragment' + i.toString()}> 
                        <Typography variant='subtitle1' gutterBottom key={'title' + i.toString()}>
                        {state[i]['projectName'] ? state[i]['projectName'] + ': ' + state[i].activityType : state[i].activityType}
                        </Typography >
                        {details}
                        {'techpillarFeature' in state[i] &&
                        (<ListItem className={classes.listItem} key={'featured' + i.toString()}>
                            <ListItemText 
                                key={'featuredText' + i.toString()}
                                classes={{primary:classes.listText}}
                                primary={prettyAttributes['techpillarFeature']} 
                                secondary={formatDetail('techpillarFeature', state[i]['techpillarFeature'])}
                                secondaryTypographyProps={{style:{wordWrap:'normal'}}}
                            />
                        </ListItem>)
                        }
                        {'milestone' in state[i] &&
                        (<ListItem className={classes.listItem} key={'milestone' + i.toString()}>
                            <ListItemText 
                                key={'milestoneText' + i.toString()}
                                classes={{primary:classes.listText}}
                                primary={prettyAttributes['milestone']} 
                                secondary={formatDetail('milestone', state[i]['milestone'])}
                                secondaryTypographyProps={{style:{wordWrap:'normal'}}}
                            />
                        </ListItem>)
                        }
                        {'hours' in state[i] &&
                        (<ListItem className={classes.listItem} key={'hours' + i.toString()}>
                            <ListItemText 
                                key={'hoursText' + i.toString()}
                                classes={{primary:classes.listText}}
                                primary={prettyAttributes['hours']} 
                                secondary={state[i]['hours']}
                                secondaryTypographyProps={{style:{wordWrap:'normal'}}}
                            />
                        </ListItem>)
                        }
                        <hr/>
                        </React.Fragment>
                        )
                    })
            }
        </React.Fragment>
    )
}