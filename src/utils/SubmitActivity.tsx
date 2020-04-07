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


export default async function submitActivity(activityType, data) {
    
    let model

    switch (activityType) {
        case 'Client Engagement':
            model = new ClientEngagement(data)
            break
        case 'Project Support':
            model = new ProjectSupport(data)
            break
        case 'Presentations and Talks':
            model = new PresentationsTalks(data)
            break
        case 'Training Activity':
            model = new Training(data)
            break
        case 'Recruitment':
            model = new Recruitment(data)
            break
        case 'DE Team Meetings':
            model = new DeTeamMeeting(data)
            break
        case 'Bid Support':
            model = new BidSupport(data)
            break
        case 'Continuous Improvement':
            model = new ContinuousImprovement(data)
            break
        case 'Other':
            model = new Other(data)
            break
        case 'Bid Go No Go Meeting':
            model = new Gonogo(data)
            break
        case 'Project Inception Meeting/Reviewed':
            model = new Inception(data)
            break
        case 'Awards':
            model = new Awards(data)
            break
        default:
            model = null
    }

    if (!model) {
        throw 'There was an error in the submission: model not found!'
    }

    try {
        await model.save()
    } catch (e) {
       throw e
    }
    
    
}