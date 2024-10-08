const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createDraft = async (req, res) => {
  const { draft, subject, attachment, createdBy, letterId } = req.body;
  const filePath = req.file.path;

  try {
    const newDraft = await prisma.draft.create({
      data: {
        draft,
        subject,
        filePath,
        attachment,
        createdBy,
      },
    });

    await prisma.letter.update({
      where: { id: letterId },
      data: {
        drafts: { push: newDraft.id },
      },
    });

    res.status(201).json({
      message: "Draft created successfully.",
      draft: newDraft,
    });
  } catch (error) {
    console.error("Error creating draft: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the draft." });
  }
};

exports.getDraftById = async (req, res) => {
  const { id } = req.params;

  try {
    const draft = await prisma.draft.findUnique({
      where: { id },
    });

    if (!draft) {
      return res.status(404).json({ message: "Draft not found" });
    }

    res.json(draft);
  } catch (error) {
    console.error("Error fetching draft: ", error);
    res.status(500).json({ error: "An error occurred while fetching draft." });
  }
};
