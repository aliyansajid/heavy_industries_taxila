const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createDraft = async (req, res) => {
  const { draft, subject, attachments, createdBy, letterId } = req.body;
  const filePath = req.file.path;

  try {
    const newDraft = await prisma.draft.create({
      data: {
        draft,
        subject,
        filePath,
        attachments: JSON.parse(attachments),
        createdBy,
      },
    });

    await prisma.letter.update({
      where: { id: letterId },
      data: {
        drafts: { push: newDraft.id },
      },
    });

    res.status(201).json(newDraft);
  } catch (error) {
    console.error("Error creating draft: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
