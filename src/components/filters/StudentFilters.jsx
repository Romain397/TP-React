import { TextField, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function StudentFilters({
  search,
  onSearchChange,
  levelFilter,
  skillFilter,
  techFilter,
  onLevelChange,
  onSkillChange,
  onTechChange,
}) {
  return (
    <>
      <div className="search">
        <TextField
          label="Rechercher un étudiant"
          variant="outlined"
          fullWidth
          value={search}
          onChange={onSearchChange}
        />
      </div>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Niveau de compétence</InputLabel>
          <Select
            value={levelFilter}
            label="Niveau de compétence"
            onChange={onLevelChange}
          >
            <MenuItem value="all">Tous</MenuItem>
            <MenuItem value="advanced">Avancé</MenuItem>
            <MenuItem value="intermediate">Intermédiaire</MenuItem>
            <MenuItem value="beginner">Débutant</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Compétence</InputLabel>
          <Select value={skillFilter} label="Compétence" onChange={onSkillChange}>
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
          <Select value={techFilter} label="Technologie de projet" onChange={onTechChange}>
            <MenuItem value="all">Toutes</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Node.js">Node.js</MenuItem>
            <MenuItem value="CSS">CSS</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="JavaScript">JavaScript</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}

export default StudentFilters;
