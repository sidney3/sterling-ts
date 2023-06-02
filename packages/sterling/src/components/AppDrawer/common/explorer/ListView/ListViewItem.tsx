import { DatumParsed } from '@/sterling-connection';
import { Icon } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { FaFilm } from 'react-icons/fa';
import { GoTerminal } from 'react-icons/go';
import { GiFilmProjector } from 'react-icons/gi';
import { useSterlingSelector } from '../../../../../state/hooks';
import {
  selectDatumIsStateful,
  selectDatumIsStatefulProjected
} from '../../../../../state/selectors';
import { Row, RowItem } from './Row';

interface ListViewItemProps {
  datum: DatumParsed<any>;
  active: boolean;
  onClickItem: (event: MouseEvent, datum: DatumParsed<any>) => void;
}

const ListViewItem = (props: ListViewItemProps) => {
  const { datum, active, onClickItem } = props;
  const statefulNative = useSterlingSelector((state) =>
    selectDatumIsStateful(state, datum)
  );
  const statefulProjected = useSterlingSelector((state) =>
    selectDatumIsStatefulProjected(state, datum)
  );
  const cn = active ? 'text-white bg-blue-600' : '';

  return (
    <Row onClick={(event) => onClickItem(event, datum)}>
      <RowItem className={cn}>Datum ID: {datum.id}</RowItem>
      <RowItem className={cn}>
        {datum.evaluator && <Icon as={GoTerminal} />}
      </RowItem>
      <RowItem className={cn}>
        {statefulNative && <Icon as={FaFilm} />}
        {statefulProjected && <Icon as={GiFilmProjector} />}
      </RowItem>
    </Row>
  );
};

export { ListViewItem };
