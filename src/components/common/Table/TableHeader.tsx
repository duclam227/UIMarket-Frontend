import React, { FC } from 'react';
import { Column, DataColumn } from '../../../app/util/interfaces';
import style from './Table.module.css';
interface Props {
  columns: Column[];
}
const TableHeader: FC<Props> = props => {
  const { columns } = props;
  const thBstrapClass = 'fw-bold text-muted';

  return (
    <thead className={`${style.thead}`}>
      <tr className={`${style.tr}`}>
        {columns.map(col => (
          <th
            scope="col"
            key={'key' in col ? col.key : col.path}
            className={`${thBstrapClass} ${style.th}`}
          >
            {'label' in col ? col.label : null}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

//   <thead className={`${style.thead}`}>
//     <tr>
//       <th scope="col" className={` ${style.th}`}>
//         <Form.Check />
//       </th>
//       <th scope="col" className={`${thBstrapClass} ${style.th}`}>
//         {nameTableHeaderLabel}
//       </th>
//       <th scope="col" className={`${thBstrapClass} ${style.th}`}>
//         {emailTableHeaderLabel}
//       </th>
//       <th
//         scope="col"
//         className={`${thBstrapClass} ${style.th} d-flex justify-content-end`}
//       >
//         {actionTableHeaderLabel}
//       </th>
//     </tr>
//   </thead>
