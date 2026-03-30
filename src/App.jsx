import "./App.css";
import Header from "./components/base/Header";
import Footer from "./components/base/Footer";
import StudentList from "./components/students/StudentList";
import StudentForm from "./components/forms/StudentForm";
import StudentFilters from "./components/filters/StudentFilters";
import initialStudents from "./data/students";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("all");
  const [students, setStudents] = useState(initialStudents);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    title: "",
    location: "",
    bio: "",
    skillName: "",
    skillLevel: "beginner",
    skills: [],
    projectName: "",
    projectTech: "",
    projectDesc: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateStudent = (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "title",
      "location",
      "bio",
      "projectName",
      "projectTech",
      "projectDesc",
    ];

    const hasEmpty = requiredFields.some((key) => form[key].trim() === "");
    if (hasEmpty) return;
    if (form.skills.length === 0) return;

    const nextStudent = {
      id: editId ?? Date.now(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      title: form.title.trim(),
      location: form.location.trim(),
      bio: form.bio.trim(),
      skills: form.skills.map((s, index) => ({
        id: index + 1,
        name: s.name,
        level: s.level,
      })),
      projects: [
        {
          id: 1,
          name: form.projectName.trim(),
          tech: form.projectTech.trim(),
          description: form.projectDesc.trim(),
        },
      ],
    };

    if (editId) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editId ? nextStudent : s)),
      );
    } else {
      setStudents((prev) => [nextStudent, ...prev]);
    }

    setForm({
      firstName: "",
      lastName: "",
      title: "",
      location: "",
      bio: "",
      skillName: "",
      skillLevel: "beginner",
      skills: [],
      projectName: "",
      projectTech: "",
      projectDesc: "",
    });
    setEditId(null);
  };

  const handleEditStudent = (student) => {
    setEditId(student.id);
    setForm({
      firstName: student.firstName,
      lastName: student.lastName,
      title: student.title,
      location: student.location,
      bio: student.bio,
      skillName: "",
      skillLevel: "beginner",
      skills: (student.skills ?? []).map((s) => ({
        name: s.name,
        level: s.level,
      })),
      projectName: student.projects?.[0]?.name ?? "",
      projectTech: student.projects?.[0]?.tech ?? "",
      projectDesc: student.projects?.[0]?.description ?? "",
    });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({
      firstName: "",
      lastName: "",
      title: "",
      location: "",
      bio: "",
      skillName: "",
      skillLevel: "beginner",
      skills: [],
      projectName: "",
      projectTech: "",
      projectDesc: "",
    });
  };

  const handleAddSkill = () => {
    const name = form.skillName.trim();
    if (name === "") return;
    setForm((prev) => ({
      ...prev,
      skills: [...prev.skills, { name, level: prev.skillLevel }],
      skillName: "",
      skillLevel: "beginner",
    }));
  };

  const handleRemoveSkill = (index) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteStudent = (id) => {
    const ok = window.confirm("Supprimer cet étudiant ?");
    if (!ok) return;
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      student.firstName.toLowerCase().includes(query) ||
      student.lastName.toLowerCase().includes(query) ||
      student.location.toLowerCase().includes(query);

    const matchesLevel =
      levelFilter === "all" ||
      student.skills.some((s) => s.level === levelFilter);

    const matchesSkill =
      skillFilter === "all" ||
      student.skills.some((s) => s.name === skillFilter);

    const matchesTech =
      techFilter === "all" ||
      student.projects.some((p) => p.tech === techFilter);

    return matchesSearch && matchesLevel && matchesSkill && matchesTech;
  });

  return (
    <main className="app">
      <Header />

      <StudentForm
        form={form}
        onChange={handleFormChange}
        onAddSkill={handleAddSkill}
        onRemoveSkill={handleRemoveSkill}
        onSubmit={handleAddOrUpdateStudent}
        editId={editId}
        onCancel={handleCancelEdit}
      />

      <StudentFilters
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        levelFilter={levelFilter}
        skillFilter={skillFilter}
        techFilter={techFilter}
        onLevelChange={(e) => setLevelFilter(e.target.value)}
        onSkillChange={(e) => setSkillFilter(e.target.value)}
        onTechChange={(e) => setTechFilter(e.target.value)}
      />

      <StudentList
        students={filteredStudents}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />
      <Footer />
    </main>
  );
}

export default App;
