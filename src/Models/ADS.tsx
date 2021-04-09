import DataTable from "react-data-table-component";
import { CONFIG } from "../app.config";

export class ADS {
  endpoint: string;
  subscriptionKey: string;
  token: string;
  requestHeader: any;
  userEmail: string;
  staffId: string;
  staffLocation: string;

  constructor(userEmail) {
    this.endpoint = CONFIG.LAMBDA_ENDPOINT;
    this.token;
    this.requestHeader;
    this.userEmail = userEmail;

    this.getAccessToken().then((res) => {
      this.token = res.access_token;
      this.getStaffId();
    });
  }

  async _rawRequest(body) {
    try {
      const res = await fetch(CONFIG.LAMBDA_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      return JSON.parse(json.body);
    } catch (e) {
      console.log(e);
    }
  }

  async getAccessToken() {
    const body = { method: "AUTH" };
    const res = await this._rawRequest(body);
    return res;
  }

  async getStaffId() {
    const body = {
      method: "GET_USER_ID",
      userEmail: this.userEmail,
      token: this.token,
    };
    const res = await this._rawRequest(body);
    this.staffId = res.value[0].StaffId;
    this.staffLocation = res.value[0].LocationName.replace("Office", "").trim();
  }

  async getTimesheets(weekending) {
    const body = {
      method: "GET_TIMESHEET_DATA",
      staffId: this.staffId,
      weekEnding: weekending,
      token: this.token,
    };
    const res = await this._rawRequest(body);
    if (res.value.length === 0) return [];

    let data = res.value.map((timesheet) => ({
      projectNumber: timesheet.ProjectCode.trim(),
      weekending: timesheet.WeekEndingDate.trim().replace(/'-'/g, "/"),
      narrative: this.cleanNarrative(timesheet.Narrative),
      hours: timesheet.Hours,
    }));
    const projectCodes = [];
    data.forEach((timesheet) => projectCodes.push(timesheet.projectNumber));
    const projectInfoBody = {
      method: "GET_PROJECT_INFO",
      projectCode: JSON.stringify(projectCodes),
      token: this.token,
    };
    const projectInfo = await this._rawRequest(projectInfoBody);
    const projectNames = {};
    projectInfo.value.forEach(
      (project) =>
        (projectNames[project.ProjectCode] = project.JobNameShort.trim())
    );
    return data.map((timesheet, i) => ({
      ...timesheet,
      id: i,
      projectName: projectNames[timesheet.projectNumber]
        ? projectNames[timesheet.projectNumber]
        : "",
    }));
  }

  cleanNarrative(narrative) {
    if (!narrative.includes("Trns From Source"))
      return narrative.slice(0, narrative.length - 13);
    return narrative.slice(31, narrative.length - 13);
  }
}
