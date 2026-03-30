import { Grid } from "@mui/material";
import StudentCard from "./StudentCard";

function StudentList({ students, onEdit, onDelete }) {
  return (
    <Grid container spacing={2}>
      {students.map((student) => (
        <Grid key={student.id} item xs={12} md={6} lg={4}>
          <StudentCard
            student={student}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default StudentList;
