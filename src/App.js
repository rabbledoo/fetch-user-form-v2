import React, {useState, useEffect} from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import Confetti from "react-confetti";




function App() {

  const baseURL = 'https://frontend-take-home.fetchrewards.com/form'
  const { register, handleSubmit, formState: { errors } } = useForm();

  //  get list of states

  const [listOfStates, setListOfStates] = useState([])
  const [listOfOccupations, setListOfOccupations] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)


  //  pass in data to see what we have
  const onSubmit = async (data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
  const response = await fetch([baseURL], requestOptions);
    console.log(response.status)

    if (response.status === 200){
      console.log("You win ")
      setIsSuccess(true)
    } else {
      console.log("you lose")
    }
  };

//  useEffect hook runs when the page first loads
//  sets initial state in the app
//  fetches state and occupation data from baseURL API

useEffect(() => {

  const fetchData = async () => {
      try {
          const response = await fetch(baseURL);
          const json = await response.json();
          console.log(json.states);
          console.log(json.occupations)
          setListOfStates(json.states);
          setListOfOccupations(json.occupations)

      } catch (error) {
          console.log("error", error);
      }
  };
  fetchData();
}, []);

  return (
    <div>

      <div className="container">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      {isSuccess === true ? <Confetti /> : <div>Form not submitted yet</div>}
      <div>Dynamic Form</div>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          {...register("name", {
            required: "Please enter your name",
            maxLength: {
              value: 25,
              message: "Please enter a name with fewer than 25 characters",
            },
          })}
        />
         <span>
        {errors.name && errors.name.message}
        </span>
        <input 
        type="email" 
        placeholder="Enter email" 
        name="email" 
        {...register("email", {
          required: "Please enter your email",
        })}
        />
        <span>
        {errors.email && errors.email.message}
        </span>
        <input 
        type="password" 
        placeholder="Enter password" 
        name="password" 
        {...register("password", {
          required: "Please enter your password",
          minLength: {
            value: 10,
            message: "Please enter a password with at least 10 characters",
          },
        })}
        />
         <span>
        {errors.password && errors.password.message}
        </span>


        <select {...register("occupation", {
          required: "Please enter your occupation"
        })}>
            {listOfOccupations.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
          <span>{errors.occupation && errors.occupation.message}</span>
          <select  {...register("state", {
            required: "Please enter your state"
          })}>
            {listOfStates.map((option) => (
              <option value={option.name}>{option.abbreviation}</option>
            ))}
          </select> 
          <span>
        {errors.state && errors.state.message}
        </span>
          <input type="submit" />
      </form>
       
      </div>
    </div>
  );
}

export default App;
