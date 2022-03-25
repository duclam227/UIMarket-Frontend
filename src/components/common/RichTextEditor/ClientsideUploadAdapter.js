import s3API from '../../../api/amazonS3';

// A custom upload adapter to handle image upload logic
class ClientsideUploadAdapter {
  controller = new AbortController();
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      file =>
        new Promise(async (resolve, reject) => {
          try {
            const { url: signedUploadUrl } = await s3API.getSignedUrl(
              'images',
            );
            await s3API.uploadToS3Bucket(signedUploadUrl, file);
            const imageUrl = signedUploadUrl.split('?')[0];
            resolve({
              default: imageUrl,
            });
          } catch (error) {
            return reject(
              error && error.message
                ? error.message
                : 'Could not upload image for some reason',
            );
          }
        }),
    );
  }

  abort() {
    this.controller.abort();
  }
}

export default function ClientsideUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = loader => {
    return new ClientsideUploadAdapter(loader);
  };
}
