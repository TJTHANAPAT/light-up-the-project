import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faUser,
  faFileAlt,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
import './style.css';

const Home2019 = () => {
  return (
    <div className="lightup-2019">
      <div className="wrapper">
        <h1>จุดประกายฝัน 2562</h1>
        <div className="index-menu-box">

        <Btn icon={faEdit}>Register</Btn>
        <Btn icon={faUser}>Search User</Btn>
        <Btn icon={faFileAlt}>Search Classroom</Btn>
        <Btn icon={faFolderOpen}>Booths</Btn>
        </div>
        <hr/>
        <footer>LightUpTheProject © 2019 | Created by TJ.THANAPAT</footer>
      </div>
    </div>
  );
}

const Btn = ({ children, icon }) => {
  return (
    <div className="index-menu">
      <FontAwesomeIcon icon={icon} className="icon" />
      <span>{children}</span>
    </div>
  );
};

export default Home2019;
