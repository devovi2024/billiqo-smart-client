import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = useLogin((data) => {
    localStorage.setItem("token", data.token);
    navigate("/");
  });

  return (
    <div className="center">
      <div className="card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={() => login.mutate(form)}>
          {login.isPending ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}