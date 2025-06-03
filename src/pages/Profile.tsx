import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type User = {
  id: string,
  firstName: string,
  lastName: string,
}

const Profile = () => {

  const [user, setUser] = useState<User | null>(null);
  const [_error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/users/get-user", {
      credentials:"include",
    })
      .then(res => {
        if(!res) throw new Error("Erreur lors de la récupération des données");
        return res.json();
      })
      .then(data => {
        setUser(data.data.user);
      })
      .catch((err) => {
        setError(err);
      })
  }, []);


  return <>
  {user && (
    <h2>Profile {user.firstName}</h2>
  )}
  <Link to="/2fa">F2A</Link>
  </>;
};

export default Profile;
