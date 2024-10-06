const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
        uploadedById: uploadedBy,
      },
    });

    res
      .status(200)
      .json({ status: "ok", message: "Letter uploaded successfully.", letter });
  } catch (error) {
    console.error("Error saving letter: ", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while uploading the letter.",
    });
  }
};
