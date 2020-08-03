import { useState } from 'react';

const useForm = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues);
  const handleSubmit = (event) => {
    if(event) {
      event.preventDefault();
      callback();
    }
  }
  const handleInputChange = (event) => {
    event.persist();
    // let value = event.target.name === 'imgPost'
    //   ? event.target.files[0].name 
    //   : event.target.value
    // setInputs(inputs => ({...inputs, [event.target.name]: value }))
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value }))
  }
  const clearInputs = () => {
    setInputs(initialValues);
  }
  return {
    handleSubmit,
    handleInputChange,
    clearInputs,
    inputs
  }
}
export default useForm;