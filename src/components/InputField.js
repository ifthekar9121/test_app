import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { validateInput } from './library/Validators';

const InputField = ({value, label, placeholder, validators, type, onChange, data, require }) => {
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        const {value} = event.target;
        setError(validateInput(validators, value));
        onChange(value);
    };

    return (
        <div className="form-group mb-3">
            {label && <label htmlFor="app-input-field">{label}</label>}

            {type === 'textarea' ? (
                <textarea
                    type={type}
                    value={value}
                    className='form-control'
                    placeholder={placeholder}
                    required={require}
                    onChange={handleChange}
                />
            )  : type === 'select' ? (
                <select
                type={type}
                value={value}
                required={require} 
                className="form-control"
                onChange={handleChange}>
                <option value="">{placeholder}</option>
                {data.map((item, key) => (
                    <option
                        key={key}
                        value={item.value}>
                        {item.label}
                    </option>
                ))}
                </select>
            ) : (
                <input
                    type={type}
                    value={value}
                    className='form-control'
                    placeholder={placeholder}
                    required={require} 
                    onChange={handleChange}
                />
            )}
            {error && <span className='text-danger'>{error.message}</span>}
        </div>
    )
};

InputField.propTypes = {
    value: PropTypes.string, 
    label: PropTypes.string,
    placeholder: PropTypes.string,
    validators: PropTypes.array,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    data: PropTypes.array,
    required: PropTypes.string,
};

InputField.defaultProps = {
  value: '',
  label: '',
  placeholder: '',
  type: 'text',
  required: '',
  data: [],
  validators: []
};

export default InputField;