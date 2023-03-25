import * as Yup from 'yup';

export const headersTable = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'brand_name',
    label: 'Brand name',
  },
  {
    id: 'category_name',
    label: 'Category name',
  },
  {
    id: 'description',
    label: 'Description',
  },
  {
    id: 'model_number',
    label: 'Model number',
  },
  {
    id: 'upc',
    label: 'UPC',
  },
  {
    id: 'ppid',
    label: 'PPID',
  },
  {
    id: 'brand',
    label: 'Brand',
  },
  {
    id: 'category',
    label: 'Category',
  },
  {
    id: 'created_at',
    label: 'Created at',
  },
  {
    id: 'updated_at',
    label: 'Updated at',
  },
  {
    id: 'status',
    label: 'Status',
  },
  {
    id: 'action',
    label: 'Action',
  },
];

export const DeviceSchema: any = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  model_number: Yup.string().required('Model number is required'),
  ppid: Yup.string().required('ppid is required'),
});
