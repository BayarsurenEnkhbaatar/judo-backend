import {  putObject } from "../../s3/upload.js";
import axios from 'axios'
import { getObjectURL } from "../../s3/index.js";

export const imageUpload = async (req, res) => {
  const { file } = req;

  // Generate a unique key using a combination of a unique identifier and the original filename
  const key = `${Date.now()}-${file.originalname}`;

  try {
    const url = await putObject(`image-${key}`, file.mimetype);

    const response = await axios.put(url, file.buffer, {
      headers: {
        'Content-Type': file.mimetype
      }
    });

    if (response.status === 200) {
      res.status(200).json(`/upload/user-uploads/image-${key}`);
    } else {
      res.status(500).json({ error: 'Image upload failed.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const imageGet = async (req, res) => {
  const {key} = req.query;
  const url = await getObjectURL(key);
  return res.status(200).json(url)
};
