import React, {useState, useEffect} from "react";
import "./App.css";
import { useForm } from "react-hook-form";




function App() {

  const baseURL = 'https://frontend-take-home.fetchrewards.com/form'
  const { register, handleSubmit, formState: { errors } } = useForm();

  //  get list of states

  const [listOfStates, setListOfStates] = useState({})
  const [listOfOccupations, setListOfOccupations] = useState([])
  const [occupationsObjects, setOccupationsObjects] = useState({})
  // const {err, setErr} = useState(false)

  const onSubmit = (data) => {
    console.log(data);
  };


//  useEffect hook runs when the page loads
//  fetch state and occupation data


useEffect(() => {

  const fetchData = async () => {
      try {
          const response = await fetch(baseURL);
          const json = await response.json();
          // console.log(json.states);
          // console.log(json.occupations)
          setListOfStates(json.states);
          setListOfOccupations(json.occupations)
          let occupationsObjects = listOfOccupations.map((str, index) => ({value: str, id: index + 1}))
          // console.log(listOfStates);
          // console.log(listOfOccupations)
          setOccupationsObjects(occupationsObjects)
          console.log(occupationsObjects)

      } catch (error) {
          console.log("error", error);
      }
  };

  fetchData();
  
}, []);



  return (
    <div>

      <div>Hello</div>
      <div>World</div>
      <div>Again</div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <input type="submit" />
       
      </form>
      <select>
            {occupationsObjects.map((option) => (
              <option value={option.id}>{option.value}</option>
            ))}
          </select>
          <select>
            {listOfStates.map((option) => (
              <option value={option.name}>{option.abbreviation}</option>
            ))}
          </select> 
      
    </div>
  );
}

export default App;
