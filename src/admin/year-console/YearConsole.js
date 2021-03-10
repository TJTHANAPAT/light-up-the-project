import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAdminStore } from '../adminStore';
import BoothGroupConfig from './BoothGroupConfig';

export default function YearConsole() {
  const adminStore = useAdminStore();
  const { yearId } = useParams();

  const [year, setYear] = useState();
  const [boothGroups, setBoothGroups] = useState([]);
  const [isLoadingYear, setIsLoadingYear] = useState(true);
  const [isLoadingBoothGroups, setIsLoadingBoothGroups] = useState(true);
  console.log('Render YearConsole');

  useEffect(() => {
    if (!adminStore.isLoading) {
      setYear(adminStore.getYearConfig(yearId));
      setIsLoadingYear(false);
    }
  }, [adminStore.isLoading]);

  useEffect(() => {
    if (!adminStore.isLoading && !!year) {
      console.log('query boothGroups');
      adminStore.getBoothGroups(yearId).then(boothGroups => {
        setBoothGroups(boothGroups);
        setIsLoadingBoothGroups(false);
        console.log(boothGroups);
      });
    }
  }, [adminStore.isLoading, year]);

  if (adminStore.isLoading || isLoadingYear || (!!year && isLoadingBoothGroups)) {
    return <p>Loading...</p>;
  } else if (!year) {
    return <p>Sorry there's no year {yearId} in database.</p>;
  } else {
    return (
      <>
        <h1>{year.yearName}</h1>
        <p>Year Console (ID: {yearId})</p>
        <BoothGroupConfig boothGroups={boothGroups}/>
      </>
    );
  }
}
