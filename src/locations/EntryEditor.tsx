import React, { useState, useEffect } from 'react';
import {
  Workbench,
  WorkbenchContent,
  WorkbenchHeader,
  WorkbenchSidebar,
} from '@contentful/f36-workbench';
import { Note, List, Text } from '@contentful/f36-components';

import { EditorExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';

const Entry = () => {
  const editorSdk = useSDK<EditorExtensionSDK>();
  console.log(editorSdk);

  interface FieldProps {
    id: string;
    type: string;
    required: boolean;
  }

  const [errornousOrMissingFields, setFields] = useState<FieldProps[]>([]);

  // Make sure necessary fields are configured
  useEffect(() => {
    const necessaryFields = [
      {
        id: 'formSchema',
        type: 'Object',
        required: true,
      }, {
        id: 'internalTitle',
        type: 'Symbol',
        required: true,
      }
    ];

    if (!editorSdk.entry.fields) {
    }
    const errors = necessaryFields.filter((field) => {
      return !editorSdk.entry.fields[field.id];
    })
    setFields(errors);
  }, [editorSdk]);
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();

  return (
    <Workbench>
      <WorkbenchHeader
        title="Form Builder"
        description="v 0.0.1"
      />
      <WorkbenchSidebar>
        we might put something here...
      </WorkbenchSidebar>
      <WorkbenchContent>
        {errornousOrMissingFields.length > 0 ? (
            <Note title="Necessary fields missing or incorrectly configured" variant="negative">
              The following fields are necessary for the form builder to work properly:
              <List>
              {errornousOrMissingFields.map((field, index) => (
                <List.Item key={index}>
                  <Text
                    fontSize="fontSizeM"
                    lineHeight="lineHeightM"
                    fontWeight="fontWeightDemiBold"
                  >
                    {field.id}
                  </Text>
                </List.Item>
              ))}
              </List>
            </Note>
          ) : (
            <div>test</div>
          )
        }
      </WorkbenchContent>
    </Workbench>
  );
};

export default Entry;
