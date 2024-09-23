import './index.css'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li className="similar-jobs-list-item">
      <div className="top-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="text-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <FaStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="des-container">
        <h1 className="des">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
      <div className="details-container">
        <div className="loc-container">
          <MdLocationOn className="loc-icon" />
          <p className="loc">{location}</p>
        </div>
        <div className="loc-container">
          <BsBriefcaseFill className="loc-icon" />
          <p className="loc">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsCard
