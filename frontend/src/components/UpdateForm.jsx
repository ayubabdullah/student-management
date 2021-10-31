import React, { useState } from "react";
import { updateStudent } from "../redux/studentSlice";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import formatted from "../utils/formatDate";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email("Please add a valid email address (example.example.com)")
    .required(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required(),
  department: Yup.string().required(),
  dob: Yup.date(),
});
const UpdateForm = ({ setIsOpenUpdateModal, currentStudent }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = ({ name, email, password, department, dob }) => {
    const DOB = dob || currentStudent.DOB;
    const student = { name, email, password, department, DOB };

    dispatch(
      updateStudent({
        student,
        id: currentStudent._id,
      })
    );

    setIsOpenUpdateModal(false);
  };
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => handleSubmit(values)}
      initialValues={{
        name: currentStudent.name,
        email: currentStudent.email,
        password: currentStudent.password,
        department: currentStudent.department,
        dob: currentStudent.DOB,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              isValid={touched.name && !errors.name}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback>Looks good</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter email"
                aria-describedby="inputGroupPrepend"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className="d-flex justify-content-center align-items-center">
              <Form.Control
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Button
                variant="warning"
                className="ms-2"
                onClick={() => {
                  setIsShowPassword(!isShowPassword);
                }}
              >
                {isShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </Button>
            </div>
            <Form.Control.Feedback className="d-block" type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Department"
              name="department"
              value={values.department}
              onChange={handleChange}
              isInvalid={!!errors.department}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a Department
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDOB">
            <Form.Label>Date of Birth</Form.Label>

            <Form.Control
              type="date"
              name="dob"
              value={values.dob}
              onChange={handleChange}
              isInvalid={!!errors.dob}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid Date
            </Form.Control.Feedback>
            <Form.Text className="text-muted">Current DOB: {formatted(values.dob)}</Form.Text>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" className="d-block" type="submit">
              Update
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateForm;
