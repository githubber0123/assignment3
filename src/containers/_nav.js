export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Users',
        to: '/users',
        icon: 'cil-people',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Students',
        to: '/students',
        icon: 'cil-contact',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Trainers',
        to: '/trainers',
        icon: 'cil-user',
      },
      
      {
        _name: 'CSidebarNavItem',
        name: 'Courses',
        to: '/courses',
        icon: 'cil-tag',
      },  
      {
        _name: 'CSidebarNavItem',
        name: 'Notifications',
        to: '/notifications',
        icon: 'cil-bell',
      },
     
    ]
  }
]