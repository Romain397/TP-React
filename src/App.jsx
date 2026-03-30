import "./App.css";
import Header from "./components/base/Header";
import Footer from "./components/base/Footer";
import StudentList from "./components/students/StudentList";
import initialStudents from "./data/students";
import { useState } from "react";
import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
} from "@mui/material";

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

      <Stack
        component="form"
        onSubmit={handleAddOrUpdateStudent}
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        useFlexGap
        flexWrap="wrap"
        sx={{ mb: 2 }}
      >
        <TextField
          label="Prénom"
          name="firstName"
          value={form.firstName}
          onChange={handleFormChange}
          fullWidth
          required
        />
        <TextField
          label="Nom"
          name="lastName"
          value={form.lastName}
          onChange={handleFormChange}
          fullWidth
          required
        />
        <TextField
          label="Poste recherché"
          name="title"
          value={form.title}
          onChange={handleFormChange}
          fullWidth
          required
        />
        <TextField
          label="Localisation"
          name="location"
          value={form.location}
          onChange={handleFormChange}
          fullWidth
          required
        />
        <TextField
          label="Bio"
          name="bio"
          value={form.bio}
          onChange={handleFormChange}
          fullWidth
          required
        />
        <TextField
          label="Compétence"
          name="skillName"
          value={form.skillName}
          onChange={handleFormChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Niveau</InputLabel>
          <Select
            name="skillLevel"
            value={form.skillLevel}
            label="Niveau"
            onChange={handleFormChange}
          >
            <MenuItem value="beginner">Débutant</MenuItem>
            <MenuItem value="intermediate">Intermédiaire</MenuItem>
            <MenuItem value="advanced">Avancé</MenuItem>
          </Select>
        </FormControl>
        <Button type="button" variant="outlined" onClick={handleAddSkill}>
          Ajouter compétence
        </Button>
        {form.skills.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {form.skills.map((skill, index) => (
              <Chip
                key={`${skill.name}-${index}`}
                label={`${skill.name} (${skill.level})`}
                onDelete={() => handleRemoveSkill(index)}
              />
            ))}
          </Stack>
        )}
        <TextField
          label="Projet"
          name="projectName"
          value={form.projectName}
          onChange={handleFormChange}
          fullWidth
          required
        />
        <TextField
          label="Tech projet"
          name="projectTech"
          value={form.projectTech}
          onChange={handleFormChange}
          fullWidth
          required
        />
        <TextField
          label="Description projet"
          name="projectDesc"
          value={form.projectDesc}
          onChange={handleFormChange}
          fullWidth
          required
        />
        <Button type="submit" variant="contained">
          {editId ? "Modifier" : "Ajouter"}
        </Button>
        {editId && (
          <Button variant="text" onClick={handleCancelEdit}>
            Annuler
          </Button>
        )}
      </Stack>

      <div className="search">
        <TextField
          label="Rechercher un étudiant"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Niveau de compétence</InputLabel>
          <Select
            value={levelFilter}
            label="Niveau de compétence"
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <MenuItem value="all">Tous</MenuItem>
            <MenuItem value="advanced">Avancé</MenuItem>
            <MenuItem value="intermediate">Intermédiaire</MenuItem>
            <MenuItem value="beginner">Débutant</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Compétence</InputLabel>
          <Select
            value={skillFilter}
            label="Compétence"
            onChange={(e) => setSkillFilter(e.target.value)}
          >
            <MenuItem value="all">Toutes</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Node.js">Node.js</MenuItem>
            <MenuItem value="CSS">CSS</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="JavaScript">JavaScript</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Technologie de projet</InputLabel>
          <Select
            value={techFilter}
            label="Technologie de projet"
            onChange={(e) => setTechFilter(e.target.value)}
          >
            <MenuItem value="all">Toutes</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Node.js">Node.js</MenuItem>
            <MenuItem value="CSS">CSS</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="JavaScript">JavaScript</MenuItem>
          </Select>
        </FormControl>
      </Stack>

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
