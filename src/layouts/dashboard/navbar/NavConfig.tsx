// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  {
    subheader: 'Menu',
    items: [
      { title: 'App', path: '/app', icon: ICONS.dashboard },
      { title: 'devices', path: '/devices', icon: ICONS.ecommerce },
    ],
  }
];

export default navConfig;
