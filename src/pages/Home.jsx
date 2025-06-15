import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h1 className="mb-4">Welcome to Your Contact Manager</h1>

      <p className="mb-4 text-muted">
        Manage, add, and edit your contacts easily using the buttons below.
      </p>

      <div>
        <button
          className="btn btn-primary me-3"
          onClick={() => navigate("/contacts")}
        >
          View Contacts
        </button>

        <button
          className="btn btn-success"
          onClick={() => navigate("/add-contact")}
        >
          Add New Contact
        </button>
      </div>
    </div>
  );
};
