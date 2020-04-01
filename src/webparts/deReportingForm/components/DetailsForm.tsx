import * as React from "react";
import { GonogoAwardsInceptionDetails } from './GonogoAwardsInception'
import { ProjectSupportDetails } from './ProjectSupport'
import { ClientEngagementDetails } from './ClientEngagement'
import { PresentationTalks } from './PresentationTalks'
import { Training } from './TrainingForm'
import { Recruitment } from './RecruitmentForm'
import { DeTeamMeetings } from './DeTeamMeetingsForm'
import { BidSupport } from './BidSupportForm'
import { ContinuousImprovement } from './ContinuousImprovementForm'
import { Other } from './OtherForm'

interface DetailsProps {
    setDetails: (d: object) => void;
    activityType: string;
    subState: object;
  }
  
  export const DetailsForm: React.FC<DetailsProps> = (Props: DetailsProps) => {
    
    const [selected, setSelected] = React.useState('');
    
    switch (Props.activityType) {

        case 'Client Engagement':
            return <ClientEngagementDetails 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                    />;
        case 'Project Support':
            return <ProjectSupportDetails 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                    />
        case 'Presentations and Talks':
            return <PresentationTalks 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                    />
        case 'Training Activity':
            return <Training 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                    />
        case 'Recruitment':
            return <Recruitment 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                    />
        case 'DE Team Meetings':
            return <DeTeamMeetings 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                    />
        case 'Bid Support':
            return <BidSupport 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                    />
        case 'Continuous Improvement':
            return <ContinuousImprovement 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                    />
        case 'Other':
            return <Other 
                    setDetails={Props.setDetails} 
                    activity={Props.activityType}
                    subState={Props.subState}
                />
        default:
            return <GonogoAwardsInceptionDetails 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                    />
      }
    
  }