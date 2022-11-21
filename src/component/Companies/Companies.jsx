import React, {useEffect} from 'react';
import './CompaniesStyle.scss'
import {useDispatch, useSelector} from "react-redux";
import {companiesSelector, editCompaniesSelector} from "../../store/Selectors";
import {
  addCompanies, deleteCompanies, editCompanies,
  openingEmployees,
  saveEditCompanies,
  selectChecked,
  setInfo
} from "../../store/TableSlice";
import Data from "../../store/Data.json"

const imgEdit = "/img/edit.png"
const imgDelete = "/img/delete.png"

const Companies = () => {
  const dispatch = useDispatch();
  const companiesInfo = useSelector(companiesSelector);
  const edit = useSelector(editCompaniesSelector);
  const [formCompanies, setFormCompanies] = React.useState(false);
  const [valueName, setValueName] = React.useState('');
  const [valueNum, setValueNum] = React.useState('');
  const [valueAddress, setValueAddress] = React.useState('');
  const [valueEditName, setValueEditName] = React.useState('');
  const [valueEditAddress, setValueEditAddress] = React.useState('');
  const [editForm, setEditForm] = React.useState(false);

  useEffect(() => {
    request();
  }, [])

  console.log(companiesInfo.employees)
  const request = () => dispatch(setInfo(Data))

  const extraction = (id) => {
    dispatch(openingEmployees(id))
  }

  const selectAll = () => {
    dispatch(selectChecked())
  }

  const addCompaniesItem = () => {
    if (valueName === '' || valueNum === '' || valueAddress === '') return
    const itemCompanies = {
      "id": 1,
      "checkbox": false,
      "name": valueName,
      "numEmployees": valueNum,
      "address": valueAddress,
      "employees": []
    }
    dispatch(addCompanies(itemCompanies))
    setValueName('');
    setValueNum('');
    setValueAddress('');
    setFormCompanies(!formCompanies)

  }

  const deleteItem = (id) => {
    dispatch(deleteCompanies(id))
  }

  const editItem = (item) => {
    dispatch(editCompanies(item))
    setValueEditName(item.name)
    setValueEditAddress(item.address)
    setEditForm(!editForm)
  }

  const saveItem = () => {
    if (valueEditName === "" || valueEditAddress === "") return
    const EditElement = {
      id: edit.id,
      checkbox: edit.checkbox,
      name: valueEditName,
      numEmployees: edit.numEmployees,
      address: valueEditAddress,
      employees: edit.employees
    }
    dispatch(saveEditCompanies(EditElement))
    setValueEditName('')
    setValueEditAddress('')
    setEditForm(!editForm)
  }

  return (
    <div className='container_C'>
          <button className='add-companies' onClick={() => setFormCompanies(!formCompanies)}>
            {!formCompanies ?  "Добавить компанию" : "Список компаний"}
          </button>
      {
        formCompanies ?
          <div className='form-companies'>
            <input placeholder='Наименование компании' type='text' value={valueName}
                   onChange={(e) => setValueName(e.target.value)}/>
            <input placeholder="Кол-во сотрудников" type='text' value={valueNum}
                   onChange={(e) => setValueNum(e.target.value)}/>
            <input placeholder="Адрес компании" type='text' value={valueAddress}
                   onChange={(e) => setValueAddress(e.target.value)}/>
            <button className='btn-add_companies' onClick={addCompaniesItem}>
              Добавить
            </button>
          </div> : <div className='container_companies'>
            <table>
              <thead>
              <tr>
                <th>All <br/><input type="checkbox" checked={companiesInfo.checkbox} onClick={selectAll}/></th>
                <th>Name<br/>Companies</th>
                <th>Num</th>
                <th>Address</th>
                <th>Del/<br/>Edit</th>
              </tr>
              </thead>
              <tbody className='info_companies'>
              {
                !editForm ?
                  companiesInfo.map((item) => (
                    <tr key={item.id}>
                      <td
                        style={{cursor: "pointer"}}
                        onClick={() => extraction(item)}
                        className={!item.checkbox ? "td-blue" : "td-grin"}>
                        <input type='checkbox' checked={item.checkbox}/>
                      </td>
                      <td className={!item.checkbox ? "td-blue" : "td-grin"}>
                        {item.name}
                      </td>
                      <td className={!item.checkbox ? "td-blue" : "td-grin"}>
                        {item.employees.length}
                      </td>
                      <td className={!item.checkbox ? "td-blue" : "td-grin"}>
                        {item.address}
                      </td>
                      <td className={!item.checkbox ? "td-blue" : "td-grin"}>
                        <div className='btn-group'>
                          <button onClick={() => deleteItem(item.id)} className='btn-delete'>
                            <img width='30px' height='30px' src={imgDelete}/>
                          </button>
                          <button onClick={() => editItem(item)} className='btn-delete'>
                            <img width='30px' height='30px' src={imgEdit}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) :
                  <div>
                    <input value={valueEditName} type="text" placeholder="name"
                           onChange={(e) => setValueEditName(e.target.value)}/>
                    <input value={valueEditAddress} type="text" placeholder="address"
                           onChange={(e) => setValueEditAddress(e.target.value)}/>
                    <button onClick={saveItem}>Save</button>
                    <button onClick={() => setEditForm(!editForm)}>Cancel</button>
                  </div>
              }
              </tbody>
            </table>
          </div>
      }
    </div>
  );
};

export default Companies;