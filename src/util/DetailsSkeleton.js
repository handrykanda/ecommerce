import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  ...theme.globalStyles,
  mainContainer: {
    margin: "auto",
    maxWidth: "1000px",
    paddingTop: 20,
  },
  detailsButtons: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "center",
  },
  description: {
    height: 200,
    justifyContent: "center",
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item sm={12} xs={12}>
        <Grid
          style={{ marginBottom: 20, backgroundColor: "#fff" }}
          container
          spacing={10}
        >
          <Grid item md={6} sm={6} xs={12}>
            <Skeleton
              animation="wave"
              height={350}
              width={150}
              style={{
                marginBottom: 20,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: -65,
              }}
            />
            <div className={classes.detailsButtons}>
              <Skeleton
                animation="wave"
                height={30}
                width="30%"
                style={{
                  marginBottom: 20,
                  marginRight: 30,
                }}
              />
              <Skeleton
                animation="wave"
                height={30}
                width="30%"
                style={{ marginBottom: 20 }}
              />
            </div>
          </Grid>
          <Grid style={{ alignItems: "center" }} item sm={6} xs={12} md={6}>
            <Typography align="left" variant="h1" component="h1" gutterBottom>
              <Skeleton
                animation="wave"
                height={20}
                width="30%"
                style={{ marginBottom: 20 }}
              />
            </Typography>
            <Typography align="left" variant="h3" component="h3" gutterBottom>
              <Skeleton
                animation="wave"
                height={10}
                width="40%"
                style={{ marginBottom: 80 }}
              />
            </Typography>
            <hr className={classes.visibleSeparator} />
            <Typography align="left" variant="h6" component="h6" gutterBottom>
              <Skeleton
                animation="wave"
                height={10}
                width="30%"
                style={{ marginBottom: 20, marginTop: 80 }}
              />
            </Typography>
          </Grid>
          <Grid item sm={12} md={12} xs={12}>
            <Typography variant="h5" component="h5" gutterBottom>
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="60%"
                style={{
                  marginBottom: 30,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </Typography>
            <Typography align="left" variant="h6" component="h6" gutterBottom>
              <Skeleton
                animation="wave"
                height={30}
                width="30%"
                style={{
                  marginBottom: 20,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </Typography>
            <Typography variant="h5" component="h5" gutterBottom>
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="50%"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: 30,
                }}
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
