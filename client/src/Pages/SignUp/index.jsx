import { useEffect, useContext, useState } from "react";
import MyContext from '../../context/MyContext';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";


const SignUp = () => {

  const[error_,setError]= useState(false);
  const[success_,setSuccess]=useState(false);

  const history =useNavigate();

  const context = useContext(MyContext);
 

    const [formFields,setFormFields] = useState({
      name:"",
      email:"",
      password:""
     
    })
    const onChangeInput =(e)=>{
      setFormFields(()=>({
        ...formFields,
        [e.target.name]:e.target.value
      }))
    }

    const signUp = (e)=>{
      e.preventDefault(formFields);

      if(formFields.name=="" && formFields.email=="" &&formFields.password=="" ){
        setError(true);
        return false;
      }else{
        postData("/api/user/signup",formFields).then((res)=>{
          setError(false);
          setSuccess(true);

          setTimeout(()=>{
            history("/signIn");
          },2000);
        })
       

      }

      

    }

    useEffect(() => {
        context.setIsHeaderFooterShow(false);
        return () => {
          context.setIsHeaderFooterShow(false);
        };
      }, [context]);

  
  return (
    <section className="section signIn mt-5 ">
    <div className="container">
      <div className="row">
        <div className=" col-md-12">
          <form onSubmit={signUp}> 
            <h2 className="hd">Sign Up</h2>
            {error_===true && <p className="text-danger">Please fill all the fields</p>}
            {success_===true && <p className="text-success">Successfully !</p>}
            <div className="form-group">
              <TextField  label="Full Name"   required variant="standard"  className="w-100" name="name" onChange={onChangeInput}/>
            </div>
            
            <div className="form-group">
              <TextField  label="Email address" type="email"  required variant="standard"  className="w-100" name="email" onChange={onChangeInput}/>
            </div>
            <div className="form-group">
              <TextField  label="Password" type="password" required variant="standard" className="w-100" name="password" onChange={onChangeInput} />
            </div>
            <Button type="submit" className="btn-purple btn-lg btn-big w-100 mt-3 mb-2">Sign Up</Button>
            <p>Already Registered ?  <Link to="/signIn" className="border-effect font-weight-bold ">Sign In</Link></p>
          </form>
        </div>
      </div>
    </div>
  </section>
  );
};

export default SignUp;


