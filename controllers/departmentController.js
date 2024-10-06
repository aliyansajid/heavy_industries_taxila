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
      status: "success",
      message: "Department created successfully.",
      department: newDepartment,
      employees: departmentEmployees,
    });
  } catch (error) {
    console.error("Error creating department: ", error);

    res.status(500).json({
      status: "error",
      message: "An error occurred while creating department.",
    });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        employees: {
          include: {
            user: true,
          },
        },
      },
    });

    const result = departments.map((department) => ({
      id: department.id,
      name: department.name,
      employees: department.employees.map((emp) => ({
        id: emp.user.id,
        name: emp.user.name,
      })),
    }));

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
