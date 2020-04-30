import React, { Component } from "react";
import PropTypes from "prop-types";

//redux
import { connect } from "react-redux";
import { getProducts } from "../redux/actions/dataActions";

//mui stuff
import Grid from "@material-ui/core/Grid";

//components
import Product from "../components/products/Product";
import HomeSkeleton from "../util/HomeSkeleton";

class home extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { products, loading } = this.props.data;
    const productsMakeup = !loading ? (
      products.map((product) => {
        return <Product key={product.productId} product={product} />;
      })
    ) : (
      <HomeSkeleton />
    );
    return (
      <Grid container>
        <Grid item sm={1} xs={12}></Grid>
        <Grid item sm={10} xs={12}>
          {productsMakeup}
        </Grid>
        <Grid item sm={1} xs={12}></Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getProducts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getProducts })(home);
