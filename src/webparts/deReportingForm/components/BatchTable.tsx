// todo:
// finish activity table
// load and cache ads data

import * as React from "react";
import DataTable from "react-data-table-component";
import {
  MuiThemeProvider,
  createMuiTheme,
  Menu,
  Box,
  Typography,
  makeStyles,
  Theme,
  StyleRules,
  IconButton,
  Tooltip,
  MenuItem,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  Link,
} from "@material-ui/core";
import { ActivityTable } from "./ActivityTable";
import { format, endOfWeek } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { DetailsForm } from "./DetailsForm";
import { ADS } from "../../../Models/ADS";
import { useWebPartContext } from "../../../hooks/useWebPartContext";

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 20,
  },
});

const useStyles = makeStyles(
  (theme: Theme): StyleRules => ({
    datepPicker: {
      htmlFontSize: 22,
    },
    dialog: {
      padding: theme.spacing(2),
    },
    importButton: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: theme.spacing(2),
    },
  })
);

interface batchTableProps {
  setDetails: (d: object) => void;
  subState: object;
  setValidationError: (message: string) => void;
  batchData: Array<any>;
  setBatchDataMain: (flattened: Array<object>, raw: Array<object>) => void;
  batchDetails: object;
  tableData: any;
  setTableDataMain: (tabledata: any) => void;
}

