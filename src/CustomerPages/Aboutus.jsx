import { useEffect, useState } from "react";
import firebase from "../Utils/firebase";

export default function Aboutus() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultEmail = { name: "", email: "", phone: "", text: "" };

  const [emailText, setEmailText] = useState(
    "Írj nekünk! Kollégáink hamarosan megkeresnek Téged az általad megadottelérhetőségek egyikén"
  );
  const [email, setEmail] = useState(defaultEmail);

  useEffect(() => {
    setEmailText(
      "Írj nekünk! Kollégáink hamarosan megkeresnek Téged az általad megadottelérhetőségek egyikén"
    );
    setEmail(defaultEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setEmailText(
      "Köszönjük e-mailjét! Kollégáink hamarosan megkeresnek Téged az általad megadottelérhetőségek egyikén"
    );
    setEmail(defaultEmail);

    firebase
      .firestore()
      .collection("mail")
      .add({
        to: ["alkio2535@gmail.com"],
        message: {
          subject: `Kérdés e-mail ${email.name}-től`,
          text: "",
          html: `
        Contact: 
        <br/>
        ${email.email} <br/>
        ${email.phone} <br/>
        <br/>
        ${email.text}
        `,
        },
      });
  };

  return (
    <div className="flex flex-col grow">
      <div className="flex flex-row justify-center items-center pt-10">
        <img
          alt="logo"
          src={require("../assets/logo-black.png")}
          className="w-72"
        />
        <p className="w-[50rem] pl-4 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed ex
          metus. Nunc risus eros, eleifend fermentum eros eget, auctor euismod
          nunc. Quisque ultrices eget justo vel suscipit. Vivamus aliquet vel
          lectus sed facilisis. Duis sed purus risus. Morbi eu ipsum vel neque
          varius tincidunt sit amet accumsan lectus. In non fermentum metus. Ut
          vel ipsum semper, vestibulum elit eu, imperdiet tortor. Fusce
          fermentum interdum neque in lacinia. Morbi ac justo tellus. Morbi
          venenatis purus a elementum pharetra. Suspendisse ut lectus tempus,
          condimentum purus eget, vestibulum nibh.
        </p>
      </div>
      <div className=" flex flex-col items-center justify-center">
        <br />
        <p className="w-[68rem] text-justify">
          Sed eu mi fringilla, interdum nulla quis, fringilla magna. Donec
          tristique quis tortor in pulvinar. Praesent sed lacus dignissim,
          volutpat lectus vel, elementum dolor. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Proin imperdiet,
          purus vitae convallis rhoncus, massa urna laoreet nisi, non dictum
          enim diam iaculis dui. Pellentesque ut ornare ex, eu viverra massa.
          Nunc vehicula finibus turpis quis iaculis.
        </p>
        <br />
        <p className="w-[68rem] text-justify">
          Suspendisse accumsan faucibus ligula, eu maximus nisi luctus at. Fusce
          vitae eleifend purus. Proin accumsan est felis, nec vehicula turpis
          facilisis ultricies. Sed et justo at leo cursus porttitor sed vel
          velit. Quisque laoreet congue lectus, et suscipit sapien consequat ut.
          Maecenas nec sodales sem, sed vehicula turpis. Quisque nec vehicula
          arcu, vitae semper eros. Praesent purus ex, efficitur a cursus sed,
          ornare at purus.
        </p>
        <br />
        <p className="w-[68rem] text-justify">
          Proin ut blandit quam. Nullam nisl nisl, tincidunt mollis enim
          dignissim, eleifend dapibus velit. Cras maximus libero quis dictum
          ornare. Sed est lacus, pulvinar quis rutrum eu, ultrices at magna.
          Quisque euismod, nunc quis bibendum congue, quam mauris tincidunt
          erat, sit amet lacinia ligula elit id sapien. Curabitur justo mi,
          sollicitudin eu massa vel, malesuada dapibus purus. Morbi et risus
          venenatis, pulvinar turpis eu, fringilla urna. In hac habitasse platea
          dictumst. Morbi iaculis urna sed dui faucibus tristique.
        </p>
        <br />
        <p className="w-[68rem] text-justify">
          Donec non neque nec augue aliquam suscipit. Proin pharetra finibus
          pretium. Proin cursus nisl non elit tempor placerat. Quisque non
          mattis leo. Nulla facilisi. Proin hendrerit nibh elit, at accumsan
          eros tristique finibus. Donec hendrerit ultrices turpis, efficitur
          blandit magna consequat scelerisque. Vestibulum ut massa ante. Sed
          maximus ligula vel nulla convallis porttitor. Praesent vitae laoreet
          nibh, ac blandit arcu.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-6 pt-6 ">
        <h1 className="text-3xl font-bold">Kérdése van felénk?</h1>
        <h1 className="text-3xl font-bold">Lépjen velünk kapcsolatba</h1>
        <h3 className="text-xl font-semibold mt-3">{emailText}</h3>
        <form
          id="message"
          className="flex flex-row items-center justify-center py-6 "
          onSubmit={sendEmail}
        >
          <div className="flex flex-col pr-6 gap-7">
            <input
              name="name"
              type="text"
              className="border rounded-lg w-96 h-10 pl-6 focus:outline-none"
              placeholder="Név"
              value={email.name}
              onChange={handleChange}
              required
            ></input>
            <input
              name="email"
              type="email"
              className="border rounded-lg w-96 h-10 pl-6 focus:outline-none"
              placeholder="E-mail"
              value={email.email}
              onChange={handleChange}
              required
            ></input>
            <input
              name="phone"
              type="number"
              className="border rounded-lg w-96 h-10 pl-6 focus:outline-none"
              placeholder="Telefon"
              value={email.phone}
              onChange={handleChange}
              required
            ></input>
          </div>
          <textarea
            name="text"
            type="text"
            rows="7"
            className="border rounded-lg w-96 p-3 focus:outline-none"
            placeholder="Miben segíthetünk"
            value={email.text}
            onChange={handleChange}
            required
          ></textarea>
        </form>
        <button
          className="mb-12 border border-primary py-1 px-2 rounded-2xl font-bold text-lg hover:bg-primary hover:text-white"
          form="message"
        >
          Küldés
        </button>
      </div>
    </div>
  );
}
