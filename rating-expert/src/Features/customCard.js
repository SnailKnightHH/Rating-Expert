import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles, mergeClasses } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
  },
}));

export default function CustomCard({ img, title, altText }) {
  const classes = useStyles();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={`/main/${title}`}>
        <CardMedia component="img" height="140" image={img} alt={altText} />
        <CardContent className={classes.cardStyle}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
