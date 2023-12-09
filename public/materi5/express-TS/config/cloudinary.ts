//input your cloudinary credintial

// Require the Cloudinary library
import {v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dc3a9lxds", // TODO: Ganti dengan cloudname-mu
  api_key: "237365916133455", // TODO: Ganti dengan API Key-mu
  api_secret: "ZitLMsOPKBfpeCeJzJspPV4Qjuo", // TODO: Ganti dengan API Secret-mu
  secure: true,
});

export default cloudinary;