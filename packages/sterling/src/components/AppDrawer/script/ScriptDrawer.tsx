import { useSterlingSelector } from '../../../state/hooks';
import {
  selectActiveDatum,
  selectScriptDrawer
} from '../../../state/selectors';
import {
  EvaluatorDrawer,
  EvaluatorDrawerHeader
} from '../common/EvaluatorDrawer/EvaluatorDrawer';
import { LogDrawer, LogDrawerHeader } from '../common/LogDrawer';
import {
  VariablesDrawer,
  VariablesDrawerHeader
} from './variables/VariablesDrawer';

const ScriptDrawer = () => {
  const datum = useSterlingSelector(selectActiveDatum);
  const drawer = useSterlingSelector(selectScriptDrawer);
  return (
    <>
      {drawer === 'evaluator' && <EvaluatorDrawer />}
      {drawer === 'log' && <LogDrawer />}
      {drawer === 'variables' && datum && <VariablesDrawer datum={datum} />}
    </>
  );
};

const ScriptDrawerHeader = () => {
  const drawer = useSterlingSelector(selectScriptDrawer);
  return (
    <>
      {drawer === 'evaluator' && <EvaluatorDrawerHeader />}
      {drawer === 'log' && <LogDrawerHeader />}
      {drawer === 'variables' && <VariablesDrawerHeader />}
    </>
  );
};

export { ScriptDrawer, ScriptDrawerHeader };