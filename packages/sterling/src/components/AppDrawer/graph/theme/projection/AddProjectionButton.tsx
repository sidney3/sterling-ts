import { DatumParsed } from '@/sterling-connection';
import {
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { keys } from 'lodash-es';
import { useCallback } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { projectionAdded } from '../../../../../state/graphs/graphsSlice';
import {
  useSterlingDispatch,
  useSterlingSelector
} from '../../../../../state/hooks';
import { selectAvailableProjectableTypes } from '../../../../../state/selectors';

interface AddProjectionButtonProps {
  datum: DatumParsed<any>;
}

const AddProjectionButton = (props: AddProjectionButtonProps) => {
  const { datum } = props;
  const dispatch = useSterlingDispatch();

  // Get Record<string, string[]> mapping types to atoms for types that are
  // not already projected over.
  const available = useSterlingSelector((state) =>
    selectAvailableProjectableTypes(state, datum)
  );
  const types = keys(available);

  // Create a callback that dispatches a projectionAdded action
  const onClick = useCallback(
    (type: string) => {
      const atoms = available[type];
      const atom = atoms[0];
      dispatch(
        projectionAdded({
          datum,
          type,
          atom
        })
      );
    },
    [datum, available]
  );

  return (
    <Center my={2}>
      <Menu>
        <MenuButton
          as={Button}
          colorScheme='green'
          size='xs'
          leftIcon={<IoMdAddCircleOutline />}
        >
          Add Projection
        </MenuButton>
        <MenuList>
          {types.map((type) => {
            return (
              <MenuItem key={type} onClick={() => onClick(type)}>
                {type}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Center>
  );
};

export { AddProjectionButton };
