import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  Button,
} from "@mui/material";

function StudentCard({ student, onEdit, onDelete }) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        backgroundColor: "rgba(15, 23, 42, 0.8)",
        borderColor: "rgba(148, 163, 184, 0.2)",
        boxShadow: "0 8px 20px rgba(2, 6, 23, 0.5)",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ color: "var(--text-h)" }}>
          {student.firstName} {student.lastName}
        </Typography>
        <Typography sx={{ color: "var(--muted)" }}>{student.title}</Typography>
        <Typography sx={{ mb: 1, color: "var(--muted)" }}>
          {student.location}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: "var(--text)" }}>
          {student.bio}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle2" sx={{ mb: 1, color: "var(--text-h)" }}>
          Skills
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {student.skills.map((skill) => (
            <Chip
              key={skill.id}
              label={`${skill.name} (${skill.level})`}
              size="small"
              sx={{
                backgroundColor: "rgba(56, 189, 248, 0.15)",
                color: "var(--text-h)",
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>

        <Typography
          variant="subtitle2"
          sx={{ mt: 2, mb: 1, color: "var(--text-h)" }}
        >
          Projects
        </Typography>
        <Stack spacing={1}>
          {student.projects.map((project) => (
            <Typography
              key={project.id}
              variant="body2"
              sx={{ color: "var(--text)" }}
            >
              <strong>{project.name}</strong> – {project.tech} –{" "}
              {project.description}
            </Typography>
          ))}
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onEdit(student)}
          >
            Modifier
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete(student.id)}
          >
            Supprimer
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default StudentCard;
