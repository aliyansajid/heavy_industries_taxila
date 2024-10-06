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

exports.getLetters = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { inbox: true },
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found." });
    }

    const letters = await prisma.letter.findMany({
      where: {
        id: {
          in: user.inbox,
        },
      },
    });

    res.status(200).json({
      status: "ok",
      letters,
    });
  } catch (error) {
    console.error("Error fetching letters:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching letters.",
    });
  }
};
