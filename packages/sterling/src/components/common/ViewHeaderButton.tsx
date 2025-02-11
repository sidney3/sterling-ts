import { Button, buttonClicked } from '@/sterling-connection';
import { PaneHeaderButton } from '@/sterling-ui';
import { Tooltip } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useSterlingDispatch } from '../../state/hooks';

interface ViewHeaderButtonProps {
  datumId: string;
  button: Button;
}

const ViewHeaderButton = (props: ViewHeaderButtonProps) => {
  const dispatch = useSterlingDispatch();
  const { datumId, button } = props;
  const { text, onClick, mouseover } = button;

  const handleClick = useCallback(() => {
    dispatch(
      buttonClicked({
        id: datumId,
        onClick: onClick
      })
    );
  }, [datumId, button]);

  return (
    <Tooltip hasArrow label={mouseover} isDisabled={mouseover === undefined}>
      <PaneHeaderButton onClick={handleClick}>{text}</PaneHeaderButton>
    </Tooltip>
  );
};

export { ViewHeaderButton };
