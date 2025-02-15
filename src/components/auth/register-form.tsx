"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";

interface RegisterFormInputs {
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterFormInputs>();
    const router = useRouter();

    const onSubmit = async (data: RegisterFormInputs) => {
        if (data.password !== data.confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            await axios.post("/auth/register", {
                email: data.email,
                password: data.password,
            });

            router.push("/login");
        } catch (error: any) {
            console.error(
                "Registration error",
                error.response?.data?.message || error.message
            );
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm'>
            <h2 className='text-2xl mb-4'>Register</h2>
            <div className='mb-4'>
                <input
                    type='email'
                    placeholder='Email'
                    {...register("email", { required: "Email is required" })}
                    className='w-full p-2 border border-gray-300 rounded text-gray-700'
                />
                {errors.email && (
                    <p className='text-red-500'>{errors.email.message}</p>
                )}
            </div>
            <div className='mb-4'>
                <input
                    type='password'
                    placeholder='Password'
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                    className='w-full p-2 border border-gray-300 rounded text-gray-700'
                />
                {errors.password && (
                    <p className='text-red-500'>{errors.password.message}</p>
                )}
            </div>
            <div className='mb-4'>
                <input
                    type='password'
                    placeholder='Confirm Password'
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                    })}
                    className='w-full p-2 border border-gray-300 rounded text-gray-700'
                />
                {errors.confirmPassword && (
                    <p className='text-red-500'>
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>
            <button
                type='submit'
                className='w-full p-2 bg-blue-500 text-white rounded'
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
