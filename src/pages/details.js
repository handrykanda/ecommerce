import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//redux
import { connect } from "react-redux";
import { getProduct, addToCart } from "../redux/actions/dataActions";
import { Link } from "react-router-dom";

//mui stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

//components
import DetailsSkeleton from "../util/DetailsSkeleton";

const styles = (theme) => ({
  ...theme.globalStyles,
  mainContainer: {
    margin: "90px auto",
    maxWidth: "1000px",
    paddingTop: 20,
    height: 500,
  },
  imgWrapper: {},
  detailsButtons: {
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "center",
  },
  description: {
    justifyContent: "center",
    marginBottom: 10,
  },
});

class details extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.getProduct(productId);
  }

  render() {
    const {
      classes,
      loading,
      UI,
      authenticated,
      incartProducts,
      product: {
        teaserText,
        screenDesc,
        description,
        cameraDesc,
        batteryDesc,
        protectionDesc,
        image,
        manufacturer,
        title,
        rating,
        price,
        productId,
      },
    } = this.props;

    const handleAddToCart = () => {
      this.props.addToCart(productId);
    };
    const inCartItems =
      incartProducts &&
      incartProducts.filter((product) => product.productId === productId);

    const inCart = inCartItems && inCartItems.length > 0 ? true : false;

    return (
      <Grid container className={classes.mainContainer}>
        <Grid item sm={12} xs={12}>
          {!UI.loading ? (
            <Fragment>
              <Grid
                style={{ marginBottom: 20, backgroundColor: "#fff" }}
                container
                spacing={10}
              >
                <Grid className={classes.imgWrapper} item sm={6} xs={12}>
                  <img height="500px" width="auto" src={image} alt={title} />
                  <div className={classes.detailsButtons}>
                    {authenticated ? (
                      <Button
                        onClick={handleAddToCart}
                        style={{ marginRight: 10 }}
                        variant="contained"
                        color="secondary"
                        disabled={inCart}
                      >
                        {loading && (
                          <CircularProgress
                            size={30}
                            className={classes.progress}
                          />
                        )}
                        Add to cart
                      </Button>
                    ) : (
                      <Button
                        style={{ marginRight: 10 }}
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/login"
                      >
                        Add to cart
                      </Button>
                    )}

                    <Button
                      style={{ marginLeft: 10 }}
                      component={Link}
                      to="/"
                      color="secondary"
                    >
                      See more products
                    </Button>
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Typography
                    align="left"
                    variant="h1"
                    component="h1"
                    gutterBottom
                  >
                    {title}
                  </Typography>
                  <Typography
                    align="left"
                    variant="h3"
                    component="h3"
                    gutterBottom
                  >
                    {teaserText}
                  </Typography>
                  <hr className={classes.visibleSeparator} />
                  <Typography
                    align="left"
                    variant="h6"
                    component="h6"
                    gutterBottom
                  >
                    {`Price: $${Number(price).toFixed(2)}`}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h5" component="h5" gutterBottom>
                {description}
              </Typography>
              <Typography
                style={{ marginTop: 80 }}
                variant="h2"
                component="h2"
                gutterBottom
              >
                {`As per ${manufacturer} specifications:`}
              </Typography>
              <div style={{ marginTop: 40 }} className={classes.description}>
                <Typography variant="h4" component="h4" gutterBottom>
                  Screen Resolution
                </Typography>
                <Typography variant="body1" component="h4" gutterBottom>
                  {screenDesc}
                </Typography>
                <hr className={classes.visibleSeparator} />
              </div>
              <div className={classes.description}>
                <Typography variant="h4" component="h4" gutterBottom>
                  Camera Quality
                </Typography>
                <Typography variant="body1" component="h4" gutterBottom>
                  {cameraDesc}
                </Typography>
                <hr className={classes.visibleSeparator} />
              </div>
              <div className={classes.description}>
                <Typography variant="h4" component="h4" gutterBottom>
                  Power for your everyday
                </Typography>
                <Typography variant="body1" component="h4" gutterBottom>
                  {batteryDesc}
                </Typography>
                <hr className={classes.visibleSeparator} />
              </div>
              <div className={classes.description}>
                <Typography variant="h4" component="h4" gutterBottom>
                  Personalised protection
                </Typography>
                <Typography variant="body1" component="h4" gutterBottom>
                  {protectionDesc}
                </Typography>
                <hr className={classes.visibleSeparator} />
              </div>
              <div className={classes.description}>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography variant="h4" component="h4" gutterBottom>
                    Average customer ratings:
                  </Typography>
                  <Rating name="rating" value={rating} readOnly />
                </Box>
              </div>
            </Fragment>
          ) : (
            <DetailsSkeleton />
          )}
        </Grid>
      </Grid>
    );
  }
}

details.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapstateToProps = (state) => ({
  product: state.data.product,
  loading: state.user.loading,
  UI: state.UI,
  authenticated: state.user.authenticated,
  incartProducts: state.user.incartProducts,
});

const mapActionsToProps = {
  getProduct,
  addToCart,
};

export default connect(
  mapstateToProps,
  mapActionsToProps
)(withStyles(styles)(details));
