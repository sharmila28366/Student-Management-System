import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/students/";

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    const response = await fetch(
      `${API_URL}?search=${encodeURIComponent(search)}`
    );
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.department || !form.year || !form.phone) {
    alert("Please fill all fields");
    return;
  }

  if (form.year < 1 || form.year > 4) {
    alert("Year must be between 1 and 4");
    return;
  }

  if (form.phone.length !== 10) {
    alert("Phone number must be 10 digits");
    return;
  }

  const method = editingId ? "PUT" : "POST";
  const url = editingId ? `${API_URL}${editingId}/` : API_URL;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        year: Number(form.year),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save student");
    }

    setForm({
      name: "",
      email: "",
      department: "",
      year: "",
      phone: "",
    });

    setEditingId(null);
    fetchStudents();

    alert(editingId ? "Student updated successfully!" : "Student added successfully!");
  } catch (error) {
    alert("Something went wrong. Please try again.");
  }
};

  const handleEdit = (student) => {
    setEditingId(student.id);

    setForm({
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year,
      phone: student.phone,
    });
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
    });

    fetchStudents();
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <form onSubmit={handleSubmit} className="student-form">
        <input
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <input
          name="year"
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <input
        className="search"
        placeholder="Search student by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Year</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.department}</td>
              <td>{student.year}</td>
              <td>{student.phone}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;