import xml2js from 'xml2js';

export const AWSConfig = {
  region: process.env.REACT_APP_AWS_REGION || 'ap-southeast-1',
  accessKey: process.env.REACT_APP_AWS_ACCESS_KEY || 'AKIARJUZMJH4CEBXNTFW',
  secretKey:
    process.env.REACT_APP_AWS_SECRET_KEY ||
    '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',
  identityPoolId:
    process.env.REACT_APP_AWS_IDENTITY_POOL_ID ||
    '679605f6-140f-4a2c-9b3d-09706099f89c',
  // bucket9160:
  //   process.env.REACT_APP_AWS_BUCKET_9160 || 'dev-stellife-9160-firmware',
  // bucket52840:
  //   process.env.REACT_APP_AWS_BUCKET_52840 || 'dev-stellife-52840-firmware',
  poolID: process.env.REACT_APP_POOL_ID || 'ap-southeast-1_vRETaNwll',
  appId: process.env.REACT_APP_ID || '6g16h7hicu1gffj0dfs2e90n9m',
};

export const MQTTConfig = {
  // username: process.env.REACT_APP_MQTT_USERNAME || 'BqyepYi1dC',
  // password: process.env.REACT_APP_MQTT_PASSWORD || 'BqyepYi1dC',
  // clientId: process.env.REACT_APP_MQTT_CLIENT_ID || 'clientId-BqyepYi1dC',
  // AccessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY || 'AKIARJUZMJH4CEBXNTFW',
  // SecretKey: process.env.REACT_APP_AWS_SECRET_KEY || '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',
  host:
    process.env.REACT_APP_MQTT_HOST ||
    'a1zzjf2s6cnku7-ats.iot.us-east-1.amazonaws.com',
  port: process.env.REACT_APP_MQTT_PORT || '443',
  path: process.env.REACT_APP_MQTT_PATH || 'mqtt',
  region: process.env.REACT_APP_AWS_REGION || 'ap-southeast-1',
  identityPoolId:
    process.env.REACT_APP_AWS_IDENTITY_POOL_ID ||
    '21885bc4-8bbc-4660-ae81-d03a59d58cec',
  debug: true,
};

export const AWS = {
  poolId:
    process.env.REACT_APP_AWS_IDENTITY_POOL_ID ||
    '21885bc4-8bbc-4660-ae81-d03a59d58cec',
  iotHost:
    process.env.REACT_APP_MQTT_HOST ||
    'a1zzjf2s6cnku7-ats.iot.us-east-1.amazonaws.com',
  region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  // roleArn: process.env.MIX_ROLE_ARN || 'arn:aws:iam::185131356182:role/Cognito_NEDOProdAuth_Role',
  customerEnvironment: process.env.MIX_CUSTOMER_ENVIRONMENT || 'Dev',
};

export const TOOLS = [
  { value: 'update', content: 'Upgrade Firmware' },
  { value: 'reboot', content: 'Reboots' },
  { value: 'thing_group_action', content: 'Thing Groups Actions' },
  { value: 'subscribe_topic_request', content: 'Send RUNTIME request' },
];

export const LogicTypes = [
  { content: 'And', value: 'AND' },
  { content: 'Or', value: 'OR' },
  { content: 'And Not', value: 'AND NOT' },
  { content: 'Or Not', value: 'OR NOT' },
];

export const ThingGroupActionTypes = [
  { value: 'add', label: 'Add to Thing Group' },
  // {value: 'move_to', label: 'Move to Thing Group'},
  {
    value: 'move_and_remove',
    label: 'Move to Thing Group and Remove from Thing group',
  },
  { value: 'remove_to', label: 'Remove from Thing Group' },
];

export const getNametypeConfig = name => {
  switch (name) {
    case 'connectivity.version':
      return 'Version';
    case 'connectivity.connected':
      return 'Connected';
    case 'shadow.version':
      return 'Shadow Version';
    case 'registry.thingTypeName':
      return 'thingTypeName';
    case 'thingId':
      return 'ID';
    case 'registry.thingGroupNames':
      return 'thingGroupNames';
    default:
      return name;
  }
};

