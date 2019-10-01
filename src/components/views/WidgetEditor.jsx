import React from 'react';
import Heading from '../shared/Heading';
import Panel from '../shared/Panel';
import WidgetForm from '../../containers/WidgetForm';

const WidgetEditor = () => (
  <div>
    <Heading text="Widget Editor" />
    <Panel>
      <WidgetForm />
    </Panel>
  </div>
);

export default WidgetEditor;
