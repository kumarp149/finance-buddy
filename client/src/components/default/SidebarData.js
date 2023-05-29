import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
    {
        title: "Dashboard",
        path: "/dashboard"
    },
    {
        title: "Accounts",
        path: "/accounts",
        // icon: <AiIcons.AiFillHome />,
        // iconClosed: <RiIcons.RiArrowDownSFill />,
        // iconOpened: <RiIcons.RiArrowUpSFill />,

        // subNav: [
        // {
        // 	title: "Balances",
        // 	path: "/balances",
        // 	//icon: <IoIcons.IoIosPaper />,
        // },
        // {
        // 	title: "Debts",
        // 	path: "/debts",
        // 	//icon: <IoIcons.IoIosPaper />,
        // },
        // ],
    },
    {
        title: "Expenses",
        //path: "/expenses",
        // icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: "Overview",
                path: "/expenses/overview",
                //icon: <IoIcons.IoIosPaper />,
                cName: "sub-nav",
            },
            {
                title: "Analytics",
                path: "/expenses/analytics",
                //icon: <IoIcons.IoIosPaper />,
                cName: "sub-nav",
            },
        ],
    },
    {
        title: "Budgets",
        // icon: <FaIcons.FaPhone />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: "Overview",
                path: "/budgets/overview",
                //icon: <IoIcons.IoIosPaper />,
                cName: "sub-nav",
            },
            {
                title: "Analytics",
                path: "/budgets/analytics",
                //icon: <IoIcons.IoIosPaper />,
                cName: "sub-nav",
            },
        ],
    },
    {
        title: "Support",
        path: "/support",
        // icon: <IoIcons.IoMdHelpCircle />,
    },
];
