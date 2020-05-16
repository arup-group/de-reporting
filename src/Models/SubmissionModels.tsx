import { Web } from "@pnp/sp/presets/all"
import { format } from 'date-fns'

export class AbstractSubmission {
    
    activityType: string
    activityDate: Date | string
    hours: string
    milestone: boolean
    techpillarFeature: boolean
    projectName: string
    details: object
    endpoint: string
    submissionCols: string[]
    activityCols: string[]

    constructor(){
        this.submissionCols = [
            'submissionId',
            'staffName',
            'staffEmail',
            'submissionDate',
            'activityDate',
            'activityType',
            'location',
            'hours',
            'projectName',
            'milestone',
            'techpillarFeature'
        ]
    }

    async save (data)  {
        this.details = data.details
        this.activityDate = data.activityDate
        this.hours = data.hours 
        this.milestone = data.milestone 
        this.techpillarFeature = data.techpillarFeature 
        this.projectName = data.projectName

        const web = Web('https://arup.sharepoint.com/sites/TnRDigital_39-200/DEReporting')

        try {
            const latestSubmission = await web.lists.getByTitle('Submission').items
                                .orderBy('submissionId', false)
                                .top(1)
                                .get()

            this.details['submissionId'] = latestSubmission[0].submissionId + 1
        } catch (e) {
            throw 'There was an error in setting the submission id: \n' + e
        }
        

        // submit to submissions table
        let currentUser

        try{
            currentUser = await web.currentUser.get()
            console.log(currentUser)
        } catch (e) {
            throw 'There was an error in getting user info: \n' + e
        }

        const submissionData = {
            submissionId: this.details['submissionId'],
            staffName: currentUser.Title,
            staffEmail: currentUser.Email.toLowerCase(),
            submissionDate: format(new Date(), 'MM/dd/yyyy'),
            activityDate: typeof(this.activityDate) === 'string' ? this.activityDate : format(this.activityDate, 'MM/dd/yyyy'),
            activityType: this.activityType,
            location: 'SG',
            hours: this.hours, 
            milestone: this.milestone ? 'Yes' : 'No', 
            techpillarFeature: this.techpillarFeature ? 'Yes' : 'No', 
            projectName: this.projectName
        }

        try{
            await web.lists.getByTitle('Submission').items.add(submissionData)
        } catch (e) {
            throw 'There was an error with the submission! \n' + e
        }
        
        // submit to activity table
        try {
            await web.lists.getByTitle(this.endpoint).items.add(this.details)
        } catch (e) {
            throw 'There was an error in submitting the activity! \n' + e
        }

    }

    async getPreviousSubmissions() {
        
        
        const web = Web('https://arup.sharepoint.com/sites/TnRDigital_39-200/DEReporting')

        
        let currentUser

        try{
            currentUser = await web.currentUser.get()
            
        } catch (e) {
            throw 'There was an error in getting user info: \n' + e
        }

        try {
            const previousSubmissions = await web.lists.getByTitle('Submission').items
                                .filter(`staffEmail eq '${currentUser.Email.toLowerCase()}'`)
                                .orderBy('submissionDate', false)
                                .get()

            const filteredSubmissions = previousSubmissions.map((submission) => {
                const out = {}
                this.submissionCols.forEach(col => out[col] = submission[col])
                return out
            })
            
            return filteredSubmissions
        } catch (e) {
            throw 'There was an error in retrieving submissions: \n' + e
        }
    }

    async getActivity(submissionId) {
        const web = Web('https://arup.sharepoint.com/sites/TnRDigital_39-200/DEReporting')
        
        try {
            const activity = await web.lists.getByTitle(this.endpoint).items
                                .filter(`submissionId eq '${submissionId}'`)
                                .get()
            
            let cleanActivity = {}
            this.activityCols.map(col => cleanActivity[col] = activity[0][col] ? activity[0][col] : '')
            return cleanActivity

        } catch (e) {
            throw `There was an error in retrieving the activity ${submissionId}: \n` + e
        }
    }
}

export class Gonogo extends AbstractSubmission {
    constructor() {
        super()
        this.endpoint = 'BidGoNoGoMeeting'
        this.activityType = 'Bid Go No Go Meeting'
        this.activityCols = [
            'DEActivitiesImplemented',
            'DEActivityDescription',
            'additionalLink'
        ]
    }
}

