import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editEmployeesSelector, employeesSelector, numSelector} from "../../store/Selectors";
import './EmploStyle.scss'
import {
  deleteEmployees, editEmployees, markEmployees,
  saveEditEmployees,
  selectCheckedEmployees, addEmployees,
} from "../../store/TableSlice";


const imgEdit = "/img/edit.png"
const imgDelete = "/img/delete.png"

const Employees = () => {
  const dispatch = useDispatch();
  const employeesInfo = useSelector(employeesSelector);
  const lengthInfo = useSelector(numSelector);
  const edit = useSelector(editEmployeesSelector);
  const [addFields, setAddFields] = React.useState(false);
  const [valueName, setValueName] = React.useState('');
  const [valueSurname, setValueSurname] = React.useState('');
  const [valueJob, setValueJob] = React.useState('');
  const [valueEditName, setValueEditName] = React.useState('');
  const [valueEditSurname, setValueEditSurname] = React.useState('');
  const [valueEditJob, setValueEditJob] = React.useState('');
  const [editForm, setEditForm] = React.useState(false);


  const aDD = (id) => {
    if (valueName === ''|| valueSurname === '' || valueJob === '') return
    const objEmployees = {
      user : {
        id: Date.now(),
        name: valueName,
        surname: valueSurname,
        job: valueJob,
        checkbox: false,
      },
      id : id
    }
    dispatch(addEmployees(objEmployees))
    setAddFields(!addFields)
    setValueName('');
    setValueSurname('');
    setValueJob('');
  }

  const checkedAll = (id) => {
    dispatch(markEmployees(id))
  }

  const selectAllEmployees = () => {
    dispatch(selectCheckedEmployees())
  }

  const openEmployees = () => {
    setAddFields(!addFields)
  }

  const deleteItem = (id) => {
    dispatch(deleteEmployees(id))
  }

  const editItem = (item) => {
    dispatch(editEmployees(item))
    setValueEditName(item.name)
    setValueEditSurname(item.surname)
    setValueEditJob(item.job)
    setEditForm(!editForm)
  }

  const saveItem = () => {
    if (valueEditName === "" || valueEditSurname === "" || valueEditJob === "")return
    const editElement = {
      id: edit.id,
      checkbox: edit.checkbox,
      name: valueEditName,
      surname: valueEditSurname,
      job: valueEditJob,
    }
    dispatch(saveEditEmployees(editElement))
    setValueEditName('')
    setValueEditSurname('')
    setValueEditJob('')
    setEditForm(!editForm)
  }

  return (
    <div className='container_E'>
      <button
        disabled={editForm || addFields || employeesInfo.length === 0}
        onClick={openEmployees}
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
              <button onClick={() => aDD(lengthInfo.id)}>
                Добавить
              </button>
              <button onClick={() => setAddFields(!addFields)}>
                Отмена
              </button>
            </div> : <>
              {
                employeesInfo.length !== 0 ?
                    <table>
                      <thead>
                      <tr>
                        <th>
                          All
                          <br/>
                          <input type="checkbox" checked={employeesInfo.checkbox} onClick={selectAllEmployees}/>
                        </th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Job</th>
                        <th>Delete<br/>Edit</th>
                      </tr>
                      </thead>
                      <tbody className='info_employees'>
                      {
                        !editForm ?
                          employeesInfo.map((item) => <tr key={item.id}>
                            <td style={{cursor: "pointer"}} className={!item.checkbox ? "td-blue" : "td-grin"}
                                onClick={() => checkedAll(item.id)}>
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
                              <button onClick={() => deleteItem(item.id)} className='employees_delete'>
                                <img width='30px' height='30px' src={imgDelete}/>
                              </button>
                              <button onClick={() => editItem(item)} className='employees_delete'>
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
                            <button onClick={saveItem}>Save</button>
                            <button onClick={() => setEditForm(!editForm)}>Cancel</button>
                          </div>
                      }
                      </tbody>
                    </table>
                  : ""
              }
            </>
        }
      </div>
    </div>
  );
};

export default Employees;