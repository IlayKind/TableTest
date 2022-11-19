import {TableSlice} from "./TableSlice";

export const CompaniesSelector = (state) => state.TableSlice.companies;
export const EmployeesSelector = (state) => state.TableSlice.employeesInfo;
export const EditCompaniesSelector = (state) => state.TableSlice.editCompanies;
export const EditEmployeesSelector = (state) => state.TableSlice.editEmployees;