const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const saltRounds = 10;

exports.createUser = async (req, res) => {
  const { name, username, designation, rank, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Username already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        designation,
        rank,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the user.",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
      },
    });

    res.status(200).json({
      status: "success",
      users: users,
    });
  } catch (error) {
    console.error("Error fetching users: ", error);

    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching users.",
    });
  }
};
