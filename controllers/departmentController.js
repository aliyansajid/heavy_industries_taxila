const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createDepartment = async (req, res) => {
  const { name, description, employees } = req.body;

  try {
    const newDepartment = await prisma.department.create({
      data: {
        name,
        description,
        employees,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Department created successfully.",
      department: newDepartment,
    });
  } catch (error) {
    console.error("Error creating department: ", error);

    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the department.",
    });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();

    const result = await Promise.all(
      departments.map(async (department) => {
        const employeeUsers = await prisma.user.findMany({
          where: {
            id: { in: department.employees },
          },
          select: {
            id: true,
            name: true,
          },
        });

        return {
          id: department.id,
          name: department.name,
          employees: employeeUsers,
        };
      })
    );

    res.status(200).json({
      status: "success",
      departments: result,
    });
  } catch (error) {
    console.error("Error fetching departments: ", error);

    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching departments.",
    });
  }
};
