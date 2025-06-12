import MenuItem from '@/components/menu/MenuItem';
import "./menu.css";

const Menu = () => {
    const menuItems = [
        { icon: "Megaphone", title: "Prévention", link: "/prevention", color: "#e5c39a" },
        //{ icon: "ChartNoAxesGantt", title: "Agenda", link: "/agenda", color: "#A0C3D2" },
        { icon: "PencilLine", title: "Notes", link: "/notes", color: "#EEE9DA" },
        { icon:"MessageCircleQuestion", title: "Questions", link: "/questions", color: "#BBDED6" },
        { icon:"Cog", title: "Réglages", link: "/reglages", color: "#F9F7F7" },
        // { icon:"TestTube", title: "Test", link: "/test", color: "#F9F7F7" },
    ];

    return (
        <>
            <div className="menu">
                {menuItems.map((item, index) => (
                    <MenuItem key={index} isOnTop={index === 0} icon={item.icon} title={item.title} link={item.link} color={item.color}/>
                ))}
            </div>
        </>
    );
};

export default Menu;