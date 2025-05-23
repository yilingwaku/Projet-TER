import Icon from "../Icon";

const MenuItem = ({ isOnTop, icon, title, link, color }) => {
  const className = isOnTop ? "ontop-menu-item" : "";

  return (
    <>
      <a href={link} className={`button menu-item ${className}`} style={{ backgroundColor: color }}>
         <Icon icon={icon} size={24}/>
        <span className='md-text'>{ title }</span>
      </a>
    </>
  );
};

export default MenuItem;