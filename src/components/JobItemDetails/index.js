import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'

import JobDetailsCard from '../JobDetailsCard'

import SimilarJobsCard from '../SimilarJobsCard'

import './index.css'

const apiStatusConsts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {status: apiStatusConsts.initial, jobDetails: {}, similarJobs: []}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({status: apiStatusConsts.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        id: data.job_details.id,
        title: data.job_details.title,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        skills: data.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
      }
      const similarJobs = data.similar_jobs.map(each => ({
        id: each.id,
        title: each.title,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
      }))
      this.setState({status: apiStatusConsts.success, jobDetails, similarJobs})
    } else {
      this.setState({status: apiStatusConsts.failure})
    }
  }

  renderLoader = () => (
    <div className="job-item-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {jobDetails, similarJobs} = this.state

    return (
      <>
        <JobDetailsCard jobDetails={jobDetails} />
        <div className="similar-jobs-container">
          <h1 className="similar-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(each => (
              <SimilarJobsCard key={each.id} jobDetails={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailure = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="no-heading">Oops! Something Went Wrong</h1>
      <p className="no-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderAll() {
    const {status} = this.state
    switch (status) {
      case apiStatusConsts.inProgress:
        return this.renderLoader()
      case apiStatusConsts.success:
        return this.renderSuccess()
      case apiStatusConsts.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-bg-container">{this.renderAll()}</div>
      </>
    )
  }
}

export default JobItemDetails
