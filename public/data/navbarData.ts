import { v4 as uuidv4 } from "uuid";

export const navbarData = [
  {
    id: uuidv4(),
    menuTitle: "Winners",
    path: "winners",
  },
  {
    id: uuidv4(),
    menuTitle: "Features",
    path: "features",
  },
  {
    id: uuidv4(),
    menuTitle: "News",
    path: "#",
    menuItems: [
      {
        id: uuidv4(),
        title: "Blog V-1",
        menuItemPath: "/blog1",
      },
      {
        id: uuidv4(),
        title: "Blog V-2",
        menuItemPath: "/blog2",
      },
      {
        id: uuidv4(),
        title: "Blog Details",
        menuItemPath: "/blog-details",
      },
    ],
  },
  {
    id: uuidv4(),
    menuTitle: "Lotteries",
    path: "#",
    menuItems: [
      {
        id: uuidv4(),
        title: "Contest",
        menuItemPath: "/contest",
      },
      {
        id: uuidv4(),
        title: "Contest Details",
        menuItemPath: "/contest-details",
      },
    ],
  },
  {
    id: uuidv4(),
    menuTitle: "Pages",
    path: "#",
    menuItems: [
      {
        id: uuidv4(),
        title: "Multiproduct One",
        menuItemPath: "/multiproduct-one",
      },
      {
        id: uuidv4(),
        title: "Multiproduct Two",
        menuItemPath: "/multiproduct-two",
      },
      {
        id: uuidv4(),
        title: "About Us",
        menuItemPath: "/about",
      },
      {
        id: uuidv4(),
        title: "User Panel",
        menuItemPath: "/user-panel",
      },
      {
        id: uuidv4(),
        title: "Basket",
        menuItemPath: "/basket",
      },
      {
        id: uuidv4(),
        title: "Checkout",
        menuItemPath: "/checkout",
      },
      {
        id: uuidv4(),
        title: "Login",
        menuItemPath: "/login",
      },
      {
        id: uuidv4(),
        title: "Register",
        menuItemPath: "/register",
      },
      {
        id: uuidv4(),
        title: "Forgot Password",
        menuItemPath: "/forgot-password",
      },
      {
        id: uuidv4(),
        title: "New Password",
        menuItemPath: "/new-password",
      },
      {
        id: uuidv4(),
        title: "Verify Password",
        menuItemPath: "/verify-password",
      },

      {
        id: uuidv4(),
        title: "Affiliate",
        menuItemPath: "/affiliate",
      },
      {
        id: uuidv4(),
        title: "How To Play",
        menuItemPath: "/howtoplay",
      },
      {
        id: uuidv4(),
        title: "Faq",
        menuItemPath: "/faq",
      },
      {
        id: uuidv4(),
        title: "Contact",
        menuItemPath: "/contact",
      },
      {
        id: uuidv4(),
        title: "Error 404",
        menuItemPath: "/error",
      },
    ],
  },
  {
    id: uuidv4(),
    menuTitle: "Contact Us",
    path: "contact",
  },
];