export class Awards extends AbstractSubmission {
    constructor() {
        super()
        this.endpoint = 'Awards'
        this.activityType = 'Awards'
        this.activityCols = [
            'DEActivitiesImplemented',
            'DEActivityDescription',
            'additionalLink'
        ]
    }
}

export class Inception extends AbstractSubmission {
    constructor() {
        super()
        this.endpoint = 'InceptionMeetingReviewed'
        this.activityType = 'Project Inception Meeting/Reviewed'
        this.activityCols = [
            'DEActivitiesImplemented',
            'DEActivityDescription',
            'additionalLink'
        ]
    }
}

export class ClientEngagement extends AbstractSubmission {
    constructor() {
        super()
        this.endpoint = 'ClientEngagement'
        this.activityType = 'Client Engagement'
        this.activityCols = [
            'followup',
            'clientName',
            'contactDetails',
            'followupInformation',
            'additionalLink'
        ]
    }
}

export class ProjectSupport extends AbstractSubmission {
    constructor() {
        super()
        this.endpoint = 'ProjectSupport'
        this.activityType = 'Project Support'
        this.activityCols = [
            'projectNumber',
            'taskType',
            'otherType',
            'projectDescription',
            'reviewInnovationDescription',
            'additionalLink'
        ]
    }
}

export class PresentationsTalks extends AbstractSubmission {
    constructor() {
        super()
        this.endpoint = 'PresentationsTalks'
        this.activityType = 'Presentations and Talks'
        this.activityCols = [
            'presentationMode',
            'presentationType',
            'otherType',
            'additionalLink'
        ]
    }
}

export class Training extends AbstractSubmission {
    constructor() {
        super()
        this.endpoint = 'Training'
        this.activityType = 'Training Activity'
        this.activityCols = [
            'trainingMode',
            'additionalLink'
        ]
    }
}

export class Recruitment extends AbstractSubmission {
    constructor() {
        super()
        this.endpoint = 'Recruitment'
        this.activityType = 'Recruitment'
        this.activityCols = [
            'recruitmentDescription',
            'additionalLink'
        ]
    }
}

export class DeTeamMeeting extends AbstractSubmission {
    constructor() {
        super()
        this.endpoint = 'DeTeamMeeting'
        this.activityType = 'DE Team Meetings'
        this.activityCols = [
           'minutesLink',
           'meetingDescription',
           'additionalLink' 
        ]
    }
}

export class BidSupport extends AbstractSubmission {
    constructor() {
        super()
        this.endpoint = 'BidSupport'
        this.activityType = 'Bid Support'
        this.activityCols = [
            'inputDescription',
            'additionalLink'
        ]
    }
}

export class ContinuousImprovement extends AbstractSubmission {
    constructor() {
        super()
        this.endpoint = 'ContinuousImprovement'
        this.activityType = 'Continuous Improvement'
        this.activityCols = [
            'continuousImprovementType',
            'otherType',
            'additionalLink'
        ]
    }
}

export class Other extends AbstractSubmission {
    constructor() {
        super()
        this.endpoint = 'Other'
        this.activityType = 'Other'
        this.activityCols = [
            'otherType'
        ]
    }
}

export const getActivityModel = (activityType) => {
    let model

    switch (activityType) {
        case 'Client Engagement':
            model = new ClientEngagement()
            break
        case 'Project Support':
            model = new ProjectSupport()
            break
        case 'Presentations and Talks':
            model = new PresentationsTalks()
            break
        case 'Training Activity':
            model = new Training()
            break
        case 'Recruitment':
            model = new Recruitment()
            break
        case 'DE Team Meetings':
            model = new DeTeamMeeting()
            break
        case 'Bid Support':
            model = new BidSupport()
            break
        case 'Continuous Improvement':
            model = new ContinuousImprovement()
            break
        case 'Other':
            model = new Other()
            break
        case 'Bid Go No Go Meeting':
            model = new Gonogo()
            break
        case 'Project Inception Meeting/Reviewed':
            model = new Inception()
            break
        case 'Awards':
            model = new Awards()
            break
        default:
            model = null
    }

    return model
}