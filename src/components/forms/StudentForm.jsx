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

function StudentForm({
  form,
  onChange,
  onAddSkill,
  onRemoveSkill,
  onSubmit,
  editId,
  onCancel,
}) {
  return (
    <Stack
      component="form"
      onSubmit={onSubmit}
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
        onChange={onChange}
        fullWidth
        required
      />
      <TextField
        label="Nom"
        name="lastName"
        value={form.lastName}
        onChange={onChange}
        fullWidth
        required
      />
      <TextField
        label="Poste recherché"
        name="title"
        value={form.title}
        onChange={onChange}
        fullWidth
        required
      />
      <TextField
        label="Localisation"
        name="location"
        value={form.location}
        onChange={onChange}
        fullWidth
        required
      />
      <TextField
        label="Bio"
        name="bio"
        value={form.bio}
        onChange={onChange}
        fullWidth
        required
      />
      <TextField
        label="Compétence"
        name="skillName"
        value={form.skillName}
        onChange={onChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Niveau</InputLabel>
        <Select
          name="skillLevel"
          value={form.skillLevel}
          label="Niveau"
          onChange={onChange}
        >
          <MenuItem value="beginner">Débutant</MenuItem>
          <MenuItem value="intermediate">Intermédiaire</MenuItem>
          <MenuItem value="advanced">Avancé</MenuItem>
        </Select>
      </FormControl>
      <Button type="button" variant="outlined" onClick={onAddSkill}>
        Ajouter compétence
      </Button>
      {form.skills.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {form.skills.map((skill, index) => (
            <Chip
              key={`${skill.name}-${index}`}
              label={`${skill.name} (${skill.level})`}
              onDelete={() => onRemoveSkill(index)}
            />
          ))}
        </Stack>
      )}
      <TextField
        label="Projet"
        name="projectName"
        value={form.projectName}
        onChange={onChange}
        fullWidth
        required
      />
      <TextField
        label="Tech projet"
        name="projectTech"
        value={form.projectTech}
        onChange={onChange}
        fullWidth
        required
      />
      <TextField
        label="Description projet"
        name="projectDesc"
        value={form.projectDesc}
        onChange={onChange}
        fullWidth
        required
      />
      <Button type="submit" variant="contained">
        {editId ? "Modifier" : "Ajouter"}
      </Button>
      {editId && (
        <Button variant="text" onClick={onCancel}>
          Annuler
        </Button>
      )}
    </Stack>
  );
}

export default StudentForm;
