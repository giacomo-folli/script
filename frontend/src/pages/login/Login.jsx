function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto text-gray-200">
      <div className="w-full p-6 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30">
        <h1 className="text-3xl font-semibold text-center">
          Login
          <span className="text-blue-500"> Chat App </span>
        </h1>

        <form action="">
          <div>
            <label className="label py-2">
              <span className="text-base text-gray-200 label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full h-10"
            />
          </div>
          <div>
            <label className="label py-2">
              <span className="text-base text-gray-200 label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter a password"
              className="input input-bordered w-full h-10"
            />
          </div>

          <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            {"Don't"} have an account?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-4">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
