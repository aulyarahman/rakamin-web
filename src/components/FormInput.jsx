import { PropTypes } from 'prop-types';

export const FormInput = ({ label, id, type, placeholder, required, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="block w-full rounded-sm border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        required={required || false}
        onChange={onChange}
      />
    </div>
  );
};

FormInput.PropTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.string,
  onChange: PropTypes.onChange
};
