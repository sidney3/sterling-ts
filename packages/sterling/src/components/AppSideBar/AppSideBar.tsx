import { SideBar, SideBarButton } from '@/sterling-ui';
import { Spacer } from '@chakra-ui/react';
import { GoNote, GoTerminal } from 'react-icons/go';
import { useSterlingDispatch, useSterlingSelector } from '../../state/hooks';
import { selectCommonDrawer, selectMainView } from '../../state/store';
import { commonDrawerViewChanged } from '../../state/ui/uiSlice';
import { GraphViewButtons } from './GraphViewButtons';
import { ScriptViewButtons } from './ScriptViewButtons';
import { TableViewButtons } from './TableViewButtons';

const AppSideBar = () => {
  const dispatch = useSterlingDispatch();
  const view = useSterlingSelector(selectMainView);
  const common = useSterlingSelector(selectCommonDrawer);
  return (
    <SideBar>
      {view === 'GraphView' && <GraphViewButtons />}
      {view === 'TableView' && <TableViewButtons />}
      {view === 'ScriptView' && <ScriptViewButtons />}
      <Spacer />
      <SideBarButton
        text='Evaluator'
        rightIcon={<GoTerminal />}
        isActive={common === 'evaluator'}
        onClick={() => dispatch(commonDrawerViewChanged('evaluator'))}
      />
      <SideBarButton
        text='Log'
        rightIcon={<GoNote />}
        isActive={common === 'log'}
        onClick={() => dispatch(commonDrawerViewChanged('log'))}
      />
    </SideBar>
  );
};

export { AppSideBar };
