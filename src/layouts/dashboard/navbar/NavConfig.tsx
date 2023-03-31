// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  devices: getIcon('ic_device'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  certificates: getIcon('ic_certificate'),
  mfiToken: getIcon('ic_blog'),
  mfiApi: getIcon('ic_analytics'),
  brands: getIcon('ic_cart'),
};

const navConfig = [
  {
    subheader: 'Menu',
    items: [
      { title: 'App', path: '/app', icon: ICONS.dashboard },
      { title: 'devices', path: '/devices', icon: ICONS.devices },
      { title: 'certificates', path: '/certificates', icon: ICONS.certificates },
      { title: 'MFIToken', path: '/mfi-token', icon: ICONS.mfiToken },
      { title: 'MFIApi', path: '/mfi-api', icon: ICONS.mfiApi },
      { title: 'Brand', path: '/brand', icon: ICONS.brands },
    ],
  }
];

export default navConfig;
