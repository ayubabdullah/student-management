import { Form, Button, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStudent } from "../redux/studentSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email("Please add a valid email address (example.example.com)")
    .required(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required(),
  department: Yup.string().required(),
  DOB: Yup.date().required(),
});
export const CreateForm = ({ setIsOpenCreateModal }) => {
  const students = useSelector((state) => state.students);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = ({ name, email, password, department, DOB }) => {
    const student = { name, email, password, department, DOB };
    dispatch(createStudent(student));
    if (!students.error) {
      setIsOpenCreateModal(false);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => handleSubmit(values)}
      initialValues={{
        name: "",
        email: "",
        password: "",
        department: "",
        DOB: "",
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
              isInvalid={!!errors.name}
            />
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
              name="DOB"
              value={values.DOB}
              onChange={handleChange}
              isInvalid={!!errors.DOB}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid Date
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" className="d-block" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateForm;
