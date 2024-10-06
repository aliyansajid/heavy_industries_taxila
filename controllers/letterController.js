const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

exports.uploadLetter = async (req, res) => {
  const { subject, reference, priority, uploadedBy } = req.body;
  const fileName = req.file.filename;

  try {
    const letter = await prisma.letter.create({
      data: {
        subject: subject,
        reference: reference,
        priority: priority,
        fileLocation: `/uploads/${fileName}`,
        uploadedBy: uploadedBy,
      },
    });

    res.status(200).json({
      status: "ok",
      message: "Letter uploaded successfully.",
      letter,
    });
  } catch (error) {
    console.error("Error saving letter: ", error);
    fs.unlink(`./uploads/${fileName}`, (err) => {
      if (err) console.error("Error deleting file: ", err);
    });

    res.status(500).json({
      status: "error",
      message: "An error occurred while uploading the letter.",
    });
  }
};
