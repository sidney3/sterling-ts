import { PaneTitle } from '@/sterling-ui';
import { Box, Icon } from '@chakra-ui/react';
import { FaFilm } from 'react-icons/fa';
import { useSterlingSelector } from '../../../../state/hooks';
import { selectActiveDatum, selectData } from '../../../../state/selectors';
import { GraphPreview } from '../../../GraphPreview/GraphPreview';
import { ListView } from './ListView/ListView';

const ExplorerDrawer = () => {
  const activeDatum = useSterlingSelector(selectActiveDatum);
  const data = useSterlingSelector(selectData);

  if (!activeDatum) return null;
  return (
    <div aria-label='explorer pane datum selector' className='absolute inset-0 flex flex-col overflow-y-auto'>
        <ListView data={data} active={activeDatum} /> 
    </div>
  );
};

const ExplorerDrawerHeader = () => {
  return (
    <div className='flex items-center px-2 space-x-2'>
      <Icon as={FaFilm} />
      <PaneTitle>Explorer</PaneTitle>
    </div>
  );
};
const TestDatumBox = ({
    active,
    onClick
  }: {
    active: boolean;
    onClick: () => void;
  }) => {
    return (
      <Box
        position='relative'
        flex='0 1 auto'
        mx={2}
        my={1}
        border='1px'
        borderColor={active ? 'blue.400' : 'gray.200'}
        borderRadius='0'
        onClick={onClick}
        _first={{ mt: 2 }}
        _hover={{
          borderColor: 'gray.400',
          cursor: 'pointer',
          shadow: 'base'
        }}
        _active={{
          borderColor: 'gray.300',
          shadow: 'sm'
        }}
      >
        <GraphPreview />
        <Box
          position='absolute'
          bottom='0'
          right='0'
          left='0'
          display='flex'
          justifyContent='flex-end'
          bg={active ? 'blue.100' : 'gray.50'}
          opacity={0.95}
          px={2}
          py={1}
        >
          <Icon as={FaFilm} />
        </Box>
      </Box>
    );
  };
export { ExplorerDrawer, ExplorerDrawerHeader };