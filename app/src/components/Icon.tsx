"use client";

import {
    MicVocal,
    PenLine,
    CornerUpRight,
    CornerDownLeft,
    X,
    MessageCirclePlus,
    Megaphone,
    ChartNoAxesGantt,
    MessageCircleQuestion,
    Cog,
    Search,
    Heart,
    Activity,
    Flame,
    Cross,
    Zap,
    Users,
    Droplet,
    Circle,
    CircleCheck,
    OctagonAlert,
    Star,
    Pin,
    PencilLine,
    Info,
    TestTube,
    SquarePen,
    CircleStop,
    User,
    Unplug,
    CircleX,
    CheckCheck,
    Check,
    RotateCcw,
    CircleHelp,
    Bug
} from "lucide-react";

const icons = {
    MicVocal,
    PenLine,
    CornerUpRight,
    CornerDownLeft,
    X,
    MessageCirclePlus,
    Megaphone,
    ChartNoAxesGantt,
    MessageCircleQuestion,
    Cog,
    Search,
    Heart,
    Activity,
    Flame,
    Cross,
    Zap,
    Users,
    Droplet,
    Circle,
    CircleCheck,
    OctagonAlert,
    Star,
    Pin,
    PencilLine,
    Info,
    TestTube,
    SquarePen,
    CircleStop,
    User,
    Unplug,
    CircleX,
    CheckCheck,
    Check,
    RotateCcw,
    CircleHelp,
    Bug
};

const Icon = ({ icon, size }) => {
  const IconComponent = icons[icon];

  return (
    <>
        {IconComponent && <IconComponent className="icon" size={size} strokeWidth={2.4} />}
    </>
  );
};

export default Icon;