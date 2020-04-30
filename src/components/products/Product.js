import React, { Fragment } from "react";
//redux
import { Link } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/dataActions";
//mui stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  ...theme.globalStyles,
  root: {
    display: "flex",
    marginBottom: 20,
    padding: 20,
    height: 450,
  },
  details: {
    display: "flex",
    flex: "4",
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "100%",
    flex: "3",
  },
  controls: {
    flex: "1 0 auto",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function Product(props) {
  const classes = useStyles();

  // redux store access
  const { loading, authenticated, incartProducts } = useSelector(
    (state) => ({
      authenticated: state.user.authenticated,
      loading: state.user.loading,
      incartProducts: state.user.incartProducts,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const { productId, title, description, price, image } = props.product;
  const titleArray = title.split(" ");
  const titleLink = titleArray.join("-");

  const inCartItems =
    incartProducts &&
    incartProducts.filter((product) => product.productId === productId);

  const inCart = inCartItems && inCartItems.length > 0 ? true : false;

  const handleAddToCart = () => {
    dispatch(addToCart(productId));
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={image} title={title} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h3" variant="h3">
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {`Price: $${Number(price).toFixed(2)}`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          {authenticated ? (
            <Fragment>
              <Button
                className={classes.button}
                onClick={handleAddToCart}
                style={{ marginRight: 10 }}
                variant="contained"
                color="secondary"
                disabled={inCart}
              >
                Add to cart
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <hr className={classes.invisibleSeparator} />
            </Fragment>
          ) : (
            <Fragment>
              <Button
                style={{ marginRight: 10 }}
                variant="contained"
                color="secondary"
                component={Link}
                to="/login"
              >
                Add to cart
              </Button>
              <br />
              <hr className={classes.invisibleSeparator} />
            </Fragment>
          )}
          <Button
            component={Link}
            to={`/product/${titleLink}/${productId}`}
            color="secondary"
          >
            More details
          </Button>
        </div>
      </div>
    </Card>
  );
}
