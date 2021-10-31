import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../redux/studentSlice";
import CreateForm from "../components/CreateForm";
import Student from "../components/Student";


Modal.setAppElement("#root");

const Home = ({ isOpenCreateModal, setIsOpenCreateModal }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  return (
    <>
      {students.data && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Date of Birth</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.data.map((student) => (
              <tr key={uuidv4()}>
                <Student student={student} />
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal
        isOpen={isOpenCreateModal}
        onRequestClose={() => setIsOpenCreateModal(false)}
        style={{
          content: {
            width: '50%',
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
          onClick={() => setIsOpenCreateModal(false)}
        >
          <AiOutlineClose />
        </Button>
        <CreateForm setIsOpenCreateModal={setIsOpenCreateModal} />
      </Modal>
    </>
  );
};

export default Home;
