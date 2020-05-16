import { Gonogo, 
    Awards, 
    Inception, 
    ClientEngagement, 
    ProjectSupport,
    PresentationsTalks,
    Training,
    Recruitment,
    DeTeamMeeting,
    BidSupport,
    ContinuousImprovement,
    Other } from '../Models/SubmissionModels'


export async function submitBatchActivities(detailsList) {
    
    for (let activity of detailsList) {
        const data = {
            activityDate: activity.activityDate,
            hours: activity.hours,
            milestone: activity.milestone,
            techpillarFeature: activity.techpillarFeature, 
            projectName: activity.projectName,
            details: activity.details
        }
        await submitActivity(activity.activityType, data)

    }
}

export default async function submitActivity(activityType, data) {
    let model

    switch (activityType) {
        case 'Client Engagement':
            model = new ClientEngagement()
            break
        case 'Project Support':
            model = new ProjectSupport()
            break
        case 'Presentations and Talks':
            if (data['presentationType'] != 'Other') {
                data['otherType'] = null
            }
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
            if (data['continuousImprovementType'] != 'Other') {
                data['otherType'] = null
            }
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

    if (!model) {
        throw 'There was an error in the submission: model not found!'
    }

    try {
        await model.save(data)
    } catch (e) {
       throw e
    }    
}

