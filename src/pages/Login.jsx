import { useEffect, useState } from "react";
import { getQueryParams } from "../utils/queryParser";
import { appConfig } from "../config/appConfig";

function Login() {
  const [appInfo, setAppInfo] = useState({
    app: null,
    redirect: null,
  });

useEffect(() => {
  const params = getQueryParams();
  console.log("PARAMS:", params);
  setAppInfo(params);
}, []);

  const appData = appInfo.app ? appConfig[appInfo.app] : null;
console.log("Login Page Loaded");
console.log(appInfo);
  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* APP HEADER */}
        {appData && (
          <div style={styles.appHeader}>
            <h2>{appData.name}</h2>
            <p>Login to continue</p>
            <small>Requested by {appData.name}</small>
          </div>
        )}

        {!appData && (
          <div style={styles.appHeader}>
            <h2>OmniVerse</h2>
            <p>Login to continue</p>
          </div>
        )}

        {/* FORM */}
        <input placeholder="Email" style={styles.input} />
        <input placeholder="Password" type="password" style={styles.input} />

        <button style={styles.button}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  card: {
    width: "350px",
    padding: "20px",
    borderRadius: "10px",
    background: "#1e293b",
    color: "white",
    textAlign: "center",
  },
  appHeader: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;