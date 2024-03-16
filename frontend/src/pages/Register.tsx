import React from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useMutation } from "react-query";
import * as apiClient from '../api-client';


export type RegisterFormData = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
}

function Register() {

    const { register , handleSubmit , formState: { errors } } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register , {
        onSuccess: () => {
            Swal.fire({
                title: "Success!",
                text: "Registered Successfully",
                icon: "success"
              });
        },
        onError: (err: Error) => {
            Swal.fire({
                title: "Failed!",
                text: `Something Went Wrong ${err}`,
                icon: "error"
              });
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data) ;
    })

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-5 max-w-5xl mx-auto p-2 '>
        <h2 className='text-3xl font-bold'>Create An Account</h2>
        <div className='flex flex-col md:flex-row gap-5'>
            <label className='text-gray-700 text-sm font-cold flex-1'>
                First Name
                <input type="text" className='border-2 rounded w-full py-1 px-2 font-noraml' {...register("firstname" ,  {required: "This Field Is Required"})} />
            </label>
            {errors.firstname && (
                <span className='text-red-500'>{errors.firstname.message}</span>
            )}
            <label className='text-gray-700 text-sm font-cold flex-1'>
                Last Name
                <input type="text" className='border-2 rounded w-full py-1 px-2 font-noraml' {...register("lastname" , {required: "This Field Is Required"})} />
            </label>
            {errors.lastname && (
                <span className='text-red-500'>{errors.lastname.message}</span>
            )}
            
        </div>
        <label className='text-gray-700 text-sm font-cold flex-1'>
                Email
                <input type="email" className='border-2 rounded w-full py-1 px-2 font-noraml' {...register("email" , {required: "This Field Is Required"})} />
        </label>
        {errors.email && (
                <span className='text-red-500'>{errors.email.message}</span>
            )}
        <label className='text-gray-700 text-sm font-cold flex-1'>
                Password
                <input type="password" className='border-2 rounded w-full py-1 px-2 font-noraml' {...register("password" , {required: "This Field Is Required",
            minLength: {
                value: 6,
                message: "Password Should Be Atleast 6 Character"
            }})} />
        </label>
        {errors.password && (
                <span className='text-red-500'>{errors.password.message}</span>
            )}
        <span>
            <button type='submit' className='bg-blue-600 text-white p-2 font-bold'>
                Create Account
            </button>
        </span>
    </form>
  )
}

export default Register;