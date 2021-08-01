import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "100px auto",
    padding: "10px 0 ",
  },
  expand: {
    margin: "auto",
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container maxWidth={false}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h4" component="h1">
            Admin Console
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            Please sign in to continue to Admin Console.
          </Typography>
          <SignInForm />
        </CardContent>
        <CardActions disableSpacing>
          <Button
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            Create new account
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h6">Sign Up</Typography>
            <SignUpForm />
          </CardContent>
        </Collapse>
      </Card>
      <Box my={2}>
        <Typography variant="body1" color="textSecondary" align="center">
          LightUpTheProject © 2021
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center">
          Created by TJTHANAPAT
        </Typography>
      </Box>
    </Container>
  );
}
