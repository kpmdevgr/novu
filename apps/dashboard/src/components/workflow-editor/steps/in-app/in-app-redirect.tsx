import { useMemo } from 'react';

import { FormLabel } from '@/components/primitives/form/form';
import { URLInput } from '../../url-input';
import { urlTargetTypes } from '@/utils/url';
import { useStepEditorContext } from '../hooks';
import { parseStepVariablesToLiquidVariables } from '@/utils/parseStepVariablesToLiquidVariables';

export const InAppRedirect = () => {
  const { step } = useStepEditorContext();
  const variables = useMemo(() => (step ? parseStepVariablesToLiquidVariables(step.variables) : []), [step]);

  return (
    <div className="flex flex-col gap-1">
      <FormLabel tooltip="The redirect object defines the URL to visit when the notification is clicked. Alternatively, use an onNotificationClick handler in the <Inbox /> component.">
        Redirect URL
      </FormLabel>
      <URLInput
        options={urlTargetTypes}
        placeholder="/tasks/{{taskId}}"
        size="md"
        asEditor
        fields={{
          urlKey: 'redirect.url',
          targetKey: 'redirect.target',
        }}
        variables={variables}
      />
    </div>
  );
};
