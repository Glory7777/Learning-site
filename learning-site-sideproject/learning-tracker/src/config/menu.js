const menuConfig = [
  {
    name: "대시보드",
    menuId: "dashboard",
    icon: "IconDashboard",
    url: "/dashboard",
    component: "Dashboard",
  },
  {
    name: "학습 관리",
    menuId: "learning-management",
    icon: "IconBook",
    children: [
      {
        name: "학습 로그",
        url: "/learning/logs",
        component: "LearningLogs",
      },
      {
        name: "학습 일정",
        url: "/learning/schedule",
        component: "LearningSchedule",
      },
      {
        name: "학습 통계",
        url: "/learning/statistics",
        component: "LearningStatistics",
      },
    ],
  },
  {
    name: "프로필",
    menuId: "user-profile",
    icon: "IconUser",
    children: [
      {
        name: "내 정보",
        url: "/profile",
        component: "UserProfile",
      },
      {
        name: "비밀번호 변경",
        url: "/profile/change-password",
        component: "PasswordChange",
      },
    ],
  },
];

export default menuConfig;
