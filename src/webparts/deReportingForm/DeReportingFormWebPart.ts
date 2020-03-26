import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import {DeReportingForm} from './components/DeReportingForm';

export default class DeReportingFormWebPart extends BaseClientSideWebPart <{}> {

  public render(): void {
    const element: React.ReactElement<{}> = React.createElement(
      DeReportingForm
    );

    ReactDom.render(element, this.domElement);
  }
}