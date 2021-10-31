import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getStudents = createAsyncThunk(
  "students/getStudents",
  async () => {
    const response = await fetch("http://localhost:5000/students");
    if (response.ok) {
      const students = await response.json();
      return { data: students, error: "" };
    } else {
      const error = await response.json();
      return { data: "", error };
    }
  }
);

export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (payload) => {
    const response = await fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const student = await response.json();
      return { data: student, error: "" };
    } else {
      const error = await response.json();
      return { data: "", error };
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, student }) => {
    const response = await fetch(`http://localhost:5000/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (response.ok) {
      const student = await response.json();
      return { data: student, error: "" };
    } else {
      const error = await response.json();
      return { data: "", error };
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (payload) => {
    const response = await fetch(`http://localhost:5000/students/${payload}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return { id: payload };
    }
  }
);

export const studentSlice = createSlice({
  name: "students",
  initialState: {
    data: [],
    error: "",
  },
  extraReducers: {
    [getStudents.fulfilled]: (state, action) => {
      return { data: action.payload.data.data, error: action.payload.error };
    },

    [createStudent.fulfilled]: (state, action) => {
      if (action.payload.data) {
        state.data.push(action.payload.data.data);
      } else {
        state.error = action.payload.error.error;
      }
    },
    [updateStudent.fulfilled]: (state, action) => {
      if (action.payload.data) {
        const index = state.data.findIndex((student) => {
          return student._id === action.payload.data.data._id;
        });
        state.data[index] = action.payload.data.data;
      } else {
        state.error = action.payload.error.error;
      }
    },
    [deleteStudent.fulfilled]: (state, action) => {
      return {
        data: state.data.filter((student) => student._id !== action.payload.id),
        error: "",
      };
    },
  },
});

export default studentSlice.reducer;
