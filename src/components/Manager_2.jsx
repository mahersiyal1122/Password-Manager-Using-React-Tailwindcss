import React, { useState, useEffect, useRef } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { GiHamburgerMenu } from "react-icons/gi";

const Manager_2 = () => {
    const [showPass, setShowPass] = useState(true)
    const [passType, setPassType] = useState("password")
    const [form, setForm] = useState({ webUrl: "", username: "", pass: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [isVisible, setIsVisible] = useState(null)
    const [hamburgur, setHamburgur] = useState(null)

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])
    const savePassword = () => {
        if (form.webUrl == "" || form.username == "" || form.pass == "") {
            alert("Please Fill all the inboxes")
        } else {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setForm({ webUrl: "", username: "", pass: "" })
            // console.log([...passwordArray, form])
            toast('Password Data Saved Successfullly!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                style: {zIndex:10}
            });
        }
    }
    const deletePassword = (id) => {
        let c = confirm("Do you Really want to Delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            // console.log("Delete Password ", id)
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const editPassword = (id) => {
        // console.log("Editing Password ", id)
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const divVisibilityToggle = (id) => {
        setIsVisible(isVisible === id ? null : id);
    };

    const hamburgurToggle = (id) => {
        setHamburgur(hamburgur === id ? null : id);
    }


    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
                style={{marginTop: "80px"}}
            />

            <div className="p-2 md:p-0 md:mycontainer">
                <h1 className='logo font-bold text-3xl text-center'>
                    <span className='text-green-700'>&lt; </span>
                    <span className='text-white'>Pass</span>
                    <span className='text-green-700'>OP /&gt;</span>
                </h1>
                <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>
                <div className='flex flex-col p-4 gap-8 items-center'>
                    <input value={form.webUrl} name='webUrl' onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-2' type="text" />
                    <div className='flex flex-col md:flex-row gap-8 w-full justify-between'>
                        <input value={form.username} name='username' onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 md:w-[80%] p-4 py-2' type="text" />
                        <div className='relative'>
                            <input value={form.pass} name='pass' onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-2' type={passType} />
                            <span id='showPass' className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => {
                                setShowPass(!showPass);
                                setPassType(() => passType === "text" ? "password" : "text")
                            }} >
                                {showPass ? (<FaEye />) : (<FaEyeSlash />)}
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-6 py-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>

                </div>
                <div className="passwords text-white">
                    <h2 className='text-white font-bold text-2xl py-2'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-white'>No Passwords to show</div>}
                    {passwordArray.length != 0 && <div className='flex flex-col gap-4'>
                        {passwordArray.map((item, index) => {
                            return <div key={index} className='bg-black flex flex-col gap-4 px-4 py-3 rounded-2xl'>
                                <div className='flex gap-2 justify-between items-center w-full'>
                                    <div className='flex items-center gap-4'>
                                        <span className='font-bold text-2xl bg-green-700 p-2 rounded-2xl cursor-pointer hover:myShadow'><a target='_blank' href={item.webUrl}>Site</a></span>
                                        <a target='_blank' href={item.webUrl} className='cursor-pointer text-lg hover:text-blue-500 hover:underline break-all'>{item.webUrl}</a>
                                        <span className='cursor-pointer' onClick={() => { copyText(item.webUrl) }}><lord-icon
                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                            colors="primary:#ffffff"
                                            style={{ "width": "25px", "paddingTop": "5px" }}
                                            trigger="hover">
                                        </lord-icon></span>
                                    </div>

                                    <div className='flex justify-between items-center gap-4 relative sm:static'>     
                                        {hamburgur === item.id && (
                                            <div className='absolute -right-1 bottom-8 z-10 bg-black text-center p-2 pb-0 rounded-lg sm:hidden '>
                                                <span onClick={() => { divVisibilityToggle(item.id); }} className='cursor-pointer'>{isVisible ? (<FaEyeSlash className='text-xl my-2' />) : (<FaEye className='text-xl my-2' />)}</span>
                                                <span onClick={() => { editPassword(item.id); }} className='cursor-pointer'><lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    colors="primary:#ffffff"
                                                    style={{ "width": "20px" }}
                                                    trigger="hover">
                                                </lord-icon></span>
                                                <span onClick={() => { deletePassword(item.id); }} className='cursor-pointer'><lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    colors="primary:#ffffff"
                                                    style={{ "width": "20px" }}
                                                    trigger="hover">
                                                </lord-icon></span>
                                            </div>
                                        )}
                                        <span id='hamburgurId' onClick={() => { hamburgurToggle(item.id) }} className='sm:hidden text-3xl'><GiHamburgerMenu /></span>

                                        <div className='sm:flex items-center justify-center gap-4 hidden'>
                                                <span onClick={() => { divVisibilityToggle(item.id); }} className='cursor-pointer'>{isVisible ? (<FaEyeSlash className='text-xl' />) : (<FaEye className='text-xl' />)}</span>
                                                <span onClick={() => { editPassword(item.id); }} className='cursor-pointer'><lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    colors="primary:#ffffff"
                                                    style={{ "width": "20px" }}
                                                    trigger="hover">
                                                </lord-icon></span>
                                                <span onClick={() => { deletePassword(item.id); }} className='cursor-pointer'><lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    colors="primary:#ffffff"
                                                    style={{ "width": "20px" }}
                                                    trigger="hover">
                                                </lord-icon></span>
                                            </div>
                                    </div>
                                </div>
                                {isVisible === item.id && (
                                    <div id='passwordDetails' className='flex flex-col md:flex-row w-full'>
                                        <div className='w-1/2 flex items-center gap-2'><span className='text-lg font-bold'>Username:</span>{item.username}<span className='cursor-pointer' onClick={() => { copyText(item.username) }}><lord-icon
                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                            colors="primary:#ffffff"
                                            style={{ "width": "25px", "paddingTop": "5px" }}
                                            trigger="hover">
                                        </lord-icon></span></div>
                                        <div className='w-1/2 flex items-center gap-2'><span className='text-lg font-bold'>Password:</span>{item.username}<span className='cursor-pointer' onClick={() => { copyText(item.pass) }}><lord-icon
                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                            colors="primary:#ffffff"
                                            style={{ "width": "25px", "paddingTop": "5px" }}
                                            trigger="hover">
                                        </lord-icon></span></div>
                                    </div>
                                )}
                            </div>
                        })}
                    </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager_2
