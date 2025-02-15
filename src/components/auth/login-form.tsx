"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useAuth";
import { useState } from "react";
import { AxiosError } from "axios";
import { ACCESS_TOKEN, USER } from "@/constants/string";
import Link from "next/link";
import { IUserData } from "@/interfaces";

interface FormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const { push } = useRouter();
    const [error, setError] = useState<string>("");

    const onSuccess = ({ access_token, user }: { access_token: string, user: IUserData }) => {
        localStorage.setItem(ACCESS_TOKEN, access_token);
        localStorage.setItem(USER, JSON.stringify(user))
        push("/");
    };

    const onError = (errorResponse: AxiosError) => {
        const data = errorResponse.response?.data as { message: string };
        setError(data?.message);
    };
    const {
        mutate: login,
        isPending,
        isError,
    } = useLogin({ onSuccess, onError });
    const onSubmit = (data: FormData) => {
        login(data);
    };

    return (
        <div className='w-full max-w-sm'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-2xl mb-4'>Login</h2>
                <div className='mb-4'>
                    <input
                        type='email'
                        placeholder='Email'
                        {...register("email", {
                            required: "Email is required",
                        })}
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
                        })}
                        className='w-full p-2 border border-gray-300 rounded text-gray-700'
                    />
                    {errors.password && (
                        <p className='text-red-500'>
                            {errors.password.message}
                        </p>
                    )}
                </div>
                {isError && error && <p className='text-red-500'>{error}</p>}
                <button
                    type='submit'
                    className='w-full p-2 bg-blue-500 text-white rounded'
                    disabled={isPending}
                >
                    Login
                </button>
            </form>
            <div className='w-full mt-4 flex justify-end'>
                <Link href='/auth/forget-password' className='text-sm hover:underline'>
                    Forget password?
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
