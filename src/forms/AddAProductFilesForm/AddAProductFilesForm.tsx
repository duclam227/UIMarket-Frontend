import React, { useEffect, useState } from 'react';
import { IntlShape, injectIntl, FormattedMessage } from 'react-intl';
import Form from 'react-bootstrap/Form';

import s3API from '../../api/amazonS3';

import { FileInput } from '../../components';

import style from './AddAProductFilesForm.module.css';

interface Props {
  updateProductInfo: Function;
  intl: IntlShape;
}

const AddAProductFilesForm: React.FC<Props> = props => {
  const { intl } = props;

  const [files, setFiles] = useState<Array<string>>([]);
  const [fileList, setFileList] = useState<Array<File>>([]);

  const uploadFile = (file: Array<File>) => {
    setFileList([...fileList, ...file]);
  };

  const deleteFile = (indexToDelete: number) => {
    setFileList(fileList.filter((file, index) => index !== indexToDelete));
  };

  useEffect(() => {
    props.updateProductInfo({
      productFiles: [...fileList],
    });
  }, [fileList]);

  return (
    <Form name="AddAProductFilesForm" className={style.form}>
      <div className={style.formTitle}>
        <FormattedMessage id="AddAProduct.TabFilesTitle" />
      </div>

      <FileInput
        multiple={true}
        files={files}
        handleUpload={(file: Array<File>) => uploadFile(file)}
        handleDelete={(index: number) => deleteFile(index)}
      />
    </Form>
  );
};

export default injectIntl(AddAProductFilesForm);
