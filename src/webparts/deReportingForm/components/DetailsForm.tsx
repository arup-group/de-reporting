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
import { BatchTable } from './BatchTable'

interface DetailsProps {
    setDetails: (d: object ) => void
    activityType: string
    subState: object
    setValidationError: (message: string) => void
    batchData: Array<object>
    setBatchDataMain: (flattened: Array<object>, raw: Array<object>) => void
    batchDetails: Array<object>
    notBatch: boolean
    tableData: any
    setTableDataMain: (tabledata: any) => void
  }
  
  export const DetailsForm: React.FC<DetailsProps> = (Props: DetailsProps) => {
    
    const [selected, setSelected] = React.useState('')
    
    switch (Props.activityType) {

        case 'multiple': 
            return <BatchTable 
                    setDetails={Props.setDetails}
                    subState={Props.subState}
                    setValidationError={Props.setValidationError}
                    batchData={Props.batchData}
                    setBatchDataMain={Props.setBatchDataMain}
                    batchDetails={Props.batchDetails}
                    tableData={Props.tableData}
                    setTableDataMain={Props.setTableDataMain}
                />
        case 'Client Engagement':
            return <ClientEngagementDetails 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                        notBatch={Props.notBatch}
                    />;
        case 'Project Support':
            return <ProjectSupportDetails 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                        notBatch={Props.notBatch}
                    />
        case 'Presentations and Talks':
            return <PresentationTalks 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                        notBatch={Props.notBatch}
                    />
        case 'Training Activity':
            return <Training 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                        notBatch={Props.notBatch}
                    />
        case 'Recruitment':
            return <Recruitment 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                        notBatch={Props.notBatch}
                    />
        case 'DE Team Meetings':
            return <DeTeamMeetings 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                        notBatch={Props.notBatch}
                    />
        case 'Bid Support':
            return <BidSupport 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                        notBatch={Props.notBatch}
                    />
        case 'Continuous Improvement':
            return <ContinuousImprovement 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                        notBatch={Props.notBatch}
                    />
        case 'Other':
            return <Other 
                    setDetails={Props.setDetails} 
                    activity={Props.activityType}
                    subState={Props.subState}
                    notBatch={Props.notBatch}
                />
        default:
            return <GonogoAwardsInceptionDetails 
                        setDetails={Props.setDetails} 
                        activity={Props.activityType}
                        subState={Props.subState}
                        notBatch={Props.notBatch}
                    />
      }
    
  }