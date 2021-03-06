import cloudinary from './config.js'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
//multer settings
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Posts',
  },
});
const parser = multer({ storage });

export default parser