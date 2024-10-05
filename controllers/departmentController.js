const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createDepartment = async (req, res) => {
  const { name, description, employees } = req.body;
  try {
    const newDepartment = await prisma.department.create({
      data: {
        name,
        description,
      },
    });

    const departmentEmployees = await Promise.all(
      employees.map(async (employeeId) => {
        return prisma.departmentEmployees.create({
          data: {
            departmentId: newDepartment.id,
            userId: employeeId,
          },
        });
      })
    );

    res.status(201).json({
      department: newDepartment,
      employees: departmentEmployees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating department" });
  }
};
