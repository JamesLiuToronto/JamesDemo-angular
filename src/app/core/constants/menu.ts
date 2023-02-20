import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Courses',
      separator: true,
      items: [
        
        {
          icon: 'assets/icons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/mydashboard',
          children: [{ label: 'Books', route: '/mydashboard/my-dash' }],
        },
        // {
        //   icon: 'assets/icons/outline/lock-closed.svg',
        //   label: 'My Auth',
        //   route: '/auth',
        //   children: [
        //     { label: 'Sign up', route: '/auth/sign-up' },
        //     { label: 'Sign in', route: '/auth/sign-in' },
        //     { label: 'Forgot Password', route: '/auth/forgot-password' },
        //     { label: 'New Password', route: '/auth/new-password' },
        //     { label: 'Two Steps', route: '/auth/two-steps' },
        //     { label: 'users', route: '/auth/users' },
        //   ],
        // },
      ],
    },
    
    {
      group: 'Admin',
      separator: true,
      items: [
        {
          icon: 'assets/icons/outline/download.svg',
          label: 'Download',
          route: '/admin/download',
        },
        {
          icon: 'assets/icons/outline/gift.svg',
          label: 'Roles',
          route: '/admin/roles',
        },
        {
          icon: 'assets/icons/outline/users.svg',
          label: 'Users',
          route: '/admin/users',
        },
      ],
    },
    {
      group: 'Config',
      separator: false,
      items: [
        {
          icon: 'assets/icons/outline/cog.svg',
          label: 'Settings',
          route: '/settings',
        },
        {
          icon: 'assets/icons/outline/bell.svg',
          label: 'Notifications',
          route: '/gift',
        },
        {
          icon: 'assets/icons/outline/folder.svg',
          label: 'Profile',
          route: '/profile',
          children: [
            { label: 'Change Password', route: '/profile/change-password' },
            { label: 'Family Config', route: '/profile/download' },
            { label: 'Others', route: '/profile/others' },
          ],
        },
        {
          icon: 'assets/icons/outline/folder.svg',
          label: 'Admin User',
          route: '/admin-user',
          children: [
            { label: 'User Management', route: '/admin/current-files' },
            { label: 'Family Config', route: '/admin/download' },
            { label: 'Others', route: '/admin/others' },
          ],
        },
      ],
    },
  ];
}
