function StatusBadge({ status }) {

  const getBadge = () => {
    switch (status.toLowerCase()) {
      case "running":
        return "bg-success";

      case "idle":
        return "bg-warning text-dark";

      case "fault":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  return (
    <p>
      <strong>Status</strong>
      <br />

      <span className={`badge ${getBadge()} px-3 py-2`}>
        {status}
      </span>
    </p>
  );
}

export default StatusBadge;