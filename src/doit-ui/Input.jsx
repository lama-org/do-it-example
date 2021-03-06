import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css, withStyles, withStylesPropTypes } from './withStyles';

class Input extends PureComponent {
  handleChange = (e) => {
    const { name, onChange } = this.props;
    if (onChange) {
      onChange(name, this.ref.value);
    }
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.ref.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.autoFocus) {
      this.ref.focus();
    }
  }

  setRef = (ref) => {
    this.ref = ref;
  };

  render() {
    const {
      errorMessage,
      label,
      name,
      value,
      type,
      styles,
      large,
      xlarge,
      small,
      xsmall,
    } = this.props;
    return (
      <fieldset {...css(styles.wrapper)}>
        <label htmlFor={`input_${name}`} {...css(styles.label, errorMessage && styles.errorLabel)}>
          {errorMessage || label}
        </label>
        <input
          {...css(
            styles.input,
            errorMessage && styles.error,
            xsmall && styles.xsmall,
            small && styles.small,
            large && styles.large,
            xlarge && styles.xlarge,
          )}
          id={`input_${name}`}
          ref={this.setRef}
          onChange={this.handleChange}
          value={value || ''}
          type={type}
        />
      </fieldset>
    );
  }
}

Input.propTypes = {
  ...withStylesPropTypes,
  type: PropTypes.oneOf(['text', 'number', 'price']),
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  onChange: () => {},
  autoFocus: false,
};

export default withStyles(({ unit, color, size, lineHeight }) => ({
  wrapper: {
    border: 0,
    padding: 0,
    position: 'relative',
  },
  label: {
    display: 'block',
    fontSize: size.xs,
    top: 2,
    left: unit * 2,
    cursor: 'pointer',
  },
  input: {
    marginTop: 2,
    fontSize: size.md,
    lineHeight: lineHeight.md,
    padding: unit * 1.5,
    border: 1,
    borderColor: color.primary,
    borderStyle: 'solid',
    borderRadius: 4,
    outline: 0,
    ':focus': {
      boxShadow: '0 0 0px 2px rgba(0, 0, 0, 0.3)',
    },
  },
  xlarge: {
    fontSize: size.xg,
  },
  large: {
    fontSize: size.lg,
  },
  small: {
    fontSize: size.sm,
    padding: unit,
  },
  errorLabel: {
    color: color.error,
  },
  error: {
    borderColor: color.error,
  },
}))(Input);
