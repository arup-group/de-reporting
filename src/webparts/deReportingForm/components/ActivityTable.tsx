import * as React from "react"
import {MuiThemeProvider, makeStyles, createMuiTheme, Typography, Tooltip, IconButton, Box, FormControl, InputLabel, Select, MenuItem, TextField, FormControlLabel, Checkbox, Menu} from "@material-ui/core"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import AddBoxIcon from '@material-ui/icons/AddBox'
import InfoIcon from '@material-ui/icons/Info'
import DeleteIcon from '@material-ui/icons/Delete'
import UpdateIcon from '@material-ui/icons/Update'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import {AbstractSubmission, getActivityModel} from '../../../Models/SubmissionModels'

const useStyles = makeStyles(theme => ({
  bigCell: {
    width: 100,
  },
  smallCell: {
      width: 100
    },
  activityPicker: {
    width: 100,
    paddingBottom: theme.spacing(2)
  },
  datePicker: {
    width: 115
  },
  hoursField: {
    width: 35,
    paddingBottom: theme.spacing(2.5)
  },
  checkbox: {
    alignItems:"center",
    justifyContent: "center"
  }
}))

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 20
  },
  overrides: {
    MuiTableCell: {
      head: {
        fontSize: '12px',
        fontWeight: 549,
        paddingLeft: '16px',
        paddingRight: '16px'
      },
    body: {
        fontSize: '12px',
        minHeight: '48px',
        paddingLeft: '16px',
        paddingRight: '16px'
      }
    }
  }
})

interface Props {
  propRows: Array<{
    activityType: string
    activityDate: string
    techpillarFeature: boolean
    milestone: boolean
    hours: string
    details: object
  }>,
  projectId: number,
  projectDate: string,
  projectHours: string,
  setValidationError: (message: string) => void,
  updateRows: (rows: Array<object>) => void,
  handleDialog: (projectId, id) => void,
  injectDetails: (d: object, rowId: number) => void
}

const submissions = new AbstractSubmission()

