import React, {useState, useEffect} from "react";
import "./App.css";
import { useForm } from "react-hook-form";




function App() {

  const baseURL = 'https://frontend-take-home.fetchrewards.com/form'
  const { register, handleSubmit, formState: { errors } } = useForm();

  //  get list of states

  const [listOfStates, setListOfStates] = useState({})
  const [listOfOccupations, setListOfOccupations] = useState([])
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
          console.log(listOfStates);
          console.log(listOfOccupations)

      } catch (error) {
          console.log("error", error);
      }
  };

  fetchData();
}, []);



// useEffect( () => {
  
//     fetch(baseURL)
//     .then(res => res.json())
//     .then(res => {
//       console.log(res.occupations)
//       setListOfStates({...listOfStates, data: res.states})
//       setListOfOccupations(res.occupations)
//     })
//     .catch(err => setErr(true))
//     // response = await response.json()
//     // setListOfStates(response.states)
//   console.log(listOfStates)
//   // .then(res => res.json())
//   // .then(result => {
//   //   setListOfStates(result)
//   // console.log(listOfStates)
//   // })
// },[])



  return (
    <div>

      <div>Hello</div>
      <div>World</div>
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
      {listOfOccupations.map( item => <li>{item}</li>)}
      {/* {listOfStates.map( item => <li>{item}</li>)} */}
    </div>
  );
}

export default App;
