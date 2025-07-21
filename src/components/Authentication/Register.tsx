import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import registerLottie from '../../../src/assets/register.json';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router";
import Lottie from 'lottie-react';
import { toast, ToastContainer } from "react-toastify";
import { Brain } from 'lucide-react';
import useAuth from "../../Hook/useAuth";

const Register = () => {
  useEffect(() => {
    document.title = "Register";
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const auth = useAuth();
  if (!auth) {
    return null;
  }

  const { updateUserProfile, createUser, signInWithGoogle } = auth;

//   const location = useLocation();
  const navigate = useNavigate();
//   const from = location.state?.from || '/auth/login';

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profilePic, setProfilePic] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
        setErrorMessage("❌ Passwords do not match");
        return;
    }

    try {
        const result = await createUser(data.email, data.password);
        console.log("Firebase User Created:", result);

        await updateUserProfile({
            displayName: data.name,
            photoURL: profilePic || undefined,
        });

        setErrorMessage("");
        import("sweetalert2").then(Swal => {
            Swal.default.fire({
                icon: "success",
                title: "Registration Successful",
                text: "User registered successfully!",
            });
        });

        setTimeout(() => {
            navigate("/", { replace: true });
        }, 2000);
    } catch (error: any) {
        console.error("Registration error:", error);
        setErrorMessage(error.message || "Registration failed. Please try again.");
        import("sweetalert2").then(Swal => {
            Swal.default.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.message || "Please try again.",
            });
        });
    }
};

const handleGoogleSignUp = async () => {
    try {
        await signInWithGoogle();
        toast.success("Signed in with Google ✅");
        setTimeout(() => {
            navigate("/", { replace: true });
        }, 2000);
    } catch (error: any) {
        console.error("Google sign-in error:", error);
        toast.error("Google Sign-in failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl shadow-indigo-300 p-5 ">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          <Link to='/'><Brain className="text-indigo-500" /></Link> Register
        </h2>
        <div className="text-center grid justify-center">
          <Lottie className='w-25' animationData={registerLottie} loop={true} />
        </div>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}
        <p className="text-center font-bold text-2xl my-2 ">Create an Account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 ">User Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 mt-2 rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.name?.message && (
              <p className="text-red-500 text-sm">{errors.name?.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo Upload (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-3 mt-2 rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {profilePic && (
              <img src={profilePic} alt="Profile Preview" className="mt-2 w-16 h-16 rounded-full object-cover" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 mt-2 rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {/* {errors.email?.message && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )} */}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min length is 6" } })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 mt-2 rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-11 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {/* {errors.password?.message && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )} */}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              {...register("confirmPassword", { required: "Please confirm password" })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 mt-2 rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-11 cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {/* {errors.confirmPassword?.message && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )} */}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 mt-2 rounded-xl bg-gradient-to-r from-indigo-100 via-pink-80 to-indigo-500 text-shadow-black font-semibold cursor-pointer shadow-md placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Or</p>
          <button
            onClick={handleGoogleSignUp}
            className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl py-2 bg-gradient-to-r from-indigo-500 via-pink-80 to-indigo-100 text-shadow-black font-semibold cursor-pointer shadow-md placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <FcGoogle className="mr-3" />
            Sign up with Google
          </button>
        </div>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to='/auth/login' className="border-b border-blue-500 text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
