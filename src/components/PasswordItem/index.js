import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDeletePasswordDetails, isChecked} = props
  const {id, web, name, password} = passwordDetails

  const onClickDelete = () => {
    onDeletePasswordDetails(id)
  }

  console.log(isChecked)

  const toggledPassword = isChecked ? (
    password
  ) : (
    <img
      className="str-image"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )

  return (
    <li className="list-container">
      <h1 className="letter">{web[0]}</h1>
      <div className="web-name-pass">
        <p>{web}</p>
        <p>{name}</p>
        <p>{toggledPassword}</p>
      </div>
      <button type="button" className="delete-btn" onClick={onClickDelete}>
        <img
          className="delete-image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
