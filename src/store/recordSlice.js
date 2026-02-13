import { createSlice } from "@reduxjs/toolkit";

const demoRecords = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-0101",
    position: "Senior Developer",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "555-0102",
    position: "Product Manager",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "555-0103",
    position: "UX Designer",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "555-0104",
    position: "QA Engineer",
  },
  {
    id: 5,
    name: "David Smith",
    email: "david.smith@example.com",
    phone: "555-0105",
    position: "DevOps Engineer",
  },
];

const loadRecordsFromStorage = () => {
    try {
        const savedRecords = localStorage.getItem("employeeRecords");
        return savedRecords ? JSON.parse(savedRecords) : demoRecords;
    } catch (error) {
        console.error("Error loading records from localStorage:", error);
    }
}

const calculateNextId = (records) => {
  if (records.length === 0) return 1;
  const maxId = Math.max(...records.map((record) => record.id));
  return maxId + 1;
};



const recordsSlice = createSlice({
  name: "records",
  initialState: {
    items: loadRecordsFromStorage(),
    searchTerm: "",
    nextId: calculateNextId(loadRecordsFromStorage()),
  },

  reducers: {
    addRecord: (state, action) => {
      const newRecord = {
        id: state.nextId,
        ...action.payload,
      };
      state.items.push(newRecord);
      localStorage.setItem("employeeRecords", JSON.stringify(state.items));
      state.nextId = calculateNextId(state.items);
    },
    updateRecord: (state, action) => {
         const { id, data } = action.payload;
        const index = state.items.findIndex((record) => record.id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...data };
          localStorage.setItem("employeeRecords", JSON.stringify(state.items));
        }
    }
  },
});

export const {addRecord} = recordsSlice.actions;

export default recordsSlice.reducer;
