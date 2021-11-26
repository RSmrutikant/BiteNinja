import { Form, Container, FormCheck } from 'react-bootstrap';

import './index.css';
const FloatingTextField = (props) => {
  const { placeholder, type, name, value, onChange } = props;
  return (
    <div class="FloatingTextField">
      <input
        {...props}
        className="floatingInput"
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder=" "
        // onBlur={onChange}
      />

      <span>{placeholder}</span>
    </div>
  );
};

export default FloatingTextField;
