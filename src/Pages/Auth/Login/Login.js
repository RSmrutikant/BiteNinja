import { Form, Container, FormCheck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { STORAGE_KEYS } from '../../../Constants/StorageKeysConstant';
import { getItem, setItem } from '../../../Utils/StorageUtil';
import './Login.css';
import {
  LOGO_SYMBOL_LIGHT,
  ILLUSTRATION,
  LOGO,
  NINJA,
  LOGO_TAGLINE,
} from '../../../Helpers/ImageHelper';
import { loginSchema } from '../../../Validators/AuthValidator';
import { loginAction, userProfile } from '../AuthActions';
import FloatingTextField from '../../../Components/FloatingTextField/index';
const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log('values', values);
      onLogin(values);
    },
  });

  const onLogin = async (values) => {
    await dispatch(loginAction(values));
    // dispatch(
    //   userProfile((data) => {
    //     setItem(STORAGE_KEYS.USER_DETAILS, data);
    //     console.log('userProfile userProfile', data);
    //   }),
    // );
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <>
      {/* <Container className="auth w-100 h-100" fluid> */}
      <div>
        <main className="auth login-window mt-5 d-flex flex-column align-items-center ">
          {/* <section className="login-nav-logos px-4"> */}
          <div className="d-flex align-items-center w-100 justify-content-between mx-4 px-4">
            <div className="login-flat-logo mx-5">
              <img src={NINJA} alt="logo-symbol " />
            </div>
            <div className="login-flat-logo mx-5">
              <img src={LOGO_TAGLINE} alt="logo" />
            </div>
          </div>
          {/* </section> */}

          <section className="container login-box text-center align-item-center">
            <div className="login-illustration">
              <img src={ILLUSTRATION} alt="illustration" />
            </div>

            <Form className="w-100" noValidate onSubmit={handleSubmit}>
              <div className="login-input text-center mt-2 ">
                <p className="mb-2">
                  New Member? <Link to="/auth/signup">Sign Up</Link>
                </p>

                <Form.Group
                  controlId="email"
                  className="form-floating login-input-box mb-0"
                >
                  <FloatingTextField
                    type="email"
                    placeholder="Username or Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {
                    <div
                      className={`invalid-field ${errors.email ? 'shake' : ''}`}
                    >
                      {' '}
                      {errors.email ? errors.email : ' - '}
                    </div>
                  }
                </Form.Group>
                <Form.Group
                  controlId="password"
                  className="form-floating login-input-box"
                >
                  <FloatingTextField
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="new-password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {
                    <div
                      className={`invalid-field ${errors.password ? 'shake' : ''
                        }`}
                    >
                      {' '}
                      {errors.password ? errors.password : ' - '}
                    </div>
                  }
                </Form.Group>

                {/* <div className="row justify-content-between login-input2 mt-2">
                  <div className="col-6">
                    <Form.Group
                      className="mb-3 flex"
                      controlId="formBasicCheckbox"
                    >
                      <Form.Check type="checkbox" label="Remeber me" />
                    </Form.Group>
                  </div>
                  <div className="col-6 text-right forgot-pass">
                    <span>
                      <a href="#?">Forgot Password?</a>
                    </span>
                  </div>
                </div> */}
                <div className="login-input3 my-3">
                  <button className="login-btn1">Login</button>
                </div>
              </div>
            </Form>
          </section>
        </main>
      </div>
      {/* </Container> */}
    </>
  );
};

export default Login;
