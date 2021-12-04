import "./error.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppSelector } from "../../app/hooks";
import Topbar from "../../components/topbar/Topbar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Error = () => {
  const selectedUser = useAppSelector((state) => state.user.user);
  return (
    <>
      {selectedUser && <Topbar />}

      <Link to="/">
        <header className="top-header"></header>

        <div>
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>
        </div>

        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable"></div>
            <div className="cover"></div>
            <div className="in-cover">
              <div className="bulb"></div>
            </div>
            <div className="light"></div>
          </div>
        </div>

        <section className="error">
          <div className="error__content">
            <div className="error__message message">
              <h1 className="message__title">Page Not Found</h1>
              <p className="message__text">
                Hmmmm.... I must have slept while building this page! Or maybe I
                did't want to build this one in the first place. That's a
                mystery. Will need a detective for this. Meanwhile, you can
                click anywhere to go to the home!
              </p>
            </div>
            <div className="error__nav e-nav">
              {/* <Link to={"/"} className="e-nav__link" /> */}
              {/* <a href="" target="_blanck" className="e-nav__link"></a> */}
            </div>
          </div>
        </section>
      </Link>
    </>
  );
};
export default Error;
