import { useDispatch } from "react-redux";
import { acknowledgeFault } from "../redux/machineSlice";
import StatusBadge from "./StatusBadge";

function MachineDetail({ machine, onClose }) {
  const dispatch = useDispatch();

  return (
    <div className="card mt-4 shadow">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4>{machine.name}</h4>

        <button
          className="btn btn-sm btn-secondary"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div className="card-body">
        <StatusBadge status={machine.status} />

        <p><strong>Machine ID:</strong> {machine.id}</p>
        <p><strong>Temperature:</strong> {machine.temperature}°C</p>
        <p><strong>Vibration:</strong> {machine.vibration}</p>
        <p><strong>Last Updated:</strong> {machine.lastUpdated}</p>

        {machine.status.toLowerCase() === "fault" && (
          <button
            className="btn btn-danger"
            onClick={() => dispatch(acknowledgeFault(machine.id))}
          >
            Acknowledge Fault
          </button>
        )}
      </div>
    </div>
  );
}

export default MachineDetail;