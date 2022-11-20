import {TableSlice} from "./TableSlice";

export const companiesSelector = (state) => state.TableSlice.companies;
export const employeesSelector = (state) => state.TableSlice.employeesInfo;
export const numSelector = (state) => state.TableSlice.numInfo;
export const editCompaniesSelector = (state) => state.TableSlice.editCompanies;
export const editEmployeesSelector = (state) => state.TableSlice.editEmployees;