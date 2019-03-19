import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  }
});

class ValueBetSelect extends React.Component {
  state = {
    value_bet: "0",
    labelWidth: 70
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  update = (e) => {
    this.props.onUpdate(e.target.value);
    this.setState({value_bet: e.target.value});
  };

  render() {
    const { classes } = this.props;
    let { v } = this.props;
    v= this.state.value_bet
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-value_bet-simple"
          >
            Annonce
          </InputLabel>
          <Select
            value={this.state.value_bet}
            onChange={this.update}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="value_bet"
                id="outlined-value_bet-simple"
              />
            }
            classes
          >
            <MenuItem value={80}>80</MenuItem>
            <MenuItem value={90}>90</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={110}>110</MenuItem>
            <MenuItem value={120}>120</MenuItem>
            <MenuItem value={130}>130</MenuItem>
            <MenuItem value={140}>140</MenuItem>
            <MenuItem value={150}>150</MenuItem>
            <MenuItem value={160}>160</MenuItem>
            <MenuItem value={162}>Capot</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

ValueBetSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ValueBetSelect);
