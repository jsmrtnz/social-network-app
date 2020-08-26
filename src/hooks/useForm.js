import { useState } from 'react';

const useForm = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues);
  const handleSubmit = (event) => {
    if(event) {
      event.preventDefault();
      callback();
      clearInputs();
    }
  }
  const handleInputChange = (event) => {
    event.persist();
    let value = '';
    switch (event.target.name) {
      case 'avatar':
      case 'post':
        value = event.target.files[0];
        break;
      case 'birthday': {
        value = new Date(event.target.value + 'T00:00');
        break;
      }
      default:
        value = event.target.value;
    }
    setInputs(inputs => ({...inputs, [event.target.name]: value }))
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