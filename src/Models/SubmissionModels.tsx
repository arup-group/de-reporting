import { Web } from "@pnp/sp/presets/all"
import { format } from 'date-fns'

abstract class AbstractSubmission {
    
    activityType: string;
    activityDate: Date;
    details: object;
    endpoint: string;

    constructor(data) {
        this.details = {} 
        this.activityDate = data.activityDate
        Object.keys(data.details).forEach(attribute => {
            this.details[attribute] = data.details[attribute]
        })
    }
    
    async save ()  {

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
        } catch (e) {
            throw 'There was an error in getting user info: \n' + e
        }

        const submissionData = {
            submissionId: this.details['submissionId'],
            staffName: currentUser.Title,
            staffEmail: currentUser.Email,
            submissionDate: format(new Date(), 'MM/dd/yyyy'),
            activityDate: format(this.activityDate, 'MM/dd/yyyy'),
            activityType: this.activityType,
            location: this.details['location']
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
}

export class Gonogo extends AbstractSubmission {
    constructor(data) {
        super(data)
        this.endpoint = 'BidGoNoGoMeeting'
        this.activityType = 'Bid Go No Go Meeting'
    }
}

export class Awards extends AbstractSubmission {
    constructor(data) {
        super(data)
        this.endpoint = 'Awards'
        this.activityType = 'Awards'
    }
}

export class Inception extends AbstractSubmission {
    constructor(data) {
        super(data)
        this.endpoint = 'InceptionMeetingReviewed'
        this.activityType = 'Project Inception Meeting/Reviewed'
    }
}

export class ClientEngagement extends AbstractSubmission {
    constructor(data) {
        super(data)
        this.endpoint = 'ClientEngagement'
        this.activityType = 'Client Engagement'
    }
}

export class ProjectSupport extends AbstractSubmission {
    constructor(data) {
        super(data)
        this.endpoint = 'ProjectSupport'
        this.activityType = 'Project Support'
    }
}

export class PresentationsTalks extends AbstractSubmission {
    constructor(data) {
        super(data)
        this.endpoint = 'PresentationsTalks'
        this.activityType = 'Presentations and Talks'
    }
}

export class Training extends AbstractSubmission {
    constructor(data) {
        super(data)
        this.endpoint = 'Training'
        this.activityType = 'Training Activity'
    }
}

export class Recruitment extends AbstractSubmission {
    constructor(data) {
        super(data)
        this.endpoint = 'Recruitment'
        this.activityType = 'Recruitment'
    }
}

export class DeTeamMeeting extends AbstractSubmission {
    constructor(data) {
        super(data)
        this.endpoint = 'DeTeamMeeting'
        this.activityType = 'DE Team Meetings'
    }
}

export class BidSupport extends AbstractSubmission {
    constructor(data) {
        super(data)
        this.endpoint = 'BidSupport'
        this.activityType = 'Bid Support'
    }
}

export class ContinuousImprovement extends AbstractSubmission {
    constructor(data) {
        super(data)
        this.endpoint = 'ContinuousImprovement'
        this.activityType = 'Continuous Improvement'
    }
}

export class Other extends AbstractSubmission {
    constructor(data) {
        super(data)
        this.endpoint = 'Other'
        this.activityType = 'Other'
    }
}