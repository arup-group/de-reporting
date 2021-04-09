import * as React from "react"
import { makeStyles, StyleRules, Theme, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme): StyleRules => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    }
  }))

interface ActivityPickerProps {
    activity: string;
    setOutterActivity: (event) => void;
}

export const ActivityPicker: React.FC<ActivityPickerProps> = ({activity, setOutterActivity}) => {

    const classes = useStyles()
    const [state, setState] = React.useState(activity)

    const handleChange = (e) => {
        setState(e.target.value)
        setOutterActivity(e)
    }

   

    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
            <InputLabel id="activityTypeLabel">
              Select an activity type
            </InputLabel>
            <Select
              labelId="activityTypeSelector"
              id="activityTypeSelector"
              name='activityType'
              value={state}
              onChange={handleChange}
            >
              <MenuItem value={'Bid Go No Go Meeting'}>Bid go no go meeting</MenuItem>
              <MenuItem value={'Project Inception Meeting/Reviewed'}>Project inception meeting/review</MenuItem>
              <MenuItem value={'Client Engagement'}>Client engagement</MenuItem>
              <MenuItem value={'Project Support'}>Project support</MenuItem>
              <MenuItem value={'Presentations and Talks'}>Presentations and talks</MenuItem>
              <MenuItem value={'Training Activity'}>Training activity</MenuItem>
              <MenuItem value={'Recruitment'}>Recruitment</MenuItem>
              <MenuItem value={'DE Team Meetings'}>DE team meetings</MenuItem>
              <MenuItem value={'Bid Support'}>Bid Support</MenuItem>
              <MenuItem value={'Continuous Improvement'}>Continuous improvement</MenuItem>
              <MenuItem value={'Awards'}>Awards</MenuItem>
              <MenuItem value={'Other'}>Other</MenuItem>
            </Select>
          </FormControl>
        </React.Fragment> 
    )
}
