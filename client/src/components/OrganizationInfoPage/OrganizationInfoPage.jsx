/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import AdminButton from '../AdminButton/AdminButton';
import CoursesTable from '../CoursesTable/CoursesTable';
import './organizationInfoPage.css';

function OrganizationInfoPage() {
  const { id } = useParams();
  const [currentOrganization, setCurrentOrganization] = useState([]);
  const { currentUser } = useSelector((state) => state);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/organization/${id}`)
      .then((res) => setCurrentOrganization(res.data));
  }, []);
  return (Object.keys(currentOrganization).length ? (
    <div className="container my-organization-container">
      <div className="courseInfoPageP4">
        <h2>
          {`${currentOrganization.currentOrganization.name} (${currentOrganization.currentOrganizationType.form})`}
        </h2>
        <div>
          {currentOrganization.currentOrganization.is_checked ? null : currentUser.admin ? <AdminButton {...currentOrganization.currentOrganization} /> : null}
        </div>
      </div>
      <div className="courseInfoPageP2">
        <h3 style={{ textAlign: 'left' }}>Описание</h3>
        <hr style={{ marginTop: 0 }} />
        <div className="courseInfoPageP3">
          <p style={{ textAlign: 'start' }}>
            &nbsp;
            {currentOrganization.currentOrganization.description}
          </p>
        </div>
      </div>
      <div className="courseInfoPageP2">
        <h3 style={{ textAlign: 'left' }}>Курсы</h3>
        <hr style={{ marginTop: 0, marginBottom: '20px' }} />
        {currentOrganization.currentOrganizationCourses.map((item) => <CoursesTable key={item.id} courseName={item.name} coursePrice={item.price} courseId={item.id} />)}
      </div>
      <div className="courseInfoPageP2">
        <h3 style={{ textAlign: 'left' }}>Контакты</h3>
        <hr style={{ marginTop: 0 }} />
        <div className="courseInfoPageP3">
          <p>
            Адрес:
            &nbsp;
            {currentOrganization.currentOrganization.address}
          </p>
          <p>
            Тел.:
            &nbsp;
            {currentOrganization.currentOrganization.phone}
          </p>
          <div>
            <p>
              Сайт:
              <a target="_blank" href={currentOrganization.currentOrganization.site} className="postItemLink" rel="noreferrer">
                &nbsp;
                {currentOrganization.currentOrganization.site}
              </a>
            </p>
          </div>
          <p>
            Почта:
            &nbsp;
            {currentOrganization.currentOrganization.email}
          </p>
        </div>
      </div>
    </div>
  ) : (
    null
  )
  );
}

export default React.memo(OrganizationInfoPage);
