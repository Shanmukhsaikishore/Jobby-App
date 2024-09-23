import {FiExternalLink} from 'react-icons/fi'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobDetailsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
    skills,
    title,
  } = jobDetails
  return (
    <ul className="job-details-container">
      <li className="top-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="company-logo"
        />
        <div className="text-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <FaStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </li>
      <li className="middle-container">
        <div className="first">
          <div className="loc-container">
            <MdLocationOn className="loc-icon" />
            <p className="loc">{location}</p>
          </div>
          <div className="loc-container">
            <BsBriefcaseFill className="loc-icon" />
            <p className="loc">{employmentType}</p>
          </div>
        </div>
        <p className="package">{packagePerAnnum}</p>
      </li>
      <hr className="job-sep" />
      <li className="des-container">
        <div className="job-des-container">
          <h1 className="job-des">Description</h1>
          <button type="button" className="link-button">
            <a
              href={companyWebsiteUrl}
              rel="noreferrer"
              target="_blank"
              className="visit-link"
            >
              <p className="visit">Visit</p>
              <FiExternalLink className="link-icon" />
            </a>
          </button>
        </div>
        <p className="job-description">{jobDescription}</p>
      </li>
      <li className="skills-container">
        <h1 className="skills-heading">Skills</h1>
        <ul className="skills-list">
          {skills.map(each => (
            <li className="skill-list-item" key={each.name}>
              <img
                src={each.imageUrl}
                alt={each.name}
                className="skill-image"
              />
              <p className="skill-name">{each.name}</p>
            </li>
          ))}
        </ul>
      </li>
      <li className="life-container">
        <h1 className="skills-heading">Life At Company</h1>
        <div className="life-text-container">
          <p className="job-description">{lifeAtCompany.description}</p>
          <img
            src={lifeAtCompany.imageUrl}
            alt="life at company"
            className="life-image"
          />
        </div>
      </li>
    </ul>
  )
}

export default JobDetailsCard
