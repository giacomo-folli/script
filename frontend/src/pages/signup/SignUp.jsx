import GenderCheckBox from "./GenderCheckBox";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30">
        <h1 className="text-3xl font-semibold text-center text-gray-200">
          Sign Up
          <span className="text-blue-500"> Chat App </span>
        </h1>

        <form action="">
          <div>
            <label className="label py-2">
              <span className="text-base text-gray-200 label-text">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Mario Rossi"
              className="input input-bordered w-full h-10"
            />
          </div>
          <div>
            <label className="label py-2">
              <span className="text-base text-gray-200 label-text">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter a username"
              className="input input-bordered w-full h-10"
            />
          </div>

          <div>
            <label className="label py-2">
              <span className="text-base text-gray-200 label-text">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter a password"
              className="input input-bordered w-full h-10"
            />
          </div>

          <div>
            <label className="label py-2">
              <span className="text-base text-gray-200 label-text">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm a password"
              className="input input-bordered w-full h-10"
            />
          </div>

          <GenderCheckBox />

          <a href="#" className="text-gray-200 text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Already have an account?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-2">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
