import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//redux
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

//mui stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";

//images
import ecocash from "../assets/images/ecocash.png";
import visa from "../assets/images/visa.png";
import mastercard from "../assets/images/mastercard.png";

//components
import PaypalButtton from "../components/cart/PaypalButton";

const TAX_RATE = 0.07;

const styles = (theme) => ({
  ...theme.globalStyles,
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});
let checkoutForm;
let userInfo;

class checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      phone: "",
      website: "",
      location: "",
      errors: {},
      isComplete: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors && !nextProps.user.isComplete) {
      this.setState({
        isComplete: false,
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && nextProps.user.isComplete) {
      this.setState({ isComplete: true, errors: {} });
    }
  }
  mapUserDetailsToState = (credentials) => {
    this.setState({
      phone: credentials.phone ? credentials.phone : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };
  getSteps = () => {
    return ["Shipment details", "Review & payment"];
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleNext = () => {
    this.state.isComplete &&
      this.setState({ activeStep: this.state.activeStep + 1 });
  };

  async handleSubmit(event) {
    event.preventDefault();
    const userDetails = {
      phone: this.state.phone,
      website: this.state.website,
      location: this.state.location,
    };
    await this.props.editUserDetails(userDetails);
  }

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      isComplete: false,
    });
  };

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return checkoutForm;
      case 1:
        return userInfo;
      default:
        return "Unknown stepIndex";
    }
  };

  render() {
    const steps = this.getSteps();
    const {
      classes,
      loading,
      authenticated,
      totalPrice,
      user,
      credentials: { phone, website, email, username, location },
    } = this.props;

    const { errors } = this.state;

    checkoutForm = (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="phone"
            type="number"
            label={
              <Typography variant="body2" gutterBottom>
                Phone &nbsp;<span style={{ color: "red" }}>*</span>
              </Typography>
            }
            placeholder="Phone number"
            helperText={errors.phone}
            error={errors.phone ? true : false}
            className={classes.textField}
            value={this.state.phone}
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            name="website"
            tpye="text"
            label={
              <Typography variant="body2" gutterBottom>
                Website
              </Typography>
            }
            placeholder="Your personal/professinal website"
            className={classes.textField}
            value={this.state.website}
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            name="location"
            tpye="text"
            label={
              <Typography variant="body2" gutterBottom>
                Location &nbsp;<span style={{ color: "red" }}>*</span>
              </Typography>
            }
            placeholder="Where you live"
            helperText={errors.location}
            error={errors.location ? true : false}
            className={classes.textField}
            value={this.state.location}
            onChange={this.handleChange}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{
              float: "left",
              display: this.state.isComplete ? "none" : "inherit",
            }}
            className={classes.button}
            disabled={this.state.isComplete}
          >
            Submit
            {loading && (
              <CircularProgress
                style={{ left: 28 }}
                size={30}
                className={classes.progress}
              />
            )}
          </Button>
        </form>
      </Fragment>
    );

    userInfo = !user.loading ? (
      <Fragment>
        <Grid container spacing={10}>
          <Grid item sm={6} xs={12}>
            <div className={classes.profile}>
              <Typography variant="h5" gutterBottom>
                Your Information
              </Typography>
              <hr />
              <div className="profile-details">
                <Typography align="left" variant="h6" gutterBottom>
                  {username}
                </Typography>
                {phone && (
                  <Typography align="left" variant="body2">
                    {`${email} | ${phone}`}
                  </Typography>
                )}
                <hr />
                {location && (
                  <Fragment>
                    <Typography align="left" variant="body2" gutterBottom>
                      <LocationOn color="secondary" /> <span>{location}</span>
                    </Typography>
                    <hr />
                  </Fragment>
                )}
                {website && (
                  <Fragment>
                    <Typography align="left" variant="body2" gutterBottom>
                      <LinkIcon color="secondary" />
                      &nbsp;&nbsp;
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {website}
                      </a>
                    </Typography>
                    <hr />
                  </Fragment>
                )}
              </div>
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography variant="h5" gutterBottom>
              Payment Methods
            </Typography>
            <Typography component="div">
              <IconButton>
                <span>
                  <img width="40px" src={visa} alt="visa" />
                </span>
              </IconButton>
              <IconButton>
                <span>
                  <img width="40px" src={ecocash} alt="ecocash" />
                </span>
              </IconButton>
              <IconButton>
                <span>
                  <img width="40px" src={mastercard} alt="mastercard" />
                </span>
              </IconButton>
            </Typography>
            <Typography component="div">
              <PaypalButtton
                total={totalPrice + TAX_RATE * totalPrice}
                history={this.props.history}
              />
            </Typography>
          </Grid>
        </Grid>
      </Fragment>
    ) : (
      <Typography style={{ margin: 40 }}>
        Please wait...
        <br />
        <CircularProgress size={30} />
      </Typography>
    );

    const checkoutMarkup = authenticated ? (
      <div className={classes.root}>
        <Stepper
          style={{ color: "red" }}
          activeStep={this.state.activeStep}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography component={"div"} className={classes.instructions}>
                {this.getStepContent(this.state.activeStep)}
              </Typography>
              <div>
                <Button
                  color="secondary"
                  disabled={this.state.activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                {this.state.activeStep === steps.length - 1 ? (
                  // <Button
                  //   variant="contained"
                  //   color="secondary"
                  //   onClick={this.handleNext}
                  // >
                  //   Finish
                  // </Button>
                  <Fragment></Fragment>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleNext}
                    disabled={!this.state.isComplete}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    ) : (
      (window.location.href = "/login")
    );
    return checkoutMarkup;
  }
}

checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapstateToProps = (state) => ({
  authenticated: state.user.authenticated,
  loading: state.UI.loading,
  credentials: state.user.credentials,
  incartProducts: state.user.incartProducts,
  totalPrice: state.user.totalPrice,
  totalItems: state.user.totalItems,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  editUserDetails,
};

export default connect(
  mapstateToProps,
  mapActionsToProps
)(withStyles(styles)(checkout));
