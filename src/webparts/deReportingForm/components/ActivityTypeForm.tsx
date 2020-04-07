import * as React from "react"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { DatePicker } from './DatePicker'
import { ActivityPicker } from './ActivityPicker'
import { makeStyles, Theme, StyleRules } from "@material-ui/core"

interface ActivityProps {
  activityType: string;
  activityDate: Date;
}

interface ActivityTypeProps {
  setActivityTypeDate: (a: object) => void;
  details: ActivityProps
}

export const ActivityTypeForm: React.FC<ActivityTypeProps> = (Props: ActivityTypeProps) => {

  const [details, setDetails] = React.useState(Props.details)

  const handleChange = (e) => {

    setDetails(prevState => {
      let newState = prevState
      if ('target' in e) {
        newState['activityType'] = e.target.value
      } else {
        newState['activityDate'] = e
      }
      return newState
    })
    
    Props.setActivityTypeDate(details)
  }

  return (
    
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Activity type
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <ActivityPicker 
            activity={details['activityType']}
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
      <br/>
    </React.Fragment>
  )
}