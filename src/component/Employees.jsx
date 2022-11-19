import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CompaniesSelector, EditEmployeesSelector, EmployeesSelector} from "../store/Selectors";
import './EmploStyle.scss'
import {
  DeleteEmployees, EditEmployees,
  SaveEditEmployees,
  SelectCheckedEmployees,
  useMarkEmployees
} from "../store/TableSlice";
import {AddEmployees} from "../store/TableSlice";

const imgEdit = "/img/edit.png"
const imgDelete = "/img/delete.png"

const Employees = () => {
  const dispatch = useDispatch();
  const EmployeesInfo = useSelector(EmployeesSelector);
  const CompaniesInfo = useSelector(CompaniesSelector);
  const Edit = useSelector(EditEmployeesSelector);
  const [addFields, setAddFields] = React.useState(false);
  const [valueName, setValueName] = React.useState('');
  const [valueSurname, setValueSurname] = React.useState('');
  const [valueJob, setValueJob] = React.useState('');
  const [valueEditName, setValueEditName] = React.useState('');
  const [valueEditSurname, setValueEditSurname] = React.useState('');
  const [valueEditJob, setValueEditJob] = React.useState('');
  const [EditForm, setEditForm] = React.useState(false);


  function aDD () {
    if (valueName === '') return
    if (valueSurname === '') return
    if (valueJob === '') return
    const ObjEmployees = {
      id: Date.now(),
      name: valueName,
      surname: valueSurname,
      job: valueJob,
      checkbox: false,
    }
    dispatch(AddEmployees(ObjEmployees, CompaniesInfo))

    setAddFields(!addFields)
    setValueName('');
    setValueSurname('');
    setValueJob('');
  }

  function Mark (id) {
    dispatch(useMarkEmployees(id))
  }

  function SelectAllEmployees () {
    dispatch(SelectCheckedEmployees())
  }

  function addEmployees () {
    setAddFields(!addFields)
  }

  function DeleteItem (id) {
    dispatch(DeleteEmployees(id))
  }

  function EditItem (item) {
    dispatch(EditEmployees(item))
    setValueEditName(item.name)
    setValueEditSurname(item.surname)
    setValueEditJob(item.job)
    setEditForm(!EditForm)
  }

  function SaveItem () {
    if (valueEditName === "") return
    if (valueEditSurname === "") return
    if (valueEditJob === "") return
    const EditElement = {
      id: Edit.id,
      checkbox: Edit.checkbox,
      name: valueEditName,
      surname: valueEditSurname,
      job: valueEditJob,
    }
    dispatch(SaveEditEmployees(EditElement))
    setValueEditName('')
    setValueEditSurname('')
    setValueEditJob('')
    setEditForm(!EditForm)
  }

  return (
    <div className='container_E'>
      <button
        disabled={EditForm || addFields || EmployeesInfo.length === 0}
        onClick={addEmployees}
        style={{cursor: "pointer"}}
      >
        Добавить сотрудника
      </button>
      <div className='container_employees'>
        {
          addFields ?
            <div className='addForm'>
              <input type='text' placeholder={"Имя"} value={valueName} onChange={(e) => setValueName(e.target.value)}/>
              <input type='text' placeholder={"Фамилия"} value={valueSurname}
                     onChange={(e) => setValueSurname(e.target.value)}/>
              <input type='text' placeholder={"Должность"} value={valueJob}
                     onChange={(e) => setValueJob(e.target.value)}/>
              <button onClick={aDD}>
                Добавить
              </button>
              <button onClick={() => setAddFields(!addFields)}>
                Отмена
              </button>
            </div> : <div>
              {
                EmployeesInfo.length !== 0 ? <div>
                    <table>
                      <thead>
                      <tr>
                        <th>
                          Выделить всё
                          <br/>
                          <input type="checkbox" checked={EmployeesInfo.checkbox} onClick={SelectAllEmployees}/>
                        </th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Должность</th>
                        <th>Удаление</th>
                      </tr>
                      </thead>
                      <tbody className='info_employees'>
                      {
                        !EditForm ?
                          EmployeesInfo.map((item) => <tr key={item.id}>
                            <td style={{cursor: "pointer"}} className={!item.checkbox ? "td-blue" : "td-grin"}
                                onClick={() => Mark(item.id)}>
                              <input type='checkbox' checked={item.checkbox}/>
                            </td>
                            <td className={!item.checkbox ? "td-blue" : "td-grin"}>
                              {item.name}
                            </td>
                            <td className={!item.checkbox ? "td-blue" : "td-grin"}>
                              {item.surname}
                            </td>
                            <td className={!item.checkbox ? "td-blue" : "td-grin"}>
                              {item.job}
                            </td>
                            <td className={!item.checkbox ? "td-blue" : "td-grin"}>
                              <button onClick={() => DeleteItem(item.id)} className='employees_delete'>
                                <img width='30px' height='30px' src={imgDelete}/>
                              </button>
                              <button onClick={() => EditItem(item)} className='employees_delete'>
                                <img width='30px' height='30px' src={imgEdit}/>
                              </button>
                            </td>
                          </tr>)
                          : <div>
                            <input value={valueEditName} type="text" placeholder="name"
                                   onChange={(e) => setValueEditName(e.target.value)}/>
                            <input value={valueEditSurname} type="text" placeholder="address"
                                   onChange={(e) => setValueEditSurname(e.target.value)}/>
                            <input value={valueEditJob} type="text" placeholder="job"
                                   onChange={(e) => setValueEditJob(e.target.value)}/>
                            <button onClick={SaveItem}>Save</button>
                            <button onClick={() => setEditForm(!EditForm)}>Cancel</button>
                          </div>
                      }
                      </tbody>
                    </table>
                  </div>
                  : ""
              }
            </div>
        }
      </div>
    </div>
  );
};

export default Employees;