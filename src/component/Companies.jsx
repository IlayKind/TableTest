import React, {useEffect} from 'react';
import './CompaniesStyle.scss'
import {useDispatch, useSelector} from "react-redux";
import {CompaniesSelector, EditCompaniesSelector, EmployeesSelector} from "../store/Selectors";
import {
  AddCompanies, DeleteCompanies, EditCompanies,
  ExtractionEmployees,
  SaveEditCompanies,
  SelectChecked,
  setInfo
} from "../store/TableSlice";
import Data from "../store/Data.json"


const Companies = () => {
  const dispatch = useDispatch();
  const CompaniesInfo = useSelector(CompaniesSelector);
  const Edit = useSelector(EditCompaniesSelector);
  const [formCompanies, setFormCompanies] = React.useState(false);
  const [valueName, setValueName] = React.useState('');
  const [valueNum, setValueNum] = React.useState('');
  const [valueAddress, setValueAddress] = React.useState('');
  const [valueEditName, setValueEditName] = React.useState('');
  const [valueEditAddress, setValueEditAddress] = React.useState('');
  const [EditForm, setEditForm] = React.useState(false);

  useEffect(() => {
    request();
  }, [])


  const request = () => dispatch(setInfo(Data))

  function Extraction (id) {
    dispatch(ExtractionEmployees(id))
  }

  function SelectAll () {
    dispatch(SelectChecked())
  }

  function addCompaniesItem () {
    if (valueName === '') return
    if (valueNum === '') return
    if (valueAddress === '') return
    const itemCompanies = {
      "id": 1,
      "checkbox": false,
      "name": valueName,
      "numEmployees": valueNum,
      "address": valueAddress,
      "employees": []
    }
    dispatch(AddCompanies(itemCompanies))
    setValueName('');
    setValueNum('');
    setValueAddress('');
    setFormCompanies(!formCompanies)

  }

  function DeleteItem (id) {
    dispatch(DeleteCompanies(id))
  }

  function EditItem (item) {
    dispatch(EditCompanies(item))
    setValueEditName(item.name)
    setValueEditAddress(item.address)
    setEditForm(!EditForm)
  }

  function SaveItem () {
    if (valueEditName === "") return
    if (valueEditAddress === "") return
    const EditElement = {
      id: Edit.id,
      checkbox: Edit.checkbox,
      name: valueEditName,
      numEmployees: Edit.numEmployees,
      address: valueEditAddress,
      employees: Edit.employees
    }
    dispatch(SaveEditCompanies(EditElement))
    setValueEditName('')
    setValueEditAddress('')
    setEditForm(!EditForm)
  }

  return (
    <div className='container_C'>
      {
        formCompanies ? <button className='add-companies' onClick={() => setFormCompanies(!formCompanies)}>
            Cписок Компаний
          </button> :
          <button className='add-companies' onClick={() => setFormCompanies(!formCompanies)}>
            Добавить компанию
          </button>
      }
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
                <th>All <br/><input type="checkbox" checked={CompaniesInfo.checkbox} onClick={SelectAll}/></th>
                <th>Name<br/>Companies</th>
                <th>Num</th>
                <th>Address</th>
                <th>Del/<br/>Edit</th>
              </tr>
              </thead>
              <tbody className='info_companies'>
              {
                !EditForm ?
                  CompaniesInfo.map((item) => (
                    <tr key={item.id}>
                      <td
                        style={{cursor: "pointer"}}
                        onClick={() => Extraction(item)}
                        className={!item.checkbox ? "td-blue" : "td-grin"}>
                        <input type='checkbox' checked={item.checkbox}/>
                      </td>
                      <td className={!item.checkbox ? "td-blue" : "td-grin"}>{item.name}
                      </td>
                      <td className={!item.checkbox ? "td-blue" : "td-grin"}>
                        {item.employees.length}
                      </td>
                      <td className={!item.checkbox ? "td-blue" : "td-grin"}>{item.address}
                      </td>
                      <td className={!item.checkbox ? "td-blue" : "td-grin"}>
                        <div className='btn-group'>
                          <button onClick={() => DeleteItem(item.id)} className='btn-delete'>
                            <img width='30px' height='30px' src='/img/delete.png'/>
                          </button>
                          <button onClick={() => EditItem(item)} className='btn-delete'>
                            <img width='30px' height='30px' src='/img/edit.png'/>
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
                    <button onClick={SaveItem}>Save</button>
                    <button onClick={() => setEditForm(!EditForm)}>Cancel</button>
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