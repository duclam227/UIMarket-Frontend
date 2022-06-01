import React, { FC } from 'react';
import { Column, InteractionColumn } from '../../../app/util/interfaces';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

interface Props {
  columns: Column[];
  data: any;
  className?: string;
  rowKeyPath: string;
}
const Table: FC<Props> = props => {
  const { columns, className, data, rowKeyPath } = props;
  return (
    <table className={className}>
      <colgroup>
        {columns.map(col => (
          <col
            span={1}
            key={'path' in col ? col.path : col.key}
            style={{ width: `${col.width}%` }}
          />
        ))}
      </colgroup>
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} rowKeyPath={rowKeyPath}/>
    </table>
  );
};

export default Table;
