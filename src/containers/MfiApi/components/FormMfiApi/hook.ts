import { useState } from 'react';

type IValue = {
  [key: string]: string;
};

type IData = {
  [key: string]: IValue;
};

const useFormApi = () => {
  const [query, setQuery] = useState<IValue>({});

  const [param, setParams] = useState<IValue>({});

  const [body, setBody] = useState<IValue>({});

  const [dataApi, setDataApi] = useState<IData>({
    param: {},
    query: {},
    body: {},
  });

  const handleSetData = (type: string) => {
    if (type === 'query' && query.value) {
      setQuery({
        key: '',
        value: '',
      });
      return setDataApi({
        ...dataApi,
        [type]: {
          ...dataApi[type],
          [query.key]: query.value,
        },
      });
    }

    if (type === 'param' && param.value) {
      setParams({
        key: '',
        value: '',
      });
      return setDataApi({
        ...dataApi,
        [type]: {
          ...dataApi[type],
          [param.key]: param.value,
        },
      });
    }

    if (type === 'body' && body.value) {
      setBody({
        key: '',
        value: '',
      });
      return setDataApi({
        ...dataApi,
        [type]: {
          ...dataApi[type],
          [body.key]: body.value,
        },
      });
    }
  };

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (type === 'query')
      setQuery((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

    if (type === 'param')
      setParams((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

    if (type === 'body')
      setBody((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleRemoveQuery = (value: string, type: string) => {
    if (type === 'query') {
      const newData = { ...dataApi.query };
      delete newData[value];
      setDataApi({
        ...dataApi,
        [type]: {
          ...newData,
        },
      });
    }

    if (type === 'param') {
      const newData = { ...dataApi.param };
      delete newData[value];
      setDataApi({
        ...dataApi,
        [type]: {
          ...newData,
        },
      });
    }

    if (type === 'body') {
      const newData = { ...dataApi.body };
      delete newData[value];
      setDataApi({
        ...dataApi,
        [type]: {
          ...newData,
        },
      });
    }
  };

  return {
    handleSetData,
    handleAdd,
    handleRemoveQuery,
    setDataApi,
    query,
    param,
    body,
    dataApi,
  };
};

export default useFormApi;
