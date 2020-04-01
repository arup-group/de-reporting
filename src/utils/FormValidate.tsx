export default function validator(state) {

    switch (state.activityType) {

        case '':
          return 'Please select an activity type'
    
        case 'Project Support':
    
          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('location') < 0){
            return 'Please provide your location'
          }
    
          if (state.activeStep === 1 && !(/^\d{6}(-\d{2})?$/.exec(state.details['ProjectNumber']))) {
            return 'Please enter a valid project number'
          }
    
          if (state.activeStep === 1 && !state.details['TaskType']) {
            return 'Please specify the type of the task that was undertaken'
          }
    
          if (state.activeStep === 1 && !state.details['ProjectDescription']) {
    
            return 'Please provide a project description'
          }
    
          if (state.activeStep === 1 && 
            (state.details['TaskType'] === 'Review' || state.details['TaskType'] === 'Innovation') &&
            !state.details['ReviewInnovationDescription']) {
    
            return `Please describe the ${state.details['TaskType'].toLowerCase()} ${state.details['TaskType'] === 'Innovation' ? 'task' : ''}`
          }
          
          return ''
        
        case 'Client Engagement':

          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('location') < 0){
            return 'Please provide your location'
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
            Object.keys(state.details).indexOf('location') < 0){
            return 'Please provide your location'
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
            Object.keys(state.details).indexOf('location') < 0){
            return 'Please provide your location'
          }

          if (state.activeStep === 1 && !state.details['trainingMode']) {
            return 'Please specify training mode'
          }

          
          return ''

        case 'Recruitment':

          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('location') < 0){
            return 'Please provide your location'
          }

          if (state.activeStep === 1 && !state.details['recruitmentDescription']) {
            return 'Please provide a brief description of the activity'
          }

          return ''
        
        case 'DE Team Meetings':

          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('location') < 0){
            return 'Please provide your location'
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
            Object.keys(state.details).indexOf('location') < 0){
            return 'Please provide your location'
          }

          if (state.activeStep === 1 && !state.details['inputDescription']) {
            return 'Please provide a brief description of the input'
          }

          return ''
        
        case 'Continuous Improvement':

          if (state.activeStep === 1 && 
            Object.keys(state.details).indexOf('location') < 0){
            return 'Please provide your location'
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
            Object.keys(state.details).indexOf('location') < 0){
            return 'Please provide your location'
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
    
          if (state.activeStep === 1 && !state.details['location']) {
            return 'Please provide your location'
          }
    
          return ''
      }

}

