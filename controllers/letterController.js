const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

exports.uploadLetter = async (req, res) => {
  const { subject, reference, priority, uploadedBy, sendBy } = req.body;
  const fileName = req.file.filename;

  const receivedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const defaultRemarks = `By ${sendBy} on ${receivedDate}`;

  try {
    const letter = await prisma.letter.create({
      data: {
        subject: subject,
        reference: reference,
        priority: priority,
        fileLocation: `/uploads/${fileName}`,
        uploadedBy: uploadedBy,
        remarks: [defaultRemarks],
      },
    });

    const scanner = await prisma.scanner.create({
      data: {
        letterId: letter.id,
        sendBy: sendBy,
        subject: subject,
        reference: reference,
      },
    });

    res.status(200).json({
      status: "ok",
      message: "Letter uploaded successfully.",
      letter,
      scannerId: scanner.id,
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

exports.getLetterById = async (req, res) => {
  const { id } = req.params;

  try {
    const letter = await prisma.letter.findUnique({
      where: { id },
    });

    if (!letter) {
      return res.status(404).json({ message: "Letter not found" });
    }

    res.json(letter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addRemark = async (req, res) => {
  const { id } = req.params;
  const { remark, userName } = req.body;

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedRemark = `By ${userName} on ${currentDate}: ${remark}`;

  try {
    const updatedLetter = await prisma.letter.update({
      where: { id: id },
      data: {
        remarks: {
          push: formattedRemark,
        },
      },
    });

    res.status(200).json({
      status: "ok",
      message: "Remark added successfully.",
      letter: updatedLetter,
    });
  } catch (error) {
    console.error("Error adding remark:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while adding the remark.",
    });
  }
};
