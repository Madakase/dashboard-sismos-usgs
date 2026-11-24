import { Box, Typography } from "@mui/material";

interface HeaderProps {
  titulo: string;
}

function Header({ titulo }: HeaderProps) {
  return (
    <Box component="header">
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          // Escritorio: titulo grande. Móvil: menor tamaño.
          fontSize: { xs: "1.25rem", md: "2.125rem" },
        }}
      >
        {titulo}
      </Typography>
    </Box>
  );
}

export default Header;