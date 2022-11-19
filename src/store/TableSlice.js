import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  companies: [],
  employeesInfo: [],
  checkCompanies: true,
  checkEmployees: true,
  editCompanies: {},
  editEmployees: {}
}

export const TableSlice = createSlice({
  name: "Table",
  initialState,
  reducers: {

    setInfo: (state, action) => {
      state.companies = action.payload;
    },
    ExtractionEmployees: (state, action) => {
      state.companies.filter((item) => item.id === action.payload.id ? item.checkbox = !item.checkbox : item)
      state.employeesInfo = action.payload.employees
    },
    SelectChecked: (state, action) => {
      state.companies.forEach(item => item.checkbox = state.checkCompanies)
      state.checkCompanies = !state.checkCompanies
    },
    useMarkEmployees: (state, action) => {
      state.employeesInfo.filter((item) => item.id === action.payload ? item.checkbox = !item.checkbox : item)
    },
    SelectCheckedEmployees: (state, action) => {
      state.employeesInfo.forEach(item => item.checkbox = state.checkEmployees)
      state.checkEmployees = !state.checkEmployees
    },
    AddEmployees: (state, action) => {
      state.employeesInfo.push(action.payload)
    },
    DeleteEmployees: (state, action) => {
      state.employeesInfo = state.employeesInfo.filter(item => item.id !== action.payload)
      state.employeesInfo = state.employeesInfo.filter(item => !item.checkbox)
    },
    AddCompanies: (state, action) => {
      state.companies.push(action.payload)
    },
    DeleteCompanies: (state, action) => {
      state.companies = state.companies.filter(item => item.id !== action.payload)
      state.companies = state.companies.filter(item => !item.checkbox)
      state.employeesInfo = []
    },
    EditCompanies: (state, action) => {
      state.editCompanies = action.payload
    },
    SaveEditCompanies: (state, action) => {
      state.companies = state.companies.map((item) => item.id === action.payload.id ? action.payload : item)
    },
    EditEmployees: (state, action) => {
      state.editEmployees = action.payload
    },
    SaveEditEmployees: (state, action) => {
      state.employeesInfo = state.employeesInfo.map((item) => item.id === action.payload.id ? action.payload : item)
    }
  }
})

export const {
  setInfo,
  ExtractionEmployees,
  SelectChecked,
  useMarkEmployees,
  SelectCheckedEmployees,
  AddEmployees,
  DeleteEmployees,
  AddCompanies,
  DeleteCompanies,
  EditCompanies,
  SaveEditCompanies,
  EditEmployees,
  SaveEditEmployees,
} = TableSlice.actions;
export default TableSlice.reducer;