export const ActivityTable: React.FC<Props> = ({ propRows, projectDate, projectHours, projectId, injectDetails, updateRows, handleDialog }: Props) => {

  const classes = useStyles()

  const [state, setState] = React.useState({
    rows: propRows,
    previousSubmissions: []
  })

  const [key, setKey] = React.useState(Math.random())
  const [anchor, setAnchor] = React.useState(null)
  const [previousSubmissions, setPrevious] = React.useState([])

  const detailsIcon = (id) => (
    <React.Fragment>
    <Tooltip title="Activity details">
    <IconButton color='primary' aria-label='activity-details' onClick={() => handleDialog(projectId, id)}>
    <InfoIcon fontSize='default'/>
    </IconButton>
    </Tooltip>
    </React.Fragment>
  )

  const deleteIcon = (id) => (
    <React.Fragment>
      <Tooltip title="Delete activity">
      <IconButton color='primary' aria-label='delete-activity' onClick={() => deleteRow(id)}>
      <DeleteIcon fontSize='default' />
      </IconButton>
      </Tooltip>
      </React.Fragment>
  )

  const deleteRow = (id) => {
    let rows = state.rows
    rows = rows.filter((row, j) => j != id)
    setState(prevState => ({...prevState, rows}))
    updateRows(rows)
  }

  const addRow = () => {
    let rows = state.rows
  
    rows.push({
      activityType: '',
      activityDate: projectDate,
      techpillarFeature: false,
      milestone: false,
      hours: '',
      details: {}
    })
    
    setState(prevState => ({...prevState, rows}))
    updateRows(rows)
  }

  const handleChange = (e, id) => {

    let rows = state.rows

    if (e.target.name === 'activityHours') {
      rows[id].hours = e.target.value
    }

    if (e.target.name === 'activityType') {
      rows[id].activityType = e.target.value
    }

    if (e.target.name === 'techpillarFeature') {
      rows[id].techpillarFeature = !rows[id].techpillarFeature
      updateRows(rows)
    }

    if (e.target.name === 'milestone') {
      rows[id].milestone = !rows[id].milestone
      updateRows(rows)
    }
    
    setState(prevState => ({...prevState, rows}))
    
  }

  const acitvityPicker = (id) => (
    <React.Fragment key={'activityPicker' + id.toString()}>
        <FormControl key={'activityForm' + id.toString()} className={classes.activityPicker}>
          <InputLabel id="activityTypeLabel">
            Select
          </InputLabel>
          <Select
            labelId="activityTypeSelector"
            id="activityTypeSelector"
            name='activityType'
            value={state.rows[id].activityType}
            onChange={(e) => handleChange(e, id)}
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

  

  const checkbox = (id, col) => (
    
      <FormControlLabel
      className={classes.checkbox}
      control={
        <Checkbox
          key={Math.random()}
          checked={state.rows[id][col]}
          onChange={(e) => handleChange(e, id)}
          name={col}
          color='primary'
        />
      }
      label=''
      />
  )


  const hoursField = (id) => {
  
  
    return (<React.Fragment key={'hoursFragment' + id.toString()}>
      <FormControl>
        <TextField
        key={'hoursField' + id.toString()}
        className={classes.hoursField}
        id={`hours${id}`}
        name="activityHours"
        label="hours"
        fullWidth
        value={state.rows[id].hours}
        onChange={(e) => handleChange(e, id)}
        onBlur={() => updateRows(state.rows)}
        />
    </FormControl>
    </React.Fragment>
  
  )
  }

  const divideTime = () => {
    let newState
    setState(prevState => {

      newState = {...prevState, key: Math.random()}
      let rows = newState.rows
      let evenHours = (parseFloat(projectHours) / rows.length).toFixed(1)
      
      rows.forEach((row, i) => rows[i] = {...rows[i], hours: evenHours})

      newState.rows = rows

      return newState
    })
    updateRows(newState.rows)
    setKey(Math.random())
  }

  const importPreviousSubmission = async (e) => {
    setAnchor(e.currentTarget)

    if (!previousSubmissions.length){
      
      const previous = await submissions.getPreviousSubmissions()
      setPrevious(previous)
    }
    
  }

  const addPreviousActivity = async (e) => {

    if (e.target.nodeName === 'LI') {
      let rows = state.rows
      const chosenSubmission = {...previousSubmissions[e.target.value]}
      const submissionId = e.target.id
      const activityModel = getActivityModel(chosenSubmission['activityType'])
      const activityDetails = await activityModel.getActivity(submissionId)

      rows.push({
        activityType: chosenSubmission['activityType'],
        activityDate: projectDate,
        techpillarFeature: chosenSubmission['techpillarFeature'] === 'Yes' ? true : false,
        milestone: chosenSubmission['milestone'] === 'Yes' ? true : false,
        hours: chosenSubmission['hours'] ? chosenSubmission['hours'] : '',
        details: activityDetails
      })

      setState(prevState => ({...prevState, rows}))

      setTimeout(()=> {
        updateRows(rows)
        injectDetails(activityDetails, rows.length - 1)
      }, 500) 
    }
    
    setAnchor(null)
  }
  
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
        <Typography component="div">
        <Box fontWeight={530} fontSize={14}>
        Activities
        </Box>
        </Typography>
        <br/>
        <Paper>          
            <Table>
            <TableHead>
                <TableRow className={classes.bigCell}>
                  <TableCell>Activity type</TableCell>
                  <Tooltip title="Should this activity be nominated for sharing in the Technical Pillar Monthly Newsletter?">
                  <TableCell>Newsletter feature</TableCell>
                  </Tooltip>
                  <Tooltip title="Does this activity achieve a significant Digital Engineering Milestone?">
                  <TableCell>Milestone</TableCell>
                  </Tooltip>
                  <TableCell>Hours</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.rows.map((row, id) => (
                  <TableRow key={id}>
                    <TableCell key={'activity' + id.toString()}>{acitvityPicker(id)}</TableCell>
                    <TableCell key={key+1} align='right'>{checkbox(id, 'techpillarFeature')}</TableCell>
                    <TableCell key={key+2} align='right'>{checkbox(id, 'milestone')}</TableCell>
                    <TableCell key={key}>{hoursField(id)}</TableCell>
                    <TableCell key={'details' + id.toString()}>{detailsIcon(id)}</TableCell>
                    <TableCell key={'delete' + id.toString()}>{deleteIcon(id)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Tooltip title="Add new activity">
              <IconButton color='primary' aria-label='add-activity' onClick={addRow}>
              <AddBoxIcon fontSize='default'/>
            </IconButton>
            </Tooltip>
            <Tooltip title="Import previous submission">
              <IconButton color='primary' aria-label='divide-time' onClick={importPreviousSubmission}>
              <CloudDownloadIcon fontSize='default'/>
            </IconButton>
            </Tooltip>
            <Menu
              id="previous-submissions-menu"
              anchorEl={anchor}
              keepMounted
              open={Boolean(anchor)}
              onClose={addPreviousActivity}
            >
              {previousSubmissions.map((submission, i) => (
                <MenuItem onClick={addPreviousActivity} 
                value={i} 
                id={submission.submissionId} 
                key={submission.submissionId}>
                  {`${submission.activityDate} ${submission.activityType}`}
                </MenuItem>
              ))
              }
            </Menu>
            <Tooltip title="Divide project hours evenly between activities">
              <IconButton color='primary' aria-label='divide-time' onClick={divideTime}>
              <UpdateIcon fontSize='default'/>
            </IconButton>
            </Tooltip>
          </Paper>
          </MuiThemeProvider>
      </React.Fragment>
    )
}