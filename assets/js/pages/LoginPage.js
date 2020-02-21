import React, { Fragment, useState, useContext } from 'react';
import AuthAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';

const LoginPage = ({ history }) => {

  const { setIsAuthenticated } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");

  // Gestion des champs
  const handleChange = ({ target }) => {
    const {value, name} = target;

    setCredentials({...credentials, [name]: value})
  };

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await AuthAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      history.replace("/customers");
    } catch(error) {
      setError("Identifiants incorrects");
    }
  };


  return (
    <Fragment>
      <h1>Connexion à l'application</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Adresse email</label>
          <input 
          value={credentials.username}
          onChange={handleChange}
          className={"form-control" + (error && " is-invalid")}
          type="email"
          placeholder="Adresse email de connexion"
          name="username"
          id="username"
          />
          {error && <p className="invalid-feedback">{error}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
          value={credentials.password}
          onChange={handleChange}
          className="form-control"
          type="password"
          autoComplete="on"
          placeholder="Mot de passe"
          name="password"
          id="password"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-success">Connexion</button>
        </div>
      </form>
    </Fragment>
  )
}

export default LoginPage;
