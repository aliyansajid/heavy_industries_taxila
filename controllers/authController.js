const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.loginUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "Invalid username" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    if (user.role !== role) {
      return res.status(403).json({ error: "Invalid role" });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("Login failed: ", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while loging user.",
    });
  }
};
