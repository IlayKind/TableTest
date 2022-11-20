import {createSlice} from "@reduxjs/toolkit";
import employees from "../component/Employees/Employees";


const initialState = {
  companies: [],
  employeesInfo: [],
  numInfo: [],
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
    openingEmployees: (state, action) => {
      state.companies.filter((item) => item.id === action.payload.id ? item.checkbox = !item.checkbox : item)
      state.employeesInfo = action.payload.checkbox ? [] : action.payload.employees
      state.numInfo = action.payload
    },
    selectChecked: (state, action) => {
      state.companies.forEach(item => item.checkbox = state.checkCompanies)
      state.checkCompanies = !state.checkCompanies
    },
    markEmployees: (state, action) => {
      state.employeesInfo.filter((item) => item.id === action.payload ? item.checkbox = !item.checkbox : item)
    },
    selectCheckedEmployees: (state, action) => {
      state.employeesInfo.forEach(item => item.checkbox = state.checkEmployees)
      state.checkEmployees = !state.checkEmployees
    },
    addEmployees: (state, action) => {
      state.employeesInfo.push(action.payload.user)
      state.companies.map((item) => item.id === action.payload.id ? item.employees.push(action.payload.user) : item)
    },
    deleteEmployees: (state, action) => {
      state.employeesInfo = state.employeesInfo.filter(item => item.id !== action.payload)
      state.employeesInfo = state.employeesInfo.filter(item => !item.checkbox)
      state.companies.filter((item) => item.id === state.numInfo.id ? item.employees.pop() : '')
    },
    addCompanies: (state, action) => {
      state.companies.push(action.payload)
    },
    deleteCompanies: (state, action) => {
      state.companies = state.companies.filter(item => item.id !== action.payload)
      state.companies = state.companies.filter(item => !item.checkbox)
      state.employeesInfo = []
    },
    editCompanies: (state, action) => {
      state.editCompanies = action.payload
    },
    saveEditCompanies: (state, action) => {
      state.companies = state.companies.map((item) => item.id === action.payload.id ? action.payload : item)
    },
    editEmployees: (state, action) => {
      state.editEmployees = action.payload
    },
    saveEditEmployees: (state, action) => {
      state.employeesInfo = state.employeesInfo.map((item) => item.id === action.payload.id ? action.payload : item)
    }
  }
})

export const {
  setInfo,
  openingEmployees,
  selectChecked,
  markEmployees,
  selectCheckedEmployees,
  addEmployees,
  deleteEmployees,
  addCompanies,
  deleteCompanies,
  editCompanies,
  saveEditCompanies,
  editEmployees,
  saveEditEmployees,
} = TableSlice.actions;
export default TableSlice.reducer;