import { StatusBar } from '@/sterling-ui';
import { Divider, Spacer, useDisclosure } from '@chakra-ui/react';
import { dumpClicked } from '../../state/data/dataSlice';
import { useSterlingDispatch } from '../../state/hooks';
import { ConnectionStatus } from './ConnectionStatus';
import { ManualXMLModal } from './ManualXMLModal';

export const TEXT_manual_datum_button = 'Manual Datum'

const AppStatusBar = () => {
  const dispatch = useSterlingDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <StatusBar data-testid='app-status-bar'>
      <Spacer />
      <Divider orientation='vertical' mx={2} />
      <div
        className='cursor-pointer hover:text-gray-500'
        onClick={onOpen}
      >
        {TEXT_manual_datum_button}
      </div>
      <ManualXMLModal isOpen={isOpen} onClose={onClose}/>
      <Divider orientation='vertical' mx={2} />
      <div
        className='cursor-pointer hover:text-gray-500'
        onClick={() => {
          dispatch(dumpClicked());
        }}
      >
        Console Dump
      </div>
      <Divider orientation='vertical' mx={2} />
      <ConnectionStatus />
    </StatusBar>
  );
};

export { AppStatusBar };
