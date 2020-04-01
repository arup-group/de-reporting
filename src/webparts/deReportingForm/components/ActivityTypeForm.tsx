import * as React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel, FormControl, makeStyles, StyleRules, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme): StyleRules => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface ActivityTypeProps {
  setActivityType: (activityType: string) => void;
  activityType: string
}

export const ActivityTypeForm: React.FC<ActivityTypeProps> = (Props: ActivityTypeProps) => {

  const classes = useStyles();
  const [selected, setSelected] = React.useState(Props.activityType)

  const handleSelection = (e) => {
    setSelected( e.target.value)
    Props.setActivityType(e.target.value)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Activity type
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <FormControl className={classes.formControl}>
            <InputLabel id="activityTypeLabel">
              Select an activity type
            </InputLabel>
            <Select
              labelId="activityTypeSelector"
              id="activityTypeSelector"
              value={selected}
              onChange={handleSelection}
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
        </Grid>
      </Grid>
    </React.Fragment>
  );
}