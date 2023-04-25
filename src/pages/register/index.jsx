import LoginLayout from "@/web/components/LoginLayout";




const Register = () => {

  return (
    <>
      <p>hehe</p>
    </>
  );
};

Register.isPublic = true;
Register.getLayout = function (page) {
  return (
    <LoginLayout>
      {page}
    </LoginLayout>
  );
};

export default Register;