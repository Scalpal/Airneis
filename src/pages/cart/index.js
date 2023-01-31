import Banner from "@/components/Banner";

const Home = () => {
  return (
    <>
      <Banner />
      <h2 style={{ fontSize: "32pt", textAlign: "center" }}> Cart </h2>
      <div style={{ display: "flex", fontSize: "24pt" }}>
        <div style={{ backgroundColor: "red" }}>A</div>
        <div style={{ backgroundColor: "blue" }}>B</div>
      </div>
    </>
  );
};

export default Home;
