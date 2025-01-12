import { useEffect, useContext, useState } from "react";
import MyContext from "./../../context/MyContext";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";

const SignIn = () => {
  const [error_, setError] = useState(false);
  const [success_, setSuccess] = useState(false);
  const [falseInfo, setFalseInfo] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    context.setIsHeaderFooterShow(false);
    return () => {
      context.setIsHeaderFooterShow(true);
    };
  }, [context]);

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const onChangeInput = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };
  const signIn = (e) => {
    e.preventDefault();
    setFalseInfo(false);
    setError(false);

    if (formFields.email === "" || formFields.password === "") {
      return;
    } else {
      postData("/api/user/signin", formFields)
        .then((res) => {
          console.log("API Response:", res);

          try {
            if (res.result?.error) {
              setFalseInfo(true);
            } else {
              localStorage.setItem("token", res.token);

              // result içindeki user bilgisine erişim
              const user = {
                name: res.result?.name,
                email: res.result?.email,
                userId: res.result?.id || res.result?._id,
              };

              localStorage.setItem("user", JSON.stringify(user));
              const storedUser = JSON.parse(localStorage.getItem("user"));
              console.log("Stored User:", storedUser);
              if(res.token=== "" || res.token ===undefined || res.token ===null){
                setFalseInfo(true);
              }else{
                 setFalseInfo(false);
              setError(false);
              setSuccess(true);
              setTimeout(() => {
               navigate("/dashboard");
              }, 500);
              setTimeout(() => {
               window.location.reload();
              }, 500);
              }
             
            }
          } catch (error) {
            console.log("Error signing in:", error);
          }
        })
        .catch((error) => {
          console.error("Error signing in:", error);
          setError(true);
        });
    }
  };
  return (
    <section className="section signIn mt-5 ">
      <div className="container">
        <div className="row">
          <div className=" col-md-12">
            <form onSubmit={signIn}>
              <h2 className="hd">Sign In</h2>
              {error_ === true && (
                <p className="text-danger">Please fill all the fields</p>
              )}
              {success_ === true && (
                <p className="text-success">Successfully !</p>
              )}
              {falseInfo === true && (
                <p className="text-danger">
                  Wrong or Invalid Informations. Please correct and try again.
                </p>
              )}

              <div className="form-group">
                <TextField
                  label="Email address"
                  type="email"
                  required
                  variant="standard"
                  className="w-100"
                  name="email"
                  onChange={onChangeInput}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="Password"
                  type="password"
                  required
                  variant="standard"
                  className="w-100"
                  name="password"
                  onChange={onChangeInput}
                />
              </div>
              <Button
                type="submit"
                className="btn-purple btn-lg btn-big w-100 mt-3 mb-2"
              >
                Sign In
              </Button>
              <p>
                Not Registered ?{" "}
                <Link to="/signUp" className="border-effect font-weight-bold ">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
