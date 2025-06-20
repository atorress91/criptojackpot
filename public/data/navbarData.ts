import { v4 as uuidv4 } from 'uuid';

export const navbarData = [
  {
    id: uuidv4(),
    menuTitle: 'Winners',
    menuTitleKey: 'NAVBAR.Winners',
    path: 'winners',
  },
  {
    id: uuidv4(),
    menuTitle: 'Features',
    menuTitleKey: 'NAVBAR.Features',
    path: 'features',
  },
  {
    id: uuidv4(),
    menuTitle: 'News',
    menuTitleKey: 'NAVBAR.News',
    path: '#',
    menuItems: [
      {
        id: uuidv4(),
        title: 'Blog V-1',
        titleKey: 'NAVBAR.Blog V-1',
        menuItemPath: '/blog1',
      },
      {
        id: uuidv4(),
        title: 'Blog V-2',
        titleKey: 'NAVBAR.Blog V-2',
        menuItemPath: '/blog2',
      },
      {
        id: uuidv4(),
        title: 'Blog Details',
        titleKey: 'NAVBAR.Blog Details',
        menuItemPath: '/blog-details',
      },
    ],
  },
  {
    id: uuidv4(),
    menuTitle: 'Lotteries',
    menuTitleKey: 'NAVBAR.Lotteries',
    path: '#',
    menuItems: [
      {
        id: uuidv4(),
        title: 'Contest',
        titleKey: 'NAVBAR.Contest',
        menuItemPath: '/contest',
      },
      {
        id: uuidv4(),
        title: 'Contest Details',
        titleKey: 'NAVBAR.Contest Details',
        menuItemPath: '/contest-details',
      },
    ],
  },
  {
    id: uuidv4(),
    menuTitle: 'Pages',
    menuTitleKey: 'NAVBAR.Pages',
    path: '#',
    menuItems: [
      {
        id: uuidv4(),
        title: 'Multiproduct One',
        titleKey: 'NAVBAR.Multiproduct One',
        menuItemPath: '/multiproduct-one',
      },
      {
        id: uuidv4(),
        title: 'Multiproduct Two',
        titleKey: 'NAVBAR.Multiproduct Two',
        menuItemPath: '/multiproduct-two',
      },
      {
        id: uuidv4(),
        title: 'About Us',
        titleKey: 'NAVBAR.About Us',
        menuItemPath: '/about',
      },
      {
        id: uuidv4(),
        title: 'User Panel',
        titleKey: 'NAVBAR.User Panel',
        menuItemPath: '/user-panel',
      },
      {
        id: uuidv4(),
        title: 'Basket',
        titleKey: 'NAVBAR.Basket',
        menuItemPath: '/basket',
      },
      {
        id: uuidv4(),
        title: 'Checkout',
        titleKey: 'NAVBAR.Checkout',
        menuItemPath: '/checkout',
      },
      {
        id: uuidv4(),
        title: 'Login',
        titleKey: 'NAVBAR.Login',
        menuItemPath: '/login',
      },
      {
        id: uuidv4(),
        title: 'Register',
        titleKey: 'NAVBAR.Register',
        menuItemPath: '/register',
      },
      {
        id: uuidv4(),
        title: 'Forgot Password',
        titleKey: 'NAVBAR.Forgot Password',
        menuItemPath: '/forgot-password',
      },
      {
        id: uuidv4(),
        title: 'New Password',
        titleKey: 'NAVBAR.New Password',
        menuItemPath: '/new-password',
      },
      {
        id: uuidv4(),
        title: 'Verify Password',
        titleKey: 'NAVBAR.Verify Password',
        menuItemPath: '/verify-password',
      },
      {
        id: uuidv4(),
        title: 'Affiliate',
        titleKey: 'NAVBAR.Affiliate',
        menuItemPath: '/affiliate',
      },
      {
        id: uuidv4(),
        title: 'How To Play',
        titleKey: 'NAVBAR.How To Play',
        menuItemPath: '/howtoplay',
      },
      {
        id: uuidv4(),
        title: 'Faq',
        titleKey: 'NAVBAR.Faq',
        menuItemPath: '/faq',
      },
      {
        id: uuidv4(),
        title: 'Contact',
        titleKey: 'NAVBAR.Contact',
        menuItemPath: '/contact',
      },
      {
        id: uuidv4(),
        title: 'Error 404',
        titleKey: 'NAVBAR.Error 404',
        menuItemPath: '/error',
      },
    ],
  },
  {
    id: uuidv4(),
    menuTitle: 'Contact Us',
    menuTitleKey: 'NAVBAR.Contact Us',
    path: 'contact',
  },
];
