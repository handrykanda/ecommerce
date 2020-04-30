import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  ...theme.globalStyles,
  root: {
    display: "flex",
    marginBottom: 20,
    padding: 20,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    display: "flex",
    flex: "4",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "100%",
    flex: "3",
  },
  controls: {
    flex: "4",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  const content = Array.from({ length: 4 }).map((item, index) => (
    <Card key={index} className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography align="center" variant="body2" color="textSecondary">
            <Skeleton
              animation="wave"
              height={10}
              width="30%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              width="40%"
              height={10}
              style={{ marginBottom: 20 }}
            />
          </Typography>
          <Typography align="center" variant="body2" color="textSecondary">
            <Skeleton animation="wave" height={5} style={{ marginBottom: 5 }} />
            <Skeleton animation="wave" height={5} style={{ marginBottom: 5 }} />
            <Skeleton animation="wave" height={5} style={{ marginBottom: 5 }} />
            <Skeleton animation="wave" height={5} style={{ marginBottom: 5 }} />
            <Skeleton
              animation="wave"
              height={5}
              width="60%"
              style={{ marginBottom: 30 }}
            />
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Typography align="center" variant="body2" color="textSecondary">
            <Skeleton
              animation="wave"
              height={40}
              width="40%"
              style={{ marginBottom: 50 }}
            />
            <Skeleton animation="wave" width="40%" height={40} />
          </Typography>
        </div>
      </div>
      <CardMedia className={classes.cover}>
        <Skeleton
          animation="wave"
          height={350}
          width={150}
          style={{ marginTop: -50, marginRight: "auto", marginLeft: "auto" }}
        />
      </CardMedia>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
}
