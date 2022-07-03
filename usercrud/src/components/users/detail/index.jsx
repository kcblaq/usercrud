import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import {
	AiOutlineLeft,
	AiOutlineRight,
	AiFillEdit,
	AiFillDelete,
} from 'react-icons/ai';
import Modal from '../Modal';
import CreateUser from '../users/CreateUser';


export default function Detail() {
	const [user, setUser] = useState([]);
	const [newUser, setNewUser] = useState(false);
	const [fname, setFName] = useState('');
	const [lname, setLName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
  const [onEdit, setOnEdit] = useState(false)
  const [editingData, setEditingData] = useState({
    name:'',
    email:'',
    phone:''
  })
  const [editedData, setEditedData] = useState({
    name:'',
    email:'',
    phone:''

  })

	useEffect(() => {
		fetchData();
    // setOnEdit()
	}, []);

	const handleOnSubmit = (e) => {
		e.preventDefault();

		setFName(e.target.fname.value);
		setLName(e.target.lname.value);
		setEmail(e.target.email.value);
		setPhone(e.target.phone.value);
		AddNewUser();
		return user;
	};

	const CreateUser = () => {
		setNewUser(true);
		return (
			<div className="absolute w-2/4 h-1/4 border-black left-20 bg-white drop-shadow-md p-6 z-20 top-0 md:left-72 md:w-2/4 md:h-2/5 rounded-lg ">
				<div className="flex justify-between mb-4">
					<h4> Create new user(s)</h4>
					<button onClick={() => setNewUser(false)}> X</button>
				</div>
				<hr></hr>
				<form onSubmit={handleOnSubmit}>
					<input placeholder="First Name" name="fname" className='border-2 p-2 rounded w-2/4'/>
					<input placeholder="Last Name" name="lname" className='border-2 p-2 rounded w-2/4'/>
					<input placeholder="Email" name="email" className='border-2 p-2 rounded w-2/4'/>
					<input placeholder="Phone" name="phone"className='border-2 p-2 rounded w-2/4' />
					<hr />
					<button onSubmit={handleOnSubmit} className='float-right border-2 rounded-lg p-2 mt-4 bg-blue-500 text-white'>Create user</button>
				</form>
			</div>
		);
	};

	const HandleDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setUser(
            user.filter((user) => {
              return user.id !== id+1;
            })
          );
        }
      })
      // .catch((error) => console.log(error));
  };

	const AddNewUser = async () => {
		await fetch('https://jsonplaceholder.typicode.com/users', {
			method: 'POST',
			body: JSON.stringify({
				name: fname + ' ' + lname,
				email: email,
				phone: phone,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then((response) => {
				if (response.status !== 201) {
					return;
				} else {
					return response.json();
				}
			})
			.then((data) => {
				setUser((user) => [...user, data]);
			})
			.catch((error) => console.log(error));
	};

	const fetchData = async () => {
		await fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((data) => setUser(data))
			.catch((error) => console.log(error));
	};

  const handleEditSubmit= async(e)=>{
    e.preventDefault()
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT"
    }).then((response) =>{
      if(response.status !== 200){
        return
      } else{
        try {
          setEditedData({
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value
          })
          setUser([...user, editedData])
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  const HandleEdit = (id)=>{
    setOnEdit(true);
    const useredited = user.filter((item) => item.id === id+1)[0]
    const d = {
      name: useredited.name,
      email: useredited.email,
      phone: useredited.phone
    }
    console.log(d)
		return (
			<div className="absolute w-2/4 h-1/4 border-black left-20 bg-white drop-shadow-md p-6 z-20 top-0 md:left-72 md:w-2/4 md:h-2/5 rounded-lg ">
				<div className="flex justify-between mb-4">
					<h4> Edit user  </h4>
					<button onClick={() => setOnEdit(false)}> X</button>
				</div>
				<hr></hr>
				<form onSubmit={handleEditSubmit}>
					<input placeholder="First Name" name="name" defaultValue={d.name} />
					<input placeholder="Email" name="email"  defaultValue={d.email}/>
					<input placeholder="Phone" name="phone" defaultValue={d.phone} />
					<button onSubmit={handleEditSubmit}> Save Changes</button>
					<hr />
				</form>
			</div>
		);
  }

	return (
		<div className="h-full bg-white pb-8 relative">
			<div className="flex justify-between align-middle mt-4 border-2 p-4 text-base w-full">
				<button> View All Users</button>
				{newUser && <CreateUser />}
				<button
					className="bg-[#3399FF] text-white p-2 rounded"
					onClick={CreateUser}>
					{' '}
					Create New User
				</button>
        {
          onEdit && <HandleEdit/>
        }
			</div>

			<div className="flex  justify-between mt-6 mr-1 ml-1 align-middle px-2 py-3 border-0 bg-[#F1F2F5] rounded-lg ">
				<div className="bg-white rounded-lg relative px-1 align-middle flex">
					<input type="text" className="rounded-lg relative ml-6" />{' '}
					<BiSearch className="absolute bottom-2 left-19" />
				</div>
				<div className="flex align-middle max-w-full">
					<button className="bg-white border-2 p-2 rounded">
						{' '}
						<AiOutlineLeft />{' '}
					</button>
					<button className="bg-white p-2 border-2 rounded  hidden md:flex">
						1
					</button>
					<button className="bg-white p-2 border-2 rounded hidden md:flex">
						2
					</button>
					<button className="bg-white p-2 border-2 rounded hidden md:flex">
						4
					</button>
					<button className="bg-white p-2 border-2 rounded">
						{' '}
						<AiOutlineRight />{' '}
					</button>
				</div>
			</div>

			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left text-black ">
					<thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Number
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Phone number
							</th>
							<th scope="col" className="px-6 py-3">
								Email
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="">Actions</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{user.map((user, id) => (
							<tr
								key={user.id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
									{user.id}
								</th>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
									{user.name}
								</th>
								<td className="px-6 py-4">{user.phone}</td>
								<td className="px-6 py-4">{user.email}</td>
								<td className="px-6 py-4 ">
									<button
										onClick={()=>HandleEdit(id)}
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
										<AiFillEdit className="md:mr-4" />{' '}
									</button>
									<button onClick={()=>HandleDelete(id)}
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
										<AiFillDelete />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
