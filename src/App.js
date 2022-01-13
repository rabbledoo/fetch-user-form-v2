import React from "react";
import './App.css';
import useForm from "react-hook-form";

function App() {
  const {register, handleSubmit} = useForm();

  const onSubmit = (data) => {
    console.log(data)
  }




  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Name" name="name" ref={register} />
          <input type="email" placeholder="Email" name="email" ref={register} />
          <input type="password" placeholder="Password" ref={register} />
          <button type="submit" ></button>
        </form>
      </div>
    </>
  );
}

export default App;