export const getField = name => {
  switch (name) {
    case 'connectivity.version':
      return 'connectivity.version';
    case 'connectivity.connected':
      return 'connectivity.connected';
    case 'shadow.version':
      return 'shadow.version';
    case 'registry.thingTypeName':
      return 'thingTypeName';
    case 'thingId':
      return 'thingId';
    case 'registry.thingGroupNames':
      return 'thingGroupNames';
    default:
      return name;
  }
};

export const queryStringFormat = (type = '', value = '') => {
  switch (type) {
    case 'thingName':
      return `*${value.replaceAll(':', '\\:').replaceAll('*', '')}*`;
    default:
      return value.replaceAll(':', '\\:').replaceAll('*', '');
  }
};

export const formatToXML = json => {
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(json);
  return xml
    .replace('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>', '')
    .replaceAll(' ', '')
    .replaceAll('\n', '');
};

export const monthDiff = (dateFrom, dateTo) => {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
};

export const checkTypeSim = sim => {
  const NOTTM = '89445019';
  if (!sim) return;
  if (!sim.includes(NOTTM)) return '/tm-sim/' + sim;
  return '/jt-sim/' + sim;
};

export const bitToMB = (data, type) => {
  if (!data) return;
  if (type === 'tm') return (data / 1024 / 1024).toFixed(2) + ' MB';
  return (data / 1000 / 1000).toFixed(3) + ' MB';
};

export const bitToKB = (data, type) => {
  if (!data) return;
  if (type === 'tm') return (data / 1024).toFixed(1) + ' KB';
  return (data / 1000).toFixed() + ' KB';
};

export const filterDefault = [
  {
    queryString: [{ field: '', value: '' }],
    type: [],
    title: 'Default',
  },
  {
    queryString: [
      { field: 'registry.thingGroupNames', value: 'Certintell' },
      { field: 'connectivity.connected', value: 'true' },
      { field: 'shadow.reported.9160fwversion', value: 'v1.1.0' },
      { field: 'shadow.reported.52840fwversion', value: 'v1.1.0' },
    ],
    type: ['AND', 'AND', 'AND NOT'],
    title: 'Certintell v1.1.0',
  },
  {
    queryString: [
      { field: 'registry.thingGroupNames', value: 'MYVITALZ' },
      { field: 'connectivity.connected', value: 'true' },
      { field: 'shadow.reported.9160fwversion', value: 'v1.1.0' },
      { field: 'shadow.reported.52840fwversion', value: 'v1.1.0' },
    ],
    type: ['AND', 'AND', 'AND NOT'],
    title: 'MYVITALZ v1.1.0',
  },
  {
    queryString: [
      { field: 'registry.thingGroupNames', value: 'YALE' },
      { field: 'shadow.reported.9160fwversion', value: 'v1.1.0' },
      { field: 'shadow.reported.52840fwversion', value: 'v1.1.0' },
    ],
    type: ['AND', 'AND', 'AND NOT'],
    title: 'YALE v1.1.0',
  },
  {
    queryString: [
      { field: 'registry.thingGroupNames', value: 'LVHN' },
      { field: 'shadow.reported.9160fwversion', value: 'v1.0.7rc2' },
      { field: 'shadow.reported.52840fwversion', value: 'v1.0.7rc2' },
    ],
    type: ['AND', 'AND', 'AND NOT'],
    title: 'LVHN v1.0.7rc2',
  },
];

export const typeNames = [
  {
    content: 'None',
    value: '',
  },
  {
    content: 'StelHub',
    value: 'StelHub',
  },
  {
    content: 'StelHub Gen3',
    value: 'StelHub-Gen3',
  },
];

export const SimTools = [
  {
    content: 'Activate',
    value: 'activate',
  },
];

export const JTSimStatus = [
  {
    content: 'OnStock',
    value: 'OnStock',
  },
  {
    content: 'Test',
    value: 'Test',
  },
  {
    content: 'Productive',
    value: 'Productive',
  },
  {
    content: 'Suspended',
    value: 'Suspended',
  },
  {
    content: 'Deleted',
    value: 'Deleted',
  },
  {
    content: 'Paused',
    value: 'Paused',
  },
  {
    content: 'Deleting',
    value: 'Deleting',
  },
  {
    content: 'Lost',
    value: 'Lost',
  },
];
