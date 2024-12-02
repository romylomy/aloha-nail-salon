'use client'
import * as React from 'react';
import { extend } from '@syncfusion/ej2-base';

import {
  Day,
  WorkWeek,
  Month,
  TimelineViews,
  ScheduleComponent,
  ResourcesDirective,
  ResourceDirective,
  ViewsDirective,
  ViewDirective,
  Inject,
  Resize,
  DragAndDrop,
  ResourceDetails,
} from '@syncfusion/ej2-react-schedule';

type GroupEditingProps = {
  appointmentData: Array<any>;
  staffData: Array<any>;
};

const GroupEditing = ({ appointmentData, staffData }: GroupEditingProps) => {
  // Map appointments with ConferenceId (staff ID)
  const data = appointmentData.map((appointment) => ({
    Id: appointment.Id,
    Subject: appointment.Subject,
    Description: appointment.Description,
    StartTime: appointment.StartTime,
    EndTime: appointment.EndTime,
    IsAllDay: appointment.IsAllDay,
    ConferenceId: appointment.staffId, // Map staff ID here
  }));

  console.log(data);

  // Map staff data for resources
  const resourceData = staffData.map((staff, index) => ({
    Text: staff.name,      // Ensure `name` exists in your staff data
    Id: staff._id,         // Ensure `_id` exists in your staff data
    Color: ['#1aaa55', '#357cd2', '#7fa900'][index % 3], // Assign colors cyclically
  }));

  console.log(resourceData);

  // Function to get employee name
  const getEmployeeName = (value: ResourceDetails): string => {
    return value.resourceData?.Text || value.resourceName;
  };

  // Use `getEmployeeName` in the resourceHeaderTemplate
  const resourceHeaderTemplate = (props: any) => (
    <div className="template-wrap">
      <div className="resource-details">
        <div className="text-black font-bold">{getEmployeeName(props)}</div>
      </div>
    </div>
  );

  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            cssClass="group-editing"
            
            width="100%"
            height="650px"
            selectedDate={new Date()}
            startHour="09:00"  // Set start hour to 9 AM
            currentView="Day"
            currentTimeIndicator={true} 
            resourceHeaderTemplate={resourceHeaderTemplate}
            eventSettings={{
              dataSource: data,
              fields: {
                subject: { title: 'Service', name: 'Subject' },
                startTime: { title: 'Start Time', name: 'StartTime' },
                endTime: { title: 'End Time', name: 'EndTime' },
                isAllDay: { name: 'IsAllDay' },
              },
              allowEditing: false,   // Disable editing of events
              allowDeleting: false,  // Disable deleting of events
            }}
            group={{ allowGroupEdit: false, resources: ['Conferences'] }}
            
          >
            <ResourcesDirective>
              <ResourceDirective
                field="ConferenceId"
                title="Staff"
                name="Conferences"
                allowMultiple={true}
                dataSource={resourceData}
                textField="Text"   // Display the name (Text)
                idField="Id"       // Reference staff ID (_id)
                colorField="Color"
              />
            </ResourcesDirective>
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="WorkWeek" />
              <ViewDirective option="Month" />
              <ViewDirective option="TimelineWeek" />
            </ViewsDirective>
            <Inject services={[Day, WorkWeek, Month, TimelineViews]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  );
};

export default GroupEditing;
