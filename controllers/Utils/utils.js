import {  putObject } from "../../s3/upload.js";
import axios from 'axios'
import { getObjectURL } from "../../s3/index.js";
import bodyParser from 'body-parser';
import puppeteer from 'puppeteer';
import mustache from 'mustache';
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();


export const pdfConvert = async (req, res) => {
  const mandatHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @page {
          size: A4;
          margin: 0;
        }
        body {
          margin: 2mm;
        }
        .mandat-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px; /* Adjust the gap as needed */
          padding: 2px; /* Add padding to the grid container */
        }
        .mandat-container {
          border: 1px solid #0073e6;
          font-family: 'Roboto', sans-serif;
          width: 100%;
          height: 146mm;
          background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-gMqd-hJKQ1XmHcSc4awyrVxzCBjifIp32A&usqp=CAU') no-repeat center center;
          background-size: cover;
        }
        .header {
          background: #0073e6;
          color: white;
          padding: 6px 0;
        }
        .header h1 {
          text-align: center;
          text-transform: uppercase;
          font-size: 12px;
        }
        .logo-container {
          display: flex;
          justify-content: center;
          gap: 2px;
          margin-top: 12px;
        }
        .logo-container img {
          height: 40px;
        }
        .profile-container {
          display: flex;
          justify-content: center;
          margin-top: 12px;
        }
        .profile-container img {
          height: 4cm;
          width: 3cm;
        }
        .info-container {
          display: flex;
          justify-content: center;
          padding: 16px 0;
        }
        .info {
          width: 70%;
          padding: 0 10%;
        }
        .info h1 {
          font-weight: bold;
          font-size: 12px;
        }
        .info h1 span {
          font-weight: lighter;
          font-size: 10px;
          text-transform: uppercase;
        }
        .footer {
          text-align: center;
          margin-top: 60px;
        }
        .footer h1 {
          font-weight: bold;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="mandat-grid">
        <!-- Repeat the mandat-container for each mandate -->
        {{#athleteData}}
        <div class="mandat-container">
          <div class="header">
            <h1>Монголын жүдо бөхийн холбоо</h1>
            <h1>{{comp_name}} МАНДАТ</h1>
          </div>
          <div class="logo-container">
            <img src="{{judo_logo}}" alt="Judo Logo">
            <img src="{{zb_logo}}" alt="Government Logo">
          </div>
          <div class="profile-container">
            <img src="{{profile}}" alt="Profile Image">
          </div>
          <div class="info-container">
            <div class="info">
              <h1><span>Тамирчины овог нэр :</span> <span>{{athlete_lastname}} {{athlete_name}}</span></h1>
              <h1><span>Байгууллага :</span> <span>{{org_name}}</span></h1>
              <h1><span>Жин :</span> <span>{{kg}} кг</span></h1>
            </div>
          </div>
          <div class="footer">
            <h1>Dojo.mn</h1>
            <h1>2023 он</h1>
          </div>
        </div>
        {{/athleteData}}
      </div>
    </body>
  </html>
`;

  try {
    const { comp_id, org_id } = req.body;
    const athleteData = await fetchDataFromDatabase(org_id, comp_id);

    const dynamicHtml = mustache.render(mandatHtml, { athleteData });

    // const browser = await puppeteer.launch({
    //   headless: true,
    // });
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser'
    })

    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (['image'].includes(request.resourceType())) {
        request.continue();
      } else {
        request.abort();
      }
    });

    await page.setContent(dynamicHtml);
    await page.waitForSelector('img');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    // res.setHeader('Content-Type', 'application/pdf');
    // res.send(pdfBuffer);
    const base64pdf = pdfBuffer.toString('base64');
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send(error);
  }
};

const fetchDataFromDatabase = async (orgId, compId) => {
  try {
    const response = await prisma.athlete_to_comptation.findMany({
      where: {
        org_id: Number(orgId),
        comp_id: Number(compId),
      },
      include: {
        athlete: true,
        organization: true,
        comptation: true,
      },
    });
    const signedUrls = await Promise.all(response.map(async (item) => {
      const profileUrl = await imageGetProfile(item.athlete.profile_img);
      
      return {
        athlete_name: item.athlete.username,
        athlete_lastname: item.athlete.lastname,
        judo_logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHdvEiPsW1WYJuAOwuqtj22HcUDI9i2_BlhhuM5WgnVMOyxvZIxFNX_VC4pXetj6WH9zA&usqp=CAU',
        profile: profileUrl,
        zb_logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHdvEiPsW1WYJuAOwuqtj22HcUDI9i2_BlhhuM5WgnVMOyxvZIxFNX_VC4pXetj6WH9zA&usqp=CAU',
        kg: item.kg,
        org_name: item.organization.name,
        comp_name: item.comptation.name,
      };
    }));
    return signedUrls

    // return response.map((item) => ({
    //   athlete_name: item.athlete.username,
    //   athlete_lastname: item.athlete.lastname,
    //   judo_logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHdvEiPsW1WYJuAOwuqtj22HcUDI9i2_BlhhuM5WgnVMOyxvZIxFNX_VC4pXetj6WH9zA&usqp=CAU',
    //   profile: profileUrl,
    //   zb_logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHdvEiPsW1WYJuAOwuqtj22HcUDI9i2_BlhhuM5WgnVMOyxvZIxFNX_VC4pXetj6WH9zA&usqp=CAU',
    //   kg: item.kg,
    //   org_name: item.organization.name,
    //   comp_name: item.comptation.name,
    // }));

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const imageGetProfile = async (key) => {
  const url = await getObjectURL(key);
  return url
};

export const imageGet = async (req, res) => {
  const {key} = req.query;
  const url = await getObjectURL(key);
  return res.status(200).json(url)
};

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
