import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'

import {BsBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <div className="nav-lg-container">
        <Link to="/">
          <img
            className="home-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <Link to="/" className="nav-link">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="nav-sm-container">
        <Link to="/">
          <img
            className="home-sm-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-sm-menu">
          <Link to="/" className="nav-sm-link">
            <li>
              <AiFillHome className="icon" />
            </li>
          </Link>

          <Link to="/jobs" className="nav-sm-link">
            <li>
              <BsBriefcaseFill className="icon" />
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="logout-sm-button nav-sm-link"
              onClick={onClickLogout}
            >
              <FiLogOut className="icon" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
