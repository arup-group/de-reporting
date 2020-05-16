import * as React from "react"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { DatePicker } from './DatePicker'
import { ActivityPicker } from './ActivityPicker'
import { makeStyles, Theme, StyleRules, InputLabel, FormControlLabel, Checkbox, Tooltip } from "@material-ui/core"


const useStyles = makeStyles((theme: Theme): StyleRules => ({
  techpillar: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(1)
  },
  milestone: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(0),
  }
}))


interface ActivityProps {
  activityType: string
  activityDate: Date
  techpillarFeature: boolean
  milestone: boolean
}

interface checkboxType {
  techpillarFeature: boolean
  milestone: boolean
}

interface ActivityTypeProps {
  setActivityTypeDate: (a: object) => void;
  details: ActivityProps
  checkbox: checkboxType
}

export const ActivityTypeForm: React.FC<ActivityTypeProps> = (Props: ActivityTypeProps) => {

  const classes = useStyles()

  const [details, setDetails] = React.useState(Props.details)
  const [checked, setChecked] = React.useState(Props.checkbox)

  const handleChange = (e) => {

    let newDetails = details

    if (e.target.name === 'techpillarFeature') {

      setDetails(prevState => {
        newDetails = {...prevState, techpillarFeature: !details.techpillarFeature}
        return newDetails
      })

    } else if (e.target.name === 'milestone') {

      setDetails(prevState => {
        newDetails = {...prevState, milestone: !details.milestone}
        return newDetails
      })

    } else {

      setDetails(prevState => {
        newDetails = prevState
        if ('target' in e) {
          newDetails['activityType'] = e.target.value
        } else {
          newDetails['activityDate'] = e
        }
        return newDetails
      })

    }

    console.log(newDetails)
    
    Props.setActivityTypeDate(newDetails)
  }

  return (
    
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Activity type
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <ActivityPicker 
            activity={details['activityType'] === 'multiple'? '':details['activityType']}
            setOutterActivity={handleChange}
          />
        </Grid>
        
        <Grid item xs={5}>
          <DatePicker 
            date={details['activityDate']} 
            setOutterDate={handleChange}
          />
        </Grid>
      </Grid>
      <Tooltip title="Should this activity be nominated for sharing in the Technical Pillar Monthly Newsletter?">
      <FormControlLabel
        className={classes.techpillar}
        control={
          <Checkbox
            checked={details.techpillarFeature}
            onChange={handleChange}
            name='techpillarFeature'
            color='primary'
          />
        }
        label='Newsletter feature'
      />
      </Tooltip>
      <br/>
      <Tooltip title="Does this activity achieve a significant Digital Engineering Milestone?">
      <FormControlLabel
        className={classes.milestone}
        control={
          <Checkbox
            checked={details.milestone}
            onChange={handleChange}
            name='milestone'
            color='primary'
          />
        }
        label='Milestone'
      />
      </Tooltip>
    </React.Fragment>
  )
}