import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem/index'
import './index.css'

const initialPasswordsList = []

class PasswordManager extends Component {
  state = {
    passwordsList: initialPasswordsList,
    web: '',
    name: '',
    password: '',
    searchText: '',
    isChecked: false,
  }

  onChangeWeb = event => {
    this.setState({web: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchText: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {name, web, password} = this.state
    const newPassword = {
      id: uuidv4(),
      web,
      name,
      password,
    }

    this.setState(prevState => ({
      web: '',
      name: '',
      password: '',
      passwordsList: [...prevState.passwordsList, newPassword],
    }))
  }

  onDeletePasswordDetails = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(each => each.id !== id),
    }))
  }

  onToggleCheckbox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  render() {
    const {
      passwordsList,
      web,
      name,
      password,
      searchText,
      isChecked,
    } = this.state

    console.log(passwordsList)
    const filteredPasswords = passwordsList.filter(eachPass =>
      eachPass.web.toLowerCase().includes(searchText.toLowerCase()),
    )
    return (
      <div className="bg-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="top-container">
          <form className="form-container">
            <h1 className="add-new-password">Add New Password</h1>
            <div className="each-input-container">
              <img
                className="input-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                id="website"
                value={web}
                placeholder="Enter Website"
                onChange={this.onChangeWeb}
              />
            </div>
            <div className="each-input-container">
              <img
                className="input-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                id="username"
                value={name}
                placeholder="Enter Username"
                onChange={this.onChangeName}
              />
            </div>
            <div className="each-input-container">
              <img
                className="input-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter Password"
                onChange={this.onChangePassword}
              />
            </div>
            <button
              className="add-btn"
              data-testid="delete"
              type="submit"
              onClick={this.onAddPassword}
            >
              Add
            </button>
          </form>
          <img
            className="top-section-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>

        <div className="bottom-container">
          <div className="bottom-count-search-container">
            <h1 className="your-passwords">
              Your passwords
              <p>{filteredPasswords.length}</p>
            </h1>
            <div className="each-input-container">
              <img
                className="input-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                id="search"
                placeholder="Search"
                onChange={this.onChangeSearch}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="myCheckbox"
              className="checkbox"
              onClick={this.onToggleCheckbox}
            />
            <label className="checkbox-label" htmlFor="myCheckbox">
              Show Passwords
            </label>
          </div>
          {filteredPasswords.length === 0 ? (
            <div className="no-content-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-content-image"
              />
              <p className="no-content-text">No Passwords</p>
            </div>
          ) : (
            <ul>
              {filteredPasswords.map(eachPassword => (
                <PasswordItem
                  passwordDetails={eachPassword}
                  key={eachPassword.id}
                  onDeletePasswordDetails={this.onDeletePasswordDetails}
                  isChecked={isChecked}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
