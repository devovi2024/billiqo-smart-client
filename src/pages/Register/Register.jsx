import { useState } from "react";
import { useRegister } from "../../hooks/useReg";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = useRegister(() => {
    navigate("/login");
  });

  return (
    <div className="center">
      <div className="card">
        <h2>Register</h2>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

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

        <button onClick={() => register.mutate(form)}>
          {register.isPending ? "Loading..." : "Register"}
        </button>
      </div>
    </div>
  );
}