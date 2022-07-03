const CreateUser = ({setNewUser, handleOnSubmit}) => {
  setNewUser(true);
  return (
    <div className="absolute w-2/4 h-1/4 border-black left-20 bg-white drop-shadow-md p-6 z-20 top-0 md:left-72 md:w-2/4 md:h-2/5 rounded-lg ">
      <div className="flex justify-between mb-4">
        <h4> Create new user(s)</h4>
        <button onClick={() => setNewUser(false)}> X</button>
      </div>
      <hr></hr>
      <form onSubmit={handleOnSubmit}>
        <input placeholder="First Name" name="fname" />
        <input placeholder="Last Name" name="lname" />
        <input placeholder="Email" name="email" />
        <input placeholder="Phone" name="phone" />
        <button onSubmit={handleOnSubmit}>Create user</button>
        <hr />
      </form>
    </div>
  );
}; 

export default CreateUser