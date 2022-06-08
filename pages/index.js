export default function Home() {
  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let password = document.getElementById("password").value;
          let token = "";
          fetch("/api/generateJWT?password=" + password)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              token = data.token;
              window.location.href = "/secret?jwt=" + token;
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <input type="password" placeholder="PASSWORD?" id="password" />
        <br />
        <br />
      </form>
    </main>
  );
}
