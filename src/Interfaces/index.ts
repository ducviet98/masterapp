export interface NavigationProps {
  navigation?: INavigation;
  route?: IRoute;
}

export interface INavigation {
  navigate(route: string | object, params?: object): void;
  goBack(): void;
  toggleDrawer(): void;
  push(route: string, params?: object): void;
}

export interface IRoute {
  name: string;
  params: object | any;
}
