const express = require("express");
const cors = require("cors");
const machinesData = require("./database/machines.json")
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/machines", (req, res) => {
  res.json(machinesData);
});

app.get("/api/machines/:id", (req, res) => {
  const id = req.params.id;

  const machine = machinesData.find(
    (machine) => machine.id === id
  );

  if (!machine) {
    return res.status(404).json({
      message: "Machine not found",
    });
  }

  res.json(machine);
});

app.patch("/api/machines/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  // Validate request body
  if (!status) {
    return res.status(400).json({
      message: "Status is required",
    });
  }

  const validStatuses = ["running", "idle", "fault"];

  if (!validStatuses.includes(status.toLowerCase())) {
    return res.status(400).json({
      message: "Invalid status value",
    });
  }

  const machine = machinesData.find(
    (machine) => machine.id === id
  );

  if (!machine) {
    return res.status(404).json({
      message: "Machine not found",
    });
  }

  // Update machine
  machine.status = status.toLowerCase();
  machine.lastUpdated = new Date().toISOString();

  res.json(machine);
});

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});