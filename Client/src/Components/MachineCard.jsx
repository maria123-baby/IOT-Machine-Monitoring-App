import StatusBadge from "./StatusBadge";

function MachineCard({ machine, onViewDetails }) {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="card shadow-lg border-0 rounded-4 h-100">

        <div className="card-header bg-dark text-white text-center">
          <h5>{machine.name}</h5>
        </div>

        <div className="card-body">

          <StatusBadge status={machine.status} />

          <p className="mt-3">
            <strong>Temperature</strong>
          </p>

          <div className="progress mb-3">
            <div
              className="progress-bar bg-danger"
              style={{ width: `${machine.temperature}%` }}
            >
              {machine.temperature}°C
            </div>
          </div>

          <p>
            <strong>Vibration</strong>
          </p>

          <div className="progress mb-3">
            <div
              className="progress-bar bg-info"
              style={{ width: `${machine.vibration * 10}%` }}
            >
              {machine.vibration}
            </div>
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={() => {
              onViewDetails(machine.id);
            }}
          >
            View Details
          </button>

        </div>

        <div className="card-footer text-center">
          Machine ID : {machine.id}
        </div>

      </div>
    </div>
  );
}

export default MachineCard;