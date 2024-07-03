import fs from "fs";

export const uploadFile = async (req, res) => {
  const file = req.file;
  res.status(201).json({
    fileName: file.filename,
    type: file.mimetype,
    path: file.path,
  });
};

export const downloadFile = async (req, res) => {
  const files = fs.readdirSync("uploads/");
  const { filename } = req.params;

  res.download("uploads/" + filename, filename);
};
