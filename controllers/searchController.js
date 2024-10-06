const prisma = require("@prisma/client");

const prismaClient = new prisma.PrismaClient();

exports.searchLetters = async (req, res) => {
  const { search, field } = req.query;

  if (!search || !field) {
    return res
      .status(400)
      .json({ error: "Search term and field are required" });
  }

  try {
    const queryField = field === "Subject" ? "subject" : "reference";
    const letters = await prismaClient.letter.findMany({
      where: {
        [queryField]: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    res.status(200).json(letters);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
