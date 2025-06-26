import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axiosInstance from "../webservice/instance";
import { Urls } from "../webservice/allapis";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { handleSubmit, reset, register, formState: { errors } } = useForm()
  const navigate = useNavigate();
  

  const Submit = async (obj) => {

    // for attendee login
    if (obj.form === "user") {
      try {
        let { data } = await axiosInstance().post(Urls.LOGIN_USER, obj)

        if (!data.status) {
          return toast.error(data.message)
        }
        localStorage.setItem("etoken", data.data.token)
        localStorage.setItem("user", JSON.stringify(data.data))

        navigate("/")

        toast.success(data.message)
      } catch (error) {
        console.log(error);
      }
    }

    //  for admin login
    if (obj.form === "admin") {
      try {
        let { data } = await axiosInstance().post(Urls.LOGIN_ADMIN, obj)

        if (!data.status) {
          return toast.error(data.message)
        }
        localStorage.setItem("etoken", data.data.token)
        localStorage.setItem("user", JSON.stringify(data.data))

        if (data?.data?.isAdmin) {
          navigate("/admin")
        }

        toast.success(data.message)
      } catch (error) {
        console.log(error);
      }
    }

  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit(Submit)} className="space-y-5">
            <div className="flex justify-center gap-3">
              <label
                htmlFor="form"
                className="block text-sm font-medium text-black mb-1"
              >
                Admin
              </label>
              <input type="radio" name="form" value="admin" {...register("form")} />
              <label
                htmlFor="form"
                className="block text-sm font-medium text-black mb-1"
              >
                Attendee
              </label>
              <input type="radio" name="form" value="user" {...register("form")}  />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                {...register("email", { required: "user Email is required" })}
              />
              {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                {...register("password", { required: "password is required" })}
              />
              {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition cursor-pointer"
            >
              Login
            </button>

            <p className="text-sm text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <a href="/signup" className="text-green-500 hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
