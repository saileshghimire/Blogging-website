import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@sailesh059/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}: {type:"signup" | "signin"})=>{
    const navigate = useNavigate();
    const [postInput, setPostInputs] = useState<SignupInput>({
        email:"",
        name:"",
        password:""
    });

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"? "signup":"signin"}`,postInput);
            const jwt = response.data.token;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        } catch(error){

        }
    }

    return(
        <>
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                <div className="px-10">
                    <div className="text-3xl front-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400 pt-2">
                    {type=="signup"? "Don't have an account?" : "Already have an account?"}
                    <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>{type==="signup"? "Signin" :"Signup"}</Link>
                    </div>
                </div>
                <div className="pt-5">              
                    {type==="signup"?<LabeledInput label="Name" placeholder="sailesh.." onChange={(e)=>{
                        setPostInputs({
                            ...postInput,
                            name: e.target.value
                        })
                    }} /> : null}

                    <LabeledInput label="Email" placeholder="abc@example.com" onChange={(e)=>{
                        setPostInputs({
                            ...postInput,
                            email: e.target.value
                        })
                    }} />

                    <LabeledInput label="Password" type="password" placeholder="password" onChange={(e)=>{
                        setPostInputs({
                            ...postInput,
                            password: e.target.value
                        })
                    }} />

                <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    {type ==="signup"? "signup": "signin"}
                    </button>

                </div>
                </div>
            </div>
        </div>
        </>
    )
}

interface LabeledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) =>void;
    type?:string;
}

function LabeledInput({label, placeholder, onChange,type}: LabeledInputType) {
    return(
        <>
        <div>
            <label className="block mb-2 text-sm font-semibold text-black dark:text-black pt-2">{label}</label>
            <input onChange={onChange} type={type || "text"} className="bg-gray-100 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
        </>
    )
}