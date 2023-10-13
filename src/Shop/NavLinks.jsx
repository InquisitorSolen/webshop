export default function NavLinks() {
  const links = [{ name: "Kosár" }, { name: "Kategóriák" }];

  return (
    <>
      {links.map((link) => (
        <div key={link.name}>
          <div>
            <h1>{link.name}</h1>
          </div>
        </div>
      ))}
    </>
  );
}
