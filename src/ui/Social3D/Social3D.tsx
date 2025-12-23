
import "./Social3D.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTiktok, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


function Social3D() {
  return (
    <div className="social ">
      <ul>
        <li>
          <a href="https://www.facebook.com/share/1FyPLS1YiT/">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span >


              <FontAwesomeIcon icon={faFacebook} />
            </span>
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/@apecans?_r=1&_t=ZS-929ghS81LOh">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>
              <FontAwesomeIcon icon={faTiktok} />
            </span>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/apeceg?igsh=MWFuYmNxeGVhbzFjMQ==">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span >
              <FontAwesomeIcon icon={faInstagram} />
            </span>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/company/apeceg/">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>
              <FontAwesomeIcon icon={faLinkedin} />
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Social3D;
