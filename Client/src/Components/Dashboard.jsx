import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MachineCard from "./MachineCard";
import MachineDetail from "./MachineDetail";

import { fetchMachines } from "../redux/machineSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const { machines, loading, error } = useSelector(
    (state) => state.machines
  );

  const [selectedMachineId, setSelectedMachineId] = useState(null);

  // Search and filter states
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");


  const selectedMachine = machines.find(
    (machine) => machine.id === selectedMachineId
  );


  useEffect(() => {
    dispatch(fetchMachines());
  }, [dispatch]);


  // Filter machines from Redux data
  const filteredMachines = machines.filter((machine) => {

    const matchesSearch = machine.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      machine.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });


  if (loading) {
    return <h3 className="text-center">Loading...</h3>;
  }


  if (error) {
    return (
      <h3 className="text-center text-danger">
        {error}
      </h3>
    );
  }


  return (
    <div className="container py-4">

      <h1 className="text-center mb-5 fw-bold">
        IOT Machine Dashboard
      </h1>


      {/* Search and Filter */}
      <div className="row mb-4">

        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search machine name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>


        <div className="col-md-6">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">
              All Status
            </option>

            <option value="running">
              Running
            </option>

            <option value="idle">
              Idle
            </option>

            <option value="fault">
              Fault
            </option>

          </select>
        </div>

      </div>



      <div className="row g-4">

        {filteredMachines.map((machine) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            onViewDetails={setSelectedMachineId}
          />
        ))}

      </div>



      {selectedMachine && (
        <MachineDetail
          machine={selectedMachine}
          onClose={() => setSelectedMachineId(null)}
        />
      )}

    </div>
  );
}

export default Dashboard;