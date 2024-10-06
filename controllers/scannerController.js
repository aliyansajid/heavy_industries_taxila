const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createScannerEntry = async (req, res) => {
  const { letterId, departmentId, sendTo, sendBy, subject, reference } =
    req.body;

  try {
    const scannerEntry = await prisma.scanner.create({
      data: {
        letter: {
          connect: { id: letterId },
        },
        department: {
          connect: { id: departmentId },
        },
        sendTo,
        sendBy,
        subject,
        reference,
      },
    });

    await prisma.user.updateMany({
      where: {
        id: { in: sendTo },
      },
      data: {
        inbox: {
          push: letterId,
        },
      },
    });

    res.status(200).json({
      status: "ok",
      message: "Scanner entry created and inbox updated.",
      scannerEntry,
    });
  } catch (error) {
    console.error("Error creating scanner entry: ", error);
    res.status(500).json({
      status: "error",
      message: "Error occurred while creating scanner entry.",
    });
  }
};
