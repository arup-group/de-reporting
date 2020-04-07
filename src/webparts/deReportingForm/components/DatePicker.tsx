import * as React from "react"
import { makeStyles, StyleRules, Theme } from "@material-ui/core"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const useStyles = makeStyles((theme: Theme): StyleRules => ({
    datePicker: {
        marginTop: theme.spacing(1),
      }
}))

interface DatePickerProps {
    date: Date;
    setOutterDate: (event) => void;
}


export const DatePicker: React.FC<DatePickerProps> = ({date, setOutterDate}) => {

    const classes = useStyles()
    const [state, setState] = React.useState(date)

    const handleChange = (e) => {
        setState(e)
        setOutterDate(e)
    }

    return (
        <React.Fragment>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            disableToolbar
            className={classes.datePicker}
            margin="normal"
            id="activityDate"
            label="Activity date"
            format="MM/dd/yyyy"
            value={state}
            onChange={handleChange}
            KeyboardButtonProps={{
            'aria-label': 'change date',
            }}
            />
            </MuiPickersUtilsProvider>
        </React.Fragment>
        
    )
}

