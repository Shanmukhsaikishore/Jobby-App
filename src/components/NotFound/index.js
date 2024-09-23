import './index.css'

const NotFound = () => (
  <div className="bad-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="bad-image"
    />
    <h1 className="bad-heading">Page Not Found</h1>
    <p className="bad-para">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
