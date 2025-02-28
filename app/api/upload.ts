import cloudinary from "@/lib/cloudinary";
// import { IncomingForm } from 'formidable';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const uploadImage = async (req, res) => {
//   const form = new IncomingForm();
//   form.uploadDir = './';
//   form.keepExtensions = true;
//
//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Something went wrong' });
//     }
//
//     const imagePath = files.image[0].filepath;
//
//     try {
//       const result = await cloudinary.uploader.upload(imagePath, {
//         folder: 'nextjs-app',
//       });
//       fs.unlinkSync(imagePath); // удаляем временный файл
//
//       return res.status(200).json({ url: result.secure_url });
//     } catch (uploadError) {
//       return res.status(500).json({ error: 'Error uploading to Cloudinary' });
//     }
//   });
// };

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error('CLOUDINARY_CLOUD_NAME is not set');
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error('CLOUDINARY_API_KEY is not set');
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error('CLOUDINARY_API_SECRET is not set');
}

export async function uploadImage(image) {
  const imageData = await image.arrayBuffer();
  const mime = image.type;
  const encoding = 'base64';
  const base64Data = Buffer.from(imageData).toString('base64');
  const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
  const result = await cloudinary.uploader.upload(fileUri, {
    folder: 'nextjs-course-mutations',
  });
  return result.secure_url;
}