export const BatchTable: React.FC<batchTableProps> = (
  Props: batchTableProps
) => {
  const [openDialog, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    columns: [
      {
        name: "Project number",
        selector: "projectNumber",
        center: true,
      },
      {
        name: "Project name",
        selector: "projectName",
        center: true,
      },
      {
        name: "Weekending",
        selector: "weekending",
        center: true,
      },
      {
        name: "Narrative",
        selector: "narrative",
        center: true,
      },
      {
        name: "Hours",
        selector: "hours",
        center: true,
      },
    ],
    tableData: Props.tableData,
    activityData: Props.batchData,
    projectActivity: Props.batchDetails,
    hasError: false,
    errorMessage: "",
    timesheetOpen: false,
    timesheetDate: new Date(),
    dialogContent: { projectId: 0, id: 0, activityType: "", substate: {} },
  });

  const classes = useStyles();
  const [ads, setADS] = React.useState(null);
  const user = useWebPartContext((context) => context.pageContext.user);

  React.useEffect(() => {
    const ads = new ADS(user.loginName);
    setADS(ads);
  }, []);

  const addDetails = (projectId, activityType) => {
    const project = state.tableData[projectId];
    const narrative = project.narrative;

    switch (activityType) {
      case "Bid Go No Go Meeting" ||
        "Awards" ||
        "Project Inception Meeting/Reviewed":
        return { DEActivityDescription: narrative };
      case "Project Support":
        return {
          projectDescription: narrative,
          projectNumber: project.projectNumber,
        };
      case "Recruitment":
        return { recruitmentDescription: narrative };
      case "DE Team Meetings":
        return { meetingDescription: narrative };
      case "Bid Support":
        return { inputDescription: narrative };
      case "Other" || "Continuous Improvement" || "Presentations and Talks":
        return { otherType: narrative };
      default:
        return {};
    }
  };

  const handleDialog = (projectId, rowId) => {
    const row = state.activityData[projectId][rowId];
    const activityType = row.activityType;
    let substate = row.details;

    if (!Object.keys(substate).length) {
      substate = addDetails(projectId, activityType);
    }

    let activityData = state.activityData;
    activityData[projectId][rowId].details = substate;

    setState((prevState) => ({
      ...prevState,
      activityData,
      dialogContent: { projectId, id: rowId, activityType, substate },
    }));
    setOpen(!openDialog);
    let batchDataMain = [];
    state.activityData.map((project, i) => {
      const projectName = state.tableData[i].projectName;
      project.map((activity) => {
        batchDataMain.push({ ...activity, projectName });
      });
    });
    Props.setBatchDataMain(batchDataMain, state.activityData);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleTimesheetClose = () => {
    setState((prevState) => ({ ...prevState, timesheetOpen: false }));
  };

  const handleTimesheetClick = async (e) => {
    if (!ads) {
      const ads = await new ADS(user.loginName);
      setADS(ads);
    }
    setState((prevState) => ({ ...prevState, timesheetOpen: true }));
  };

  const importTimesheet = async (e) => {
    const weekEnding = endOfWeek(state.timesheetDate, { weekStartsOn: 1 });
    let timesheetData = await ads.getTimesheets(
      format(weekEnding, "yyyy-MM-dd")
    );
    console.log(timesheetData);
    timesheetData.forEach((entry) => {
      entry.weekending = formatDate(entry.weekending);
    });
    const activityData = timesheetData.map((project) => []);
    setState({ ...state, tableData: timesheetData, activityData });
    Props.setTableDataMain(timesheetData);
    handleTimesheetClose();
  };

  const formatDate = (date) => {
    let [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  };

  const importADS = (
    <React.Fragment>
      <Tooltip title="Import from timesheets">
        <IconButton
          color="primary"
          aria-label="import-from-ads"
          onClick={handleTimesheetClick}
        >
          <PostAddIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={handleTimesheetClose}
        aria-labelledby="timesheet-dialog"
        open={state.timesheetOpen}
      >
        <DialogTitle id="timesheet-dialog-title">
          Select weekending date
        </DialogTitle>
        <DialogContent>
          <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant="inline"
                className={classes.datePicker}
                margin="dense"
                id="timesheetWeekending"
                format="MM/dd/yyyy"
                value={state.timesheetDate}
                onChange={(e) =>
                  setState((prevState) => ({ ...prevState, timesheetDate: e }))
                }
              />
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={importTimesheet}>
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );

  const updateActivities = (rows, projectId) => {
    let batchDataMain = [];
    let activityData = [...state.activityData];
    const location = ads.staffLocation;
    activityData[projectId] = [...rows];
    setState((prevState) => ({ ...prevState, activityData }));
    activityData.forEach((project, i) => {
      if (project.length === 0) return;
      const projectName = state.tableData[i].projectName;
      project.forEach((activity) => {
        batchDataMain.push({ ...activity, projectName, location });
      });
    });
    Props.setBatchDataMain(batchDataMain, activityData);
  };

  const setDetails = (d, projectId, rowId) => {
    let batchDataMain = [];
    let activityData;
    setState((prevState) => {
      activityData = prevState.activityData;
      let dialogContent = prevState.dialogContent;
      activityData[projectId][rowId].details = {
        ...d,
        projectHours: prevState.tableData[projectId].hours,
      };
      activityData.map((project, i) => {
        const projectName = state.tableData[i].projectName;
        project.map((activity) => {
          batchDataMain.push({ ...activity, projectName });
        });
      });

      dialogContent.activityType = activityData[projectId][rowId].activityType;
      dialogContent.substate = d;
      return { ...prevState, dialogContent, activityData };
    });
    Props.setBatchDataMain(batchDataMain, activityData);
  };

  const Activities: React.FC<any> = (Prop: React.ComponentType<any>) => {
    const projectId = Prop["data"]
      ? state.tableData.indexOf(Prop["data"])
      : null;

    return (
      <div style={{ margin: "40px" }}>
        <ActivityTable
          propRows={
            state.activityData[projectId] ? state.activityData[projectId] : []
          }
          updateRows={(rows) => updateActivities(rows, projectId)}
          setValidationError={Props.setValidationError}
          handleDialog={handleDialog}
          projectId={projectId}
          projectHours={state.tableData[projectId].hours}
          projectDate={state.tableData[projectId].weekending}
          injectDetails={(d, rowId) => setDetails(d, projectId, rowId)}
        />
      </div>
    );
  };

  const getDetails = (projectId, rowId) => {
    return (
      <React.Fragment>
        <Typography variant="h4">
          {state.tableData[projectId].projectName}
        </Typography>
        <br />
        <DetailsForm
          setDetails={(d) => setDetails(d, projectId, rowId)}
          activityType={state.dialogContent.activityType}
          subState={state.dialogContent.substate}
          setValidationError={(a) => null}
          batchData={[]}
          setBatchDataMain={(a) => null}
          batchDetails={[]}
          notBatch={false}
          tableData={state.tableData}
          setTableDataMain={Props.setTableDataMain}
        />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <DataTable
        title="Submit multiple activities"
        columns={state.columns}
        data={state.tableData}
        actions={importADS}
        keyField="id"
        expandableRows
        expandableRowsComponent={<Activities />}
        expandOnRowClicked
      />
      <MuiThemeProvider theme={theme}>
        <Dialog
          fullWidth={true}
          style={{ overflow: "hidden" }}
          onClose={() => setOpen(!openDialog)}
          aria-labelledby="details-dialog"
          open={openDialog}
        >
          <DialogContent>
            {state.activityData.length - 1 >= state.dialogContent.projectId &&
            state.activityData[state.dialogContent.projectId].length - 1 >=
              state.dialogContent.id &&
            state.activityData[state.dialogContent.projectId][
              state.dialogContent.id
            ]["activityType"] != ""
              ? getDetails(
                  state.dialogContent.projectId,
                  state.dialogContent.id
                )
              : "Please select an activity type"}
            <DialogActions>
              <Button color="primary" variant="outlined" onClick={closeDialog}>
                Done
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </MuiThemeProvider>
    </React.Fragment>
  );
};
