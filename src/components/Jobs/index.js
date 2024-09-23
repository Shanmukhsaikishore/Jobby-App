import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import JobCard from '../JobCard'

import ProfileCard from '../ProfileCard'

import './index.css'

const apiStatusConsts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  notFound: 'NOTFOUND',
  inProgress: 'INPROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    status: apiStatusConsts.initial,
    selectedEmploymentType: [],
    minPackage: '',
    searchText: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({status: apiStatusConsts.inProgress})
    const {selectedEmploymentType, minPackage, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentType.join()}&minimum_package=${minPackage}&search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      mehtod: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        id: each.id,
        title: each.title,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
      }))
      if (updatedData.length !== 0) {
        this.setState({status: apiStatusConsts.success, jobsList: updatedData})
      } else {
        this.setState({status: apiStatusConsts.notFound})
      }
    } else {
      this.setState({status: apiStatusConsts.failure})
    }
  }

  onCheck = e => {
    const {selectedEmploymentType} = this.state
    if (!selectedEmploymentType.includes(e.target.value)) {
      selectedEmploymentType.push(e.target.value)
      this.setState({selectedEmploymentType}, this.getJobsData)
    } else {
      this.setState(
        prevState => ({
          selectedEmploymentType: prevState.selectedEmploymentType.filter(
            each => each !== e.target.value,
          ),
        }),
        this.getJobsData,
      )
    }
  }

  onChangeSearch = e => {
    this.setState({searchText: e.target.value})
  }

  onCheckRadio = e => {
    this.setState({minPackage: e.target.value}, this.getJobsData)
  }

  onClickSearch = () => {
    this.getJobsData()
  }

  renderLoader = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.map(each => (
          <JobCard key={each.id} jobDetails={each} />
        ))}
      </>
    )
  }

  renderNotFound = () => (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-image"
      />
      <h1 className="no-heading">No Jobs Found</h1>
      <p className="no-para">We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderFailure = () => (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-job-image"
      />
      <h1 className="no-heading">Oops! Something Went Wrong</h1>
      <p className="no-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderAll = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConsts.success:
        return this.renderSuccess()
      case apiStatusConsts.inProgress:
        return this.renderLoader()
      case apiStatusConsts.failure:
        return this.renderFailure()
      case apiStatusConsts.notFound:
        return this.renderNotFound()
      default:
        return null
    }
  }

  render() {
    const {searchText} = this.state

    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="filter-container">
            <div className="search-sm-container">
              <input
                type="search"
                value={searchText}
                placeholder="Search"
                className="search-box"
                onChange={this.onChangeSearch}
              />
              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ProfileCard />
            <hr className="sep" />
            <div className="type-filter">
              <h1 className="filter-name">Type of Employment</h1>
              <ul className="filter-list">
                {employmentTypesList.map(each => (
                  <li className="filter-ele" key={each.employmentTypeId}>
                    <input
                      type="checkbox"
                      id={each.employmentTypeId}
                      value={each.employmentTypeId}
                      onClick={this.onCheck}
                    />
                    <label
                      htmlFor={each.employmentTypeId}
                      className="label-ele"
                    >
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="sep" />
            <div className="type-filter">
              <h1 className="filter-name">Salary Range</h1>
              <ul className="filter-list">
                {salaryRangesList.map(each => (
                  <li className="filter-ele" key={each.salaryRangeId}>
                    <input
                      type="radio"
                      name="salary"
                      id={each.salaryRangeId}
                      value={each.salaryRangeId}
                      onClick={this.onCheckRadio}
                    />
                    <label htmlFor={each.salaryRangeId} className="label-ele">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="result-container">
            <div className="search-container">
              <input
                type="search"
                value={searchText}
                placeholder="Search"
                className="search-box"
                onChange={this.onChangeSearch}
              />
              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="jobs-list-container">{this.renderAll()}</ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
