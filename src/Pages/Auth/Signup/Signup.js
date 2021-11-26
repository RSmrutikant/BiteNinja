import { Form, Container, FormCheck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import './Signup.css';
import {
  LOGO_SYMBOL_LIGHT,
  ILLUSTRATION,
  LOGO,
  DRAG_ICON,
  LOGO_TAGLINE,
  NINJA,
} from '../../../Helpers/ImageHelper';
import { signupSchema } from '../../../Validators/AuthValidator';
import { signupAction } from '../AuthActions';
import { useDispatch } from 'react-redux';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import FloatingTextField from '../../../Components/FloatingTextField';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isTermsAccepted: false,
  isW9Signed: false,
  image: null,
};

const Signup = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: signupSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      let apiData = { ...values };
      delete apiData.confirmPassword;
      delete apiData.image;

      console.log('final values :: ', apiData);

      // delete values.termsAndCondition;
      onSignup(apiData);
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log('acceptedFiles', acceptedFiles);
    acceptedFiles.forEach(function (img) {
      let url = URL.createObjectURL(img);
      console.log('Url of the umage', img);
      handleChange('image', url);
      setFieldValue('image', url);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const onSignup = (values) => {
    dispatch(signupAction(values));
  };

  const {
    values,
    setFieldValue,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  return (
    <>
      {/* <Container fluid className="auth pb-3"> */}
      <main className="auth signup-window mt-5 d-flex flex-column align-items-center  ">
        {/* <section className="signup-nav-logos px-4"> */}
        <div className="d-flex align-items-center w-100 justify-content-between mx-4 px-4">
          <div className="login-flat-logo mx-5">
            <img src={NINJA} alt="logo-symbol " />
          </div>
          <div className="login-flat-logo mx-5">
            <img src={LOGO_TAGLINE} alt="logo" />
          </div>
        </div>
        {/* </section> */}

        <section className="container login-box text-center align-content-center">
          <div className="signup-illustration">
            <img src={ILLUSTRATION} alt="illustration" />
          </div>
          <Form noValidate onSubmit={handleSubmit}>
            <div className="signup-input mt-2">
              <p className="mb-2">
                Already a member? <Link to="/auth/login">Sign In</Link>
              </p>
              <Form.Group
                controlId="firstName"
                className="mb-0 form-floating signup-input-box"
              >
                <FloatingTextField
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                />
                {
                  <div
                    className={`invalid-field ${errors.firstName ? 'shake' : ''
                      }`}
                  >
                    {' '}
                    {errors.firstName ? errors.firstName : ' - '}
                  </div>
                }
              </Form.Group>

              <Form.Group
                controlId="lastName"
                className="mb-0 form-floating signup-input-box"
              >
                <FloatingTextField
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                />
                {
                  <div
                    className={`invalid-field ${errors.lastName ? 'shake' : ''
                      }`}
                  >
                    {' '}
                    {errors.lastName ? errors.lastName : ' - '}
                  </div>
                }
              </Form.Group>
              <Form.Group
                controlId="email"
                className="mb-0 form-floating signup-input-box"
              >
                <FloatingTextField
                  type="email"
                  placeholder={'\xa0 Email'}
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
                className="mb-0 form-floating signup-input-box"
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
              <Form.Group
                controlId="confirmPassword"
                className="mb-0 form-floating signup-input-box"
              >
                <FloatingTextField
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
                {
                  <div
                    className={`invalid-field ${errors.confirmPassword ? 'shake' : ''
                      }`}
                  >
                    {' '}
                    {errors.confirmPassword ? errors.confirmPassword : ' - '}
                  </div>
                }
              </Form.Group>
              <div className="row signup-input2">
                <div className="col-12">
                  <div className="form-check ">
                    <Form.Group controlId="termsAndCondition">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck"
                          name="isTermsAccepted"
                          value={values.isTermsAccepted}
                          onChange={handleChange}
                        />
                        <label class="form-check-label" for="exampleCheck">
                          <>
                            By clicking here, you confirm that you have read and
                            agree to our{' '}
                            {/* <a href="/terms-of-service">terms & condition</a> */}
                            <a>terms & condition</a>
                          </>
                        </label>
                      </div>
                      {
                        <div
                          className={`invalid-field ${errors.isTermsAccepted ? 'shake' : ''
                            }`}
                        >
                          {errors.isTermsAccepted
                            ? errors.isTermsAccepted
                            : '  '}
                        </div>
                      }
                    </Form.Group>
                  </div>
                </div>

                <div className="col-12 hello">
                  <Form.Group className="drop-zone">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <span>
                        Proof Of Identity <br />
                        <img
                          className="drop-zone-icon"
                          src={values.image ? values.image : DRAG_ICON}
                          alt=""
                        />{' '}
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <p>
                            Drag file here or <span> Browse </span>
                            <small>
                              Upload{' '}
                              <a
                                href="#/"
                                style={{
                                  color: '#e06030',
                                }}
                              >
                                supported file{' '}
                              </a>
                              (15MB Max.)
                            </small>{' '}
                          </p>
                        )}
                      </span>
                    </div>
                  </Form.Group>
                </div>

                <div className="col-12">
                  <div className="form-check mt-1">
                    <Form.Group>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="w9-checkbox"
                          name="isW9Signed"
                          onChange={handleChange}
                        />
                        <label class="form-check-label" for="w9-checkbox">
                          <>
                            By clicking here, you confirm that you have filled
                            and signed your{' '}
                            <a
                              href="https://www.irs.gov/pub/irs-pdf/fw9.pdf"
                              target="_blank"
                              download="fw9"
                            >
                              W9-Form
                            </a>
                          </>
                        </label>
                      </div>

                      <div className="invalid-w9">{errors.isW9Signed}</div>
                    </Form.Group>
                  </div>
                </div>
              </div>
              <div className="signup-input3 mb-4 ">
                <button className="signup-btn mb-5" type="submit">
                  Sign Up
                </button>
              </div>
            </div>
          </Form>
        </section>
      </main>
      {/* </Container> */}
    </>
  );
};

export default Signup;
