import React, { FC } from 'react';

import Spinner from 'react-bootstrap/Spinner';

import { Column } from '../../../app/util/interfaces';
import style from './Table.module.css';
interface Props {
  data: any;
  columns: Column[];
  rowKeyPath: string;
}
const TableBody: FC<Props> = props => {
  const { data, columns, rowKeyPath } = props;

  const renderTableData = (item: any, column: Column) => {
    if ('path' in column)
      return (
        <td key={column.path} className={`${column.bold ? 'fw-bold' : ''} ${style.td}`}>
          {item[column.path]}
        </td>
      );
    if ('content' in column)
      return (
        <td key={column.key} className={`${style.td}`}>
          {column.content(item)}
        </td>
      );
  };
  return (
    <tbody>
      {data ? (
        data.map((item: any) => (
          <tr key={item[rowKeyPath]}>
            {columns.map(column => renderTableData(item, column))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length} className={`text-center pt-4 ${style.td}`}>
            <Spinner animation="border" />
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
