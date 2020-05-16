import { format } from 'date-fns'

export default function validator(state) {
  
    switch (state.activityType) {

        case '':
          return 'Please select an activity type'
        
        case 'multiple':
          if (state.activeStep === 0) {
            return 'Please select an activity type'
          }

          console.log(state.batchDetails)
          if (!state.batchDetails.length || state.batchDetails.some(activity => Object.keys(activity['details']).length?false:true)) {
            return 'Please provide details for all activities'
          }

          if (state.activeStep === 1) {
            let currentProject 
            let cumulativeHours = 0
            let errors = state.batchDetails.map( activity => { 
              let message
              cumulativeHours += parseFloat(activity.hours)
              console.log(cumulativeHours, activity)
              if (activity.projectName != currentProject) {
                currentProject = activity.projectName
                cumulativeHours = parseFloat(activity.hours)
              }

              
              if (activity.hours === '') {
                message = 'Please indicate the time spent on this activity'
              } else {
                let newActivity = activity
                newActivity.details = {...newActivity.details, hours: activity.hours}
                message = validator({...newActivity, activeStep: 1})
              }
              
              if (cumulativeHours > parseFloat(activity.details.projectHours)) {
                message =  activity.projectName + ': the total time spent on the activities is bigger than the hours spent on the project'
              }

              
              if (message) {
                return {
                  activityType: activity.activityType, 
                  activityDate: activity.activityDate, 
                  projectName: activity.projectName, 
                  message: message
                }
              }
            })
            
            errors = errors.filter(x => x !== undefined)
            

            if (errors.some(x=>x?true:false)) {
              return  errors[0].projectName + ' ' + errors[0].activityType + ': ' + errors[0].message.toLowerCase()
            }
          }

          return ''
    
        case 'Project Support':
    
          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('hours') < 0){
            return 'Please indicate the time spent on this activity'
          }
    
          if (state.activeStep === 1 && !(/^\d{6}(-\d{2})?$/.exec(state.details['projectNumber']))) {
            return 'Please enter a valid project number'
          }
    
          if (state.activeStep === 1 && !state.details['taskType']) {
            return 'Please specify the type of the task that was undertaken'
          }
    
          if (state.activeStep === 1 && !state.details['projectDescription']) {
    
            return 'Please provide a project description'
          }
    
          if (state.activeStep === 1 && 
            (state.details['taskType'] === 'Review' || state.details['taskType'] === 'Innovation') &&
            !state.details['reviewInnovationDescription']) {
    
            return `Please describe the ${state.details['taskType'].toLowerCase()} ${state.details['taskType'] === 'Innovation' ? 'task' : ''}`
          }
          
          return ''
        
        case 'Client Engagement':

          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('hours') < 0){
            return 'Please indicate the time spent on this activity'
          }
          
          if (state.activeStep === 1 && !state.details['followup']) {
            return 'Please indicate if there was a follow-up'
          }

          if (state.activeStep === 1 && 
              (state.details['followup'] == 'Yes' || state.details['followup'] == 'Maybe')) {
            
              if (!state.details['ClientName']){
                return 'Please enter the client\'s name'
              } else if (!state.details['ContactDetails']){
                return 'Please enter the client\'s contact details'
              }
          }
          
          return ''

        case 'Presentations and Talks':

          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('hours') < 0){
            return 'Please indicate the time spent on this activity'
          }

          if (state.activeStep === 1 && !state.details['presentationMode']) {
            return 'Please specify presentation mode'
          }

          if (state.activeStep === 1 && state.details['presentationType'] === 'Other' && !state.details['otherType']) {
            return 'Please specify presentation type'
          }

          if (state.activeStep === 1 && !state.details['presentationType']) {
            return 'Please specify presentation type'
          }

          
          return ''
        
        case 'Training Activity':

          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('hours') < 0){
            return 'Please indicate the time spent on this activity'
          }

          if (state.activeStep === 1 && !state.details['trainingMode']) {
            return 'Please specify training mode'
          }

          
          return ''

        case 'Recruitment':

          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('hours') < 0){
            return 'Please indicate the time spent on this activity'
          }

          if (state.activeStep === 1 && !state.details['recruitmentDescription']) {
            return 'Please provide a brief description of the activity'
          }

          return ''
        
        case 'DE Team Meetings':

          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('hours') < 0){
            return 'Please indicate the time spent on this activity'
          }

          if (state.activeStep === 1 && !state.details['minutesLink']) {
            return 'Please provide a link to the minutes of the meeting'
          }

          if (state.activeStep === 1 && !state.details['meetingDescription']) {
            return 'Please provide a brief description of the meeting'
          }
          
          return ''
        
        case 'Bid Support':
          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('hours') < 0){
            return 'Please indicate the time spent on this activity'
          }

          if (state.activeStep === 1 && !state.details['inputDescription']) {
            return 'Please provide a brief description of the input'
          }

          return ''
        
        case 'Continuous Improvement':

          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('hours') < 0){
            return 'Please indicate the time spent on this activity'
          }

          if (state.activeStep === 1 && state.details['continuousImprovementType'] === 'Other' && !state.details['otherType']) {
            return 'Please specify the activity type'
          }

          if (state.activeStep === 1 && !state.details['continuousImprovementType']) {
            return 'Please specify the activity type'
          }

          return ''

        case 'Other':
          
          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('hours') < 0){
            return 'Please indicate the time spent on this activity'
          }

          if (state.activeStep === 1 && !state.details['otherType']) {
            return 'Please specify the activity type'
          }

          return ''

        default:
    
          // Big go no go, Awards and Project inception meeting
          if (state.activeStep === 1 && 
              ((Object.keys(state.details).length === 0) || 
              (!state.details['DEActivitiesImplemented']))) {
    
            return 'Please indicate if DE activities were implemented'
          }
    
          if (state.activeStep === 1 && 
              (state.details['DEActivitiesImplemented'] != 'No' && 
              !state.details['DEActivityDescription'])) {
    
            return 'Please describe the DE activities that were undertaken'
          }
    
          if (state.activeStep === 1 && !state.details['hours']) {
            return 'Please indicate the time spent on this activity'
          }
    
          return ''
      }

}

