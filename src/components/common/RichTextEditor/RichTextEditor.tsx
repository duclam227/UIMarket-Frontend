import { FC } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClientsideUploadAdapterPlugin from './ClientsideUploadAdapter';

interface RichTextEditorProp {
  onChange: Function;
  onBlur?: Function;
  initialValue?: string;
}

const RichTextEditor: FC<RichTextEditorProp> = ({
  onChange,
  initialValue,
  onBlur,
}) => {
  return (
    <CKEditor
      editor={Editor}
      data={initialValue ? initialValue : ''}
      onChange={(event: any, editor: any): void => {
        onChange(editor.getData());
      }}
      onBlur={onBlur ? (e: any) => onBlur(e) : null}
      config={{
        extraPlugins: [ClientsideUploadAdapterPlugin],
      }}
    ></CKEditor>
  );
};

export default RichTextEditor;
