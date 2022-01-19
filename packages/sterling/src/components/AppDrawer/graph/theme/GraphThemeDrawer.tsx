import { PaneTitle } from '@/sterling-ui';
import { Icon } from '@chakra-ui/react';
import { RiPaletteLine } from 'react-icons/ri';
import { useSterlingSelector } from '../../../../state/hooks';
import { selectActiveDatum } from '../../../../state/selectors';
import { ProjectionSection } from './projection/ProjectionSection';

const GraphThemeDrawer = () => {
  const activeDatum = useSterlingSelector(selectActiveDatum);

  if (!activeDatum) return null;
  return (
    <div className='absolute inset-0 flex flex-col overflow-y-auto'>
      <ProjectionSection datum={activeDatum} />
    </div>
  );
};

const GraphThemeDrawerHeader = () => {
  return (
    <div className='flex items-center px-2 space-x-2'>
      <Icon as={RiPaletteLine} />
      <PaneTitle>Theme</PaneTitle>
    </div>
  );
};

export { GraphThemeDrawer, GraphThemeDrawerHeader };
