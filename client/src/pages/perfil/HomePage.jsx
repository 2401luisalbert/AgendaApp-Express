import ModalComponent from "../../Components/homeProfile/ModalComponent";
import { useAuth } from "../../context/authContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <ul>
        {Object.entries(user).map(([key, value]) => (
          <li key={key}>
            <strong>{key}: </strong>
            {value.toString()}
          </li>
        ))}
      </ul>
      <ModalComponent user={user} />
    </div>
  );
};

export default HomePage;
