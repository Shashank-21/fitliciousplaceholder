import Button from "../components/Button";

function HomePage() {
  const handleLoginClick = () => {
    console.log("Clicked");
    window.location.href = `${import.meta.env.VITE_AXIOS_BASE_URL}/login`;
  };

  const LoginButton = (
    <Button primary onClick={handleLoginClick}>
      Login
    </Button>
  );
  return (
    <div className="h-screen grid place-items-center text-2xl">
      {LoginButton}
    </div>
  );
}

export default HomePage;
