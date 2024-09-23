import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="home-bg-container">
    <Header />
    <div className="text-content">
      <h1 className="home-main-heading">Find The Job That Fits Your Life</h1>
      <p className="home-para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="find-link">
        <button type="button" className="find-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
