import { Button } from "./Button"
import PropTypes from 'prop-types'


const Header = ({title, clickAdd, btnText}) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button 
      color={btnText ? "red" : "green"} 
      text={btnText ? "Close" : "Add"} 
      onClick={clickAdd} 
      />
    </header>
  );
}

Header.defaultProps = {
  title: 'task-man'
}


export default Header