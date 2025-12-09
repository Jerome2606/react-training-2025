// Form.tsx - Formulaire avec état
import { useState } from "react";

// Type pour les données du formulaire
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  newsletter: boolean;
}

// État initial
const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  age: 0,
  newsletter: false,
};

export const Form = () => {
  // État unique pour tout le formulaire
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  // Handler générique pour tous les champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      // Gère les différents types d'input
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div>
        <h3>Merci {formData.firstName}!</h3>
        <p>Email: {formData.email}</p>
        <button onClick={handleReset}>Nouveau formulaire</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Prénom:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Nom:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Âge:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min={0}
          />
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          S'inscrire à la newsletter
        </label>
      </div>

      <div style={{ marginTop: "16px" }}>
        <button type="submit">Envoyer</button>
        <button type="button" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>
    </form>
  );
};
