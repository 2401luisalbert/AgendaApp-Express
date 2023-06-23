import { useAuth } from "../../context/authContext";

const HomePage = () => {
  const { user } = useAuth();
  console.log(user);

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
    </div>
  );
};

export default HomePage;
