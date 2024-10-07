const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createScanner = async (req, res) => {
  const { letterId, departmentId, sendTo, sendBy, subject, reference } =
    req.body;

  try {
    const existingScanner = await prisma.scanner.findFirst({
      where: { letterId: letterId },
    });

    if (existingScanner) {
      const updatedScanner = await prisma.scanner.update({
        where: {
          id: existingScanner.id,
        },
        data: {
          departmentId,
          sendTo,
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
        message: "Scanner entry updated and inbox updated.",
        scannerEntry: updatedScanner,
      });
    } else {
      // If no scanner entry exists for this letterId, return an error
      res.status(404).json({
        status: "error",
        message: "No scanner entry found for this letter.",
      });
    }
  } catch (error) {
    console.error("Error occurred while updating scanner entry: ", error);
    res.status(500).json({
      status: "error",
      message: "Error occurred while creating or updating scanner entry.",
    });
  }
};
