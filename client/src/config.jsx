import React from "react";
import { Icon } from "@aws-amplify/ui-react";

import {
  MdDashboard,
  MdModeEditOutline,
  MdAccountBox,
  MdOutlineTableChart,
  MdMoney,
  MdDataThresholding
} from "react-icons/md";

import {FcDebt} from "react-icons/fc"

export const baseConfig = {
  projectLink: "/", // GitHub link in the navbar
  docsRepositoryBase: "", // base URL for the docs repository
  titleSuffix: "",
  search: true,
  header: true,
  headerText: "Logo",
  footer: true,
  footerText: (
    <>
      <span>
        © MIT {new Date().getFullYear()}, Made with ❤️ by {""}
        <a href="https://github.com/mrtzdev" target="_blank" rel="noreferrer">
          Mrtzdev
        </a>
      </span>
    </>
  ),

  logo: (
    <>
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="logo"
        width="30"
        height="22"
      />
    </>
  ),
};

/// Navigation sidebar
export const appNavs = [
  {
    eventKey: "dashboard",
    icon: <Icon as={MdDashboard} />,
    title: "Dashboard",
    to: "/dashboard",
  },

  {
    eventKey: "expenses",
    icon: <Icon as={MdMoney} />,
    title: "Expenses",
    to: "/expenses",
    children: [
      {
        eventKey: "basic-table",
        title: "Overview",
        to: "/expenses",
      },
      {
        eventKey: "users",
        title: "Analytics",
        to: "/expense/analytics",
      },
    ],
  },
  {
    eventKey: "budgets",
    icon: <Icon as={MdDataThresholding} />,
    title: "Budgets",
    to: "/budgets",
    // children: [
    //   {
    //     eventKey: "budgets-view",
    //     title: "Overview",
    //     to: "/budgets",
    //   },
    //   {
    //     eventKey: "budgets-analytics",
    //     title: "Edit Form",
    //     to: "/edit-form",
    //   },
    // ],
  },
  {
    eventKey: "Debts",
    
    title: "Debts",
    to: "/debts",
  },
];