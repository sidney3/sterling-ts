import { Flex, FlexProps, useStyleConfig } from '@chakra-ui/react';
import sizes from '../../sizes';

const SideBar = (props: FlexProps) => {
  const styles = useStyleConfig('SideBar');
  return <Flex __css={{...styles, overflowY: 'auto'}} {...props} />;
};

const SideBarTheme = {
  baseStyle: {
    w: `${sizes.sideBarSize}px`,
    position: 'fixed',
    top: `${sizes.navBarSize}px`,
    right: 0,
    bottom: `${sizes.statusBarSize}px`,
    display: 'flex',
    flexDir: 'column',
    alignItems: 'stretch',
    fontSize: 'xs',
    borderLeft: '1px',
    borderColor: 'gray.300',
    bg: 'gray.100'
  }
};

export { SideBar, SideBarTheme };
