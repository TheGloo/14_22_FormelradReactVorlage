import { useState } from "react";
import "../css/mvp.css";
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";

export default function Formelrad() {
  const [values, setValues] = useState({
    u: 10,
    i: 2,
    r: "",
    p: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");

    // Alle Eingaben zuerst in Floats konvertieren (falls nicht leer)
    const u = values.u !== "" ? parseFloat(values.u) : "";
    const i = values.i !== "" ? parseFloat(values.i) : "";
    const r = values.r !== "" ? parseFloat(values.r) : "";
    const p = values.p !== "" ? parseFloat(values.p) : "";

    if (u === "" && i === "") {
      // calculate u and i
      setValues((values) => ({
        ...values,
        u: Math.sqrt(p * r).toFixed(2),
        i: Math.sqrt(p / r).toFixed(2),
      }));
    } else if (u === "" && r === "") {
      // calculate u and r
      setValues((values) => ({
        ...values,
        u: (p / i).toFixed(2),
        r: (p / (i * i)).toFixed(2),
      }));
    } else if (u === "" && p === "") {
      // calculate u and p
      setValues((values) => ({
        ...values,
        u: (i * r).toFixed(2),
        p: (i * i * r).toFixed(2),
      }));
    } else if (i === "" && r === "") {
      // calculate i and r
      setValues((values) => ({
        ...values,
        i: (p / u).toFixed(2),
        r: ((u * u) / p).toFixed(2),
      }));
    } else if (i === "" && p === "") {
      // calculate i and p
      setValues((values) => ({
        ...values,
        i: (u / r).toFixed(2),
        p: ((u * u) / r).toFixed(2),
      }));
    }
  };

  return (
    <>
      <section>
        <header>
          <h2>Formelrad</h2>
          <img src={formelrad} width="200" alt="Formelrad" />
        </header>
        <form onSubmit={handleSubmit}>
          <InputField
            color={"black"}
            value={values.u}
            label="Spannung"
            handleChange={(e) =>
              setValues((values) => ({ ...values, u: e.target.value }))
            }
          />
          <InputField
            color={"black"}
            value={values.i}
            label="Stromstärke"
            handleChange={(e) =>
              setValues((values) => ({ ...values, i: e.target.value }))
            }
          />
          <InputField
            color={"black"}
            value={values.r}
            label="Widerstand"
            handleChange={(e) =>
              setValues((values) => ({ ...values, r: e.target.value }))
            }
          />
          <InputField
            color={"black"}
            value={values.p}
            label="Leistung"
            handleChange={(e) =>
              setValues((values) => ({ ...values, p: e.target.value }))
            }
          />
          <button type="submit">Calculate</button>
        </form>
      </section>
    </>
  );
}
