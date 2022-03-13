import axios from 'axios';
import React from 'react'
import './App.css';

const API_URL = 'http://localhost:3000/uploadFile'

const App = () => {
  return (
    <div className="App">
        <h1>Controlled Components</h1>
        <Form
        />
    </div>
  );
}

const defaultBreed = "shepherd"
const initialState = {
  nickname: '',
  breed: defaultBreed,
  available: false,
  gender: 'male',
  notes: '',
}

const Form = () => {
  const [state, setState] = React.useState({
    nickname: '',
    breed: defaultBreed,
    available: false,
    gender: 'male',
    notes: ''
  })

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    console.log('handleSubmit', state)

    try {
      const res = await axios.post(API_URL, state)
      handleSubmit()
    } catch(err) {
      console.log('err', err.message)
    } 
  }

  const handleReset = (ev) => {
    setState({
      ...initialState
    })
  }

  const handleChange = (ev) => {
    let type = ev.target.type
    let name = ev.target.name
    let value = ev.target.value
    let key = ''

    // console.log('handleChange/type/name/value', type, name, value)

    switch (type) {
      case('text'): 
      case('select-one'):
      case('textarea'):
        key = name
        break
      case('checkbox'):
        key = name
        value = ev.target.checked
        break
      case('radio'):
        key = 'gender'
        break
      default:
        console.log('handleChange switch default')
    }

    setState({
      ...state,
      [key]: value 
    })
  }

  return (
    <>
      State: {JSON.stringify(state)}
      <h2>Form</h2>

      <form onSubmit={handleSubmit} onReset={handleReset}
      >
        <div>
          <label htmlFor='nickname'>Nickname: </label>
          <input type='text' id='nickname' name='nickname' value={state.nickname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='breed'>Breed: </label>
          <select id='breed' name='breed' value={state.value}
            onChange={handleChange}
          >
            <option defaultValue={state.breed}>German Shepherd</option>
            <option value="poodle">Poodle</option>
            <option value="hound">Hound</option>
            <option value="retriever">Labrador Retriever</option>
          </select>
        </div>
        <div>
          <label htmlFor='available'>Available: </label>
          <input
              type="checkbox"
              id="available"
              name="available"
              checked={state.available}
              onChange={handleChange} 
          />
        </div>
        <div>
          <label>Gender: </label>
            <input
              type="radio"
              value="male"
              checked={state.gender === 'male'}
              onChange={handleChange}
            /> Male

            <input
              type="radio"
              value="female"
              checked={state.gender === 'female'}
              onChange={handleChange}
            /> Female
        </div>

        <div>
          <label htmlFor='notes'>Notes: </label><br />
          <textarea id='notes' name='notes' value={state.value} rows='5' cols='80'
            onChange={handleChange} 
          />
        </div>

        <div className='buttonDiv'>
          <button type='submit'>Submit</button>
          <button type='reset'>Reset</button>
        </div>

      </form>

    </>
  )
}

export default App;
