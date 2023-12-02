import {  putObject } from "../../s3/upload.js";
import axios from 'axios'
import { getObjectURL } from "../../s3/index.js";

export const imageUpload = async (req, res) => {
  const {file} = req;
  const key = Date.now()+file.originalname;
  const url = await putObject(`image-${key}`, file.mimetype);

  try {
    const ress = await axios.put(url, file.buffer, {
      headers: {
        'Content-Type': file.mimetype
      }
    });

    // const uri = await getObjectURL(`/upload/user-uploads/image-${key}`);
    res.status(200).json(`/upload/user-uploads/image-${key}`);
    
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export const imageGet = async (req, res) => {
  const {key} = req.query;
  const url = await getObjectURL(key);
  return res.status(200).json(url)
};
