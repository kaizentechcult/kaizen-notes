import { createSignal, For } from "solid-js";
import LoginImg from "../../assets/Login.svg";
import HandleLogin from "../../Auth/Login/HandleLogin";
import AuthImg from "../../components/AuthImg/AuthImg";
import FormInput from "../../components/FormElement/FormInput";
import ForgetPass from "../../components/FormElement/ForgetPass";
import FormButton from "../../components/FormElement/FormButton";
import DontHave from "../../components/FormElement/DontHave";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

const Login = () => {
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");

  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const res = await HandleLogin({
      data: { email: email(), password: password() },
    });
    setIsLoading(false);
    setEmail("");
    setPassword("");
    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.token) {
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    }
  };

  return (
    <div class="flex w-full justify-center items-center h-screen">
      {error() ? <Error error={error()} /> : <></>}
      {/* <> */}
        {isLoading() ? (
          <Loader />
        ) : (
          <div class="flex h-screen bg-[#e7f0ff] w-full">
            <AuthImg imgSrc={LoginImg} />
            <div class="lg:w-1/2 flex flex-col justify-center items-center px-12 w-full">
              <h2 class="text-4xl font-semibold mb-8 text-center">Login</h2>
              <form class="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
                <FormInput
                  type="email"
                  signal={email}
                  setSignal={setEmail}
                  id="email"
                  placeholder="Email"
                />
                <FormInput
                  type="password"
                  signal={password}
                  setSignal={setPassword}
                  id="password"
                  placeholder="Password"
                />
                <ForgetPass />
                <FormButton button="Login" />
                <DontHave
                  dontText="Don't have an account?"
                  text="Register"
                  link="/register"
                />
              </form>
            </div>
          </div>
        )}
      {/* </> */}
    </div>
  );
};

export default Login;
