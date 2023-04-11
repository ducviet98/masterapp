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
  accessory: getIcon('ic_kanban'),
};

const navConfig = [
  {
    subheader: 'Menu',
    items: [
      { title: 'App', path: '/app', icon: ICONS.dashboard },
      { title: 'Devices', path: '/devices', icon: ICONS.devices },
      { title: 'Certificates', path: '/certificates', icon: ICONS.certificates },
      { title: 'MFI Token', path: '/mfi-token', icon: ICONS.mfiToken },
      { title: 'MFI API', path: '/mfi-api', icon: ICONS.mfiApi },
      { title: 'Brand', path: '/brand', icon: ICONS.brands },
      { title: 'Accessory Info', path: '/accessory-info', icon: ICONS.accessory }
    ],
  }
];

export default navConfig;
