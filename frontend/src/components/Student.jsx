import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { deleteStudent } from "../redux/studentSlice";
import UpdateForm from "./UpdateForm";
import formatted from "../utils/formatDate";

const Student = ({ student }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };
  const handleUpdate = () => {
    setIsOpenUpdateModal(true);
  };
  return (
    <>
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td>{student.department}</td>
      <td>{formatted(student.DOB)}</td>
      <td>
        <Button
          className="me-1"
          variant="outline-danger"
          onClick={() => handleDelete(student._id)}
        >
          <AiFillDelete />
        </Button>
        <Button variant="outline-warning" onClick={() => handleUpdate()}>
          <AiFillEdit />
        </Button>
      </td>
      <Modal
        isOpen={isOpenDeleteModal}
        onRequestClose={() => setIsOpenDeleteModal(false)}
        style={{
          content: {
            width: "25%",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <div className="row mb-4">
            <h4>Are you sure ?</h4>
          </div>

          <div className="row">
            <Button
              className="col me-4 px-4"
              variant="success"
              onClick={() => {
                dispatch(deleteStudent(student._id));
                setIsOpenDeleteModal(false);
              }}
            >
              Yes
            </Button>
            <Button
              className="col px-4"
              variant="danger"
              onClick={() => setIsOpenDeleteModal(false)}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isOpenUpdateModal}
        onRequestClose={() => setIsOpenUpdateModal(false)}
        style={{
          content: {
            width: "50%",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <Button
          variant="danger"
          style={{ position: "absolute", top: "4px", right: "4px" }}
          onClick={() => setIsOpenUpdateModal(false)}
        >
          <AiOutlineClose />
        </Button>
        <UpdateForm
          setIsOpenUpdateModal={setIsOpenUpdateModal}
          currentStudent={student}
        />
      </Modal>
    </>
  );
};

export default Student;
