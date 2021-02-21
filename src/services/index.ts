import profile from './profile/routes';
import fileUpload from './file-upload/routes';

export default [
    ...profile,
    ...fileUpload
];