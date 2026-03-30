// src/data/students.js
const students = [
  {
    id: 1,
    firstName: "Shadow",
    lastName: "The Hedgehog",
    title: "Hero of the world",
    location: "Mobotropolis",
    bio: "Shadow the Hedgehog is a fictional character from the Sonic the Hedgehog series.",
    skills: [
      { id: 1, name: "React", level: "advanced" },
      { id: 2, name: "JavaScript", level: "intermediate" },
    ],
    projects: [
      {
        id: 1,
        name: "Portfolio",
        tech: "React",
        description: "Portfolio web réalisé en cours.",
      },
    ],
  },
  {
    id: 2,
    firstName: "Amy",
    lastName: "Rose",
    title: "Front-end developer",
    location: "Lyon",
    bio: "Passionnée par l’UI et le design.",
    skills: [
      { id: 1, name: "CSS", level: "advanced" },
      { id: 2, name: "Figma", level: "intermediate" },
    ],
    projects: [
      {
        id: 1,
        name: "Design System",
        tech: "CSS",
        description: "Composants réutilisables.",
      },
    ],
  },
  {
    id: 3,
    firstName: "Tails",
    lastName: "Prower",
    title: "Full-stack developer",
    location: "Bordeaux",
    bio: "Aime automatiser et construire des outils utiles.",
    skills: [
      { id: 1, name: "Node.js", level: "advanced" },
      { id: 2, name: "React", level: "intermediate" },
      { id: 3, name: "SQL", level: "intermediate" },
    ],
    projects: [
      {
        id: 1,
        name: "Task Tracker",
        tech: "React",
        description: "Gestion de tâches avec filtres et statuts.",
      },
      {
        id: 2,
        name: "API Produits",
        tech: "Node.js",
        description: "CRUD sécurisé avec authentification.",
      },
    ],
  },
  {
    id: 4,
    firstName: "Knuckles",
    lastName: "The Echidna",
    title: "Back-end developer",
    location: "Marseille",
    bio: "Spécialisé en performance et architecture.",
    skills: [
      { id: 1, name: "Python", level: "advanced" },
      { id: 2, name: "Docker", level: "intermediate" },
      { id: 3, name: "PostgreSQL", level: "intermediate" },
    ],
    projects: [
      {
        id: 1,
        name: "Monitoring",
        tech: "Python",
        description: "Collecte et analyse de métriques.",
      },
    ],
  },
  {
    id: 5,
    firstName: "Rouge",
    lastName: "The Bat",
    title: "UX/UI designer",
    location: "Toulouse",
    bio: "Crée des interfaces élégantes et accessibles.",
    skills: [
      { id: 1, name: "Figma", level: "advanced" },
      { id: 2, name: "CSS", level: "advanced" },
      { id: 3, name: "Prototyping", level: "intermediate" },
    ],
    projects: [
      {
        id: 1,
        name: "Landing Page",
        tech: "CSS",
        description: "Landing page responsive pour un produit SaaS.",
      },
    ],
  },
  {
    id: 6,
    firstName: "Blaze",
    lastName: "The Cat",
    title: "Front-end developer",
    location: "Nantes",
    bio: "Focus sur les apps rapides et réactives.",
    skills: [
      { id: 1, name: "TypeScript", level: "intermediate" },
      { id: 2, name: "React", level: "advanced" },
      { id: 3, name: "Accessibility", level: "intermediate" },
    ],
    projects: [
      {
        id: 1,
        name: "CVthèque",
        tech: "React",
        description: "Gestion de profils avec filtres dynamiques.",
      },
    ],
  },
];

export default students;
