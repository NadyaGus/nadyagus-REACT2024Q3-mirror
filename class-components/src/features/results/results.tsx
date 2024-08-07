import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { ResponseData } from '@/api/types';

import { getItemsList } from '@/api/get-items';

import { ResultItem } from './result-item/result-item';

import classes from './results.module.css';

interface ResultsProps {
  isLoading: boolean;
  response?: ResponseData | void;
  setLoadingState: (isLoading: boolean) => void;
  setTotalCount: Dispatch<SetStateAction<number>>;
}

export const Results = (props: ResultsProps): ReactNode => {
  const [resultsList, setResultsList] = useState(props.response?.data);

  const [searchParams] = useSearchParams();

  const loaderHandler = props.setLoadingState;
  const setTotalCount = props.setTotalCount;
  const query = location.search;

  useEffect(() => {
    loaderHandler(true);

    getItemsList(searchParams.get('search') ?? '', query)
      .then((response) => {
        setResultsList(response?.data);
        setTotalCount(response?.totalCount ?? 0);
      })
      .then(() => loaderHandler(false))
      .catch((err) => console.error(err));
  }, [searchParams, loaderHandler, setTotalCount, query]);

  if (resultsList && resultsList.length > 0) {
    return (
      <ul className={classes.list} data-testid="list">
        {resultsList.map((item) => (
          <ResultItem key={item.id} {...item} />
        ))}
      </ul>
    );
  }

  if (resultsList?.length === 0 || (!resultsList && !props.isLoading)) {
    return (
      <div>
        <h2>No results</h2>
      </div>
    );
  }
};
