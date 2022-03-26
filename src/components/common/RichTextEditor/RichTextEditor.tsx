import { FC } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClientsideUploadAdapterPlugin from './ClientsideUploadAdapter';

interface RichTextEditorProp {
  onChange: Function;
  initialValue?: string;
}

const RichTextEditor: FC<RichTextEditorProp> = ({ onChange, initialValue }) => {
  return (
    <CKEditor
      editor={Editor}
      data={initialValue ? initialValue : ''}
      onChange={(event: any, editor: any): void => {
        onChange(editor.getData());
      }}
      config={{
        extraPlugins: [ClientsideUploadAdapterPlugin],
      }}
    ></CKEditor>
  );
};

export default RichTextEditor;